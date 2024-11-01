/* eslint-disable no-console */
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { config } from 'dotenv';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { logAnthropicAPICost } from './utils.js';

config();

const MODEL = process.env.ANTHROPIC_MODEL as string;
if (!MODEL) {
    throw new Error('ANTHROPIC_MODEL environment variable is not set');
}

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

interface MigrationOptions {
    groupSlugs?: string[];
    prompt: string;
}

/**
 * Loads all TypeScript type definitions from the src/types directory
 * @returns Promise<string> Concatenated content of all TypeScript definition files
 * @throws Error if type definitions cannot be loaded
 */
async function loadTypeDefinitions(): Promise<string> {
    try {
        const typeFiles = fs
            .readdirSync('src/types')
            .filter((file) => file.endsWith('.ts'));

        if (typeFiles.length === 0) {
            throw new Error(
                'No TypeScript definition files found in src/types',
            );
        }

        let typeDefinitions = '';
        for (const file of typeFiles) {
            const content = fs.readFileSync(
                path.join('src/types', file),
                'utf-8',
            );
            typeDefinitions += `\n// From ${file}\n${content}`;
        }
        return typeDefinitions;
    } catch (error) {
        console.error('\x1b[31mError loading type definitions:\x1b[0m', error);
        throw error;
    }
}

type UsageCost = {
    inputTokens: number;
    outputTokens: number;
    cost: number;
};

/**
 * Migrates a single group's data according to the provided type definitions and user prompt
 * @param groupSlug - The slug identifier for the group
 * @param typeDefinitions - Type definitions to use for the migration
 * @param userPrompt - User instructions for the migration
 * @returns UsageCost - The token usage and cost for this migration, or undefined if migration failed
 */
async function migrateGroupData(
    groupSlug: string,
    typeDefinitions: string,
    userPrompt: string,
): Promise<UsageCost | undefined> {
    const groupDir = path.join('data/groups', groupSlug);
    const originalPath = path.join(groupDir, 'details.json');
    const newPath = path.join(groupDir, 'details.new');
    const errorPath = path.join(groupDir, 'details.error');

    if (!fs.existsSync(originalPath)) {
        console.error(
            `\x1b[31m✗ Group ${groupSlug} not found at ${originalPath}\x1b[0m`,
        );
        return undefined;
    }

    try {
        console.log(`Processing ${groupSlug}...`);

        const groupData = fs.readFileSync(originalPath, 'utf-8');
        const existingData = JSON.parse(groupData);

        const msg = await anthropic.messages.create({
            model: MODEL,
            max_tokens: 2000,
            system: `You are a programming assistant that updates group detail JSON files according to TypeScript type definitions. You return only valid JSON, and make no other comments. Here are the type definitions to follow:\n${typeDefinitions}\n\nImportant rules:
- Only modify or add fields that are explicitly mentioned in the user's prompt or already exist in the source data
- Do not add new fields or populate empty fields unless specifically instructed
- Preserve all existing data that isn't being modified
- Ensure all dates and times maintain their original format
- Maintain exact precision for numerical values`,
            messages: [
                {
                    role: 'user',
                    content: `Update the following group JSON according to this prompt: "${userPrompt}"\n\nExisting group data:\n${JSON.stringify(existingData, null, 2)}`,
                },
            ],
        });

        const cost = logAnthropicAPICost(msg.usage, MODEL);

        if (msg.content[0].type !== 'text') {
            throw new Error('AI response was not text');
        }

        const updatedData = JSON.parse(msg.content[0].text);
        if (!updatedData.slug || updatedData.slug !== groupSlug) {
            throw new Error(
                `AI response modified the group slug or returned invalid data:\n\n${msg.content[0].text}\n\n`,
            );
        }

        // Write to details.new instead of updating the original file
        fs.writeFileSync(newPath, JSON.stringify(updatedData, null, 2));
        console.log(
            `\x1b[32m✓ Successfully created ${path.basename(newPath)} for ${groupSlug}\x1b[0m`,
        );

        return {
            inputTokens: msg.usage.input_tokens,
            outputTokens: msg.usage.output_tokens,
            cost: cost,
        };
    } catch (error) {
        console.error(`\x1b[31m✗ Error processing ${groupSlug}:\x1b[0m`, error);

        // Write error details to details.error file
        const errorDetails = {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : String(error),
            prompt: userPrompt,
        };

        fs.writeFileSync(errorPath, JSON.stringify(errorDetails, null, 2));
        console.log(
            `\x1b[33m  Error details written to ${path.basename(errorPath)}\x1b[0m`,
        );

        return undefined;
    }
}

