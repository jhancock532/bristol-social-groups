/* eslint-disable no-console */
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import readline from 'readline';
import path from 'path';
import { config } from 'dotenv';
import { logAnthropicAPICost } from './utils.js';

config();

const MODEL = process.env.ANTHROPIC_MODEL as string;

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

// Array of representative groups to use as examples for the AI
const EXAMPLE_GROUP_SLUGS = [
    'chance-and-counters',
    'girls-who-walk-bristol',
    'rebel-book-club',
    'super-miner-battle-farm',
    'ride-bristol',
];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function loadExampleGroups() {
    const exampleGroups = [];
    for (const slug of EXAMPLE_GROUP_SLUGS) {
        const groupPath = path.join('data/groups', slug, 'details.json');
        if (fs.existsSync(groupPath)) {
            const groupData = fs.readFileSync(groupPath, 'utf-8');
            exampleGroups.push(JSON.parse(groupData));
        }
    }
    return exampleGroups;
}

async function generateGroupDetails(
    groupSlug: string,
    userInput: string,
    exampleGroups: any[],
) {
    const msg = await anthropic.messages.create({
        model: MODEL,
        max_tokens: 4000,
        system: `You are a programming assistant that generates group detail JSON files based on a group slug and optional user input. You return only valid JSON, and make no other comments. Use the following example groups as context for how your output should be formatted: \n${JSON.stringify(exampleGroups)}\n Return a JSON response to the user's input, only including fields that match the above examples.`,
        messages: [
            {
                role: 'user',
                content: `Create a group details object for the group with the URL slug of "${groupSlug}". Additional information: ${userInput}`,
            },
        ],
    });

    logAnthropicAPICost(msg.usage, MODEL);

    if (msg.content[0].type === 'text') {
        return msg.content[0].text;
    }

    return 'Error: AI response was not text.';
}

export async function createGroup(groupSlug: string, userInput: string = '') {
    const groupFolderPath = path.join('data/groups', groupSlug);

    if (fs.existsSync(groupFolderPath)) {
        throw new Error(`The group "${groupSlug}" already exists.`);
    }

    const exampleGroups = await loadExampleGroups();
    const groupDetails = await generateGroupDetails(
        groupSlug,
        userInput,
        exampleGroups,
    );

    const groupDetailsFilePath = path.join(groupFolderPath, 'details.json');

    fs.mkdirSync(groupFolderPath, {
        recursive: true,
    });

    fs.writeFileSync(groupDetailsFilePath, groupDetails);
    return groupDetails;
}

async function promptForInput(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

async function runCLI() {
    try {
        const groupSlug = await promptForInput(
            '\x1b[1mEnter the group name as a slug, e.g. "bristol-hot-air-balloonists" :\x1b[0m ',
        );

        const userInput = await promptForInput(
            '\x1b[1mEnter any additional information for the AI (optional):\x1b[0m ',
        );

        await createGroup(groupSlug, userInput);
        console.log(`\n\x1b[32mGroup created successfully!\x1b[0m\n`);
    } catch (error) {
        console.error(
            'Error creating group:',
            error instanceof Error ? error.message : error,
        );
    } finally {
        rl.close();
    }
}

// Keep the CLI version as the default behavior when running the script directly
if (require.main === module) {
    runCLI();
}