/**
 * Retrieves all group slugs from the data/groups directory
 * @returns Promise<string[]> Array of group slugs
 */
async function getAllGroupSlugs(): Promise<string[]> {
    const groupsDir = 'data/groups';
    if (!fs.existsSync(groupsDir)) {
        throw new Error('Groups directory not found');
    }

    return fs
        .readdirSync(groupsDir)
        .filter((file) =>
            fs.statSync(path.join(groupsDir, file)).isDirectory(),
        );
}

/**
 * Prompts user for migration details in interactive mode
 * @returns Promise<MigrationOptions> User's migration choices
 */
async function promptForMigrationDetails(): Promise<MigrationOptions> {
    const prompt: string = await new Promise((resolve) => {
        rl.question(
            '\x1b[1mEnter the migration prompt (what changes should be made to the group data):\x1b[0m ',
            resolve,
        );
    });

    if (!prompt.trim()) {
        throw new Error('Migration prompt cannot be empty');
    }

    const migrateAll: string = await new Promise((resolve) => {
        rl.question('\x1b[1mMigrate all groups? (y/n):\x1b[0m ', resolve);
    });

    let groupSlugs: string[] | undefined;

    if (migrateAll.toLowerCase() !== 'y') {
        const slugInput: string = await new Promise((resolve) => {
            rl.question(
                '\x1b[1mEnter group slugs to migrate (comma-separated):\x1b[0m ',
                resolve,
            );
        });
        groupSlugs = slugInput
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);

        if (groupSlugs.length === 0) {
            throw new Error('No valid group slugs provided');
        }
    }

    return { groupSlugs, prompt };
}

/**
 * Main execution function for the migration script
 */
async function main() {
    try {
        const argv = await yargs(hideBin(process.argv))
            .option('prompt', {
                alias: 'p',
                type: 'string',
                description: 'Migration prompt',
            })
            .option('groups', {
                alias: 'g',
                type: 'string',
                description: 'Comma-separated list of group slugs to migrate',
            }).argv;

        let migrationOptions: MigrationOptions;

        if (argv.prompt) {
            migrationOptions = {
                prompt: argv.prompt,
                groupSlugs: argv.groups
                    ?.split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
            };

            if (!migrationOptions.prompt.trim()) {
                throw new Error('Migration prompt cannot be empty');
            }
        } else {
            migrationOptions = await promptForMigrationDetails();
        }

        console.log('\nLoading type definitions...');
        const typeDefinitions = await loadTypeDefinitions();

        const groupsToMigrate =
            migrationOptions.groupSlugs || (await getAllGroupSlugs());
        console.log(`\nMigrating ${groupsToMigrate.length} groups...\n`);

        let totalInputTokens = 0;
        let totalOutputTokens = 0;
        let totalCost = 0;
        let successCount = 0;
        let failureCount = 0;

        for (const groupSlug of groupsToMigrate) {
            // eslint-disable-next-line no-await-in-loop
            const usage = await migrateGroupData(
                groupSlug,
                typeDefinitions,
                migrationOptions.prompt,
            );

            if (usage) {
                totalInputTokens += usage.inputTokens;
                totalOutputTokens += usage.outputTokens;
                totalCost += usage.cost;
                successCount += 1;
            } else {
                failureCount += 1;
            }
        }

        console.log('\n\x1b[32mMigration complete!\x1b[0m');
        console.log('\nResults Summary:');
        console.log(`Successful migrations: \x1b[32m${successCount}\x1b[0m`);
        console.log(`Failed migrations: \x1b[31m${failureCount}\x1b[0m`);
        console.log('\nUsage Summary:');
        console.log(`Total Input Tokens: ${totalInputTokens.toLocaleString()}`);
        console.log(
            `Total Output Tokens: ${totalOutputTokens.toLocaleString()}`,
        );
        console.log(`Total Cost: $${totalCost.toFixed(4)}`);

        if (successCount > 0) {
            console.log(
                '\nRun apply-migration to apply the successful changes.',
            );
        }
        if (failureCount > 0) {
            console.log(
                '\nCheck details.error files in failed group directories for error details.',
            );
        }
        console.log();
    } catch (error) {
        console.error('\n\x1b[31mMigration failed:\x1b[0m', error);
        process.exit(1);
    } finally {
        rl.close();
    }
}

main().catch(console.error);
