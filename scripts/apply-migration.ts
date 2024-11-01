/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

/**
 * Gets all groups that have pending migrations (details.new files)
 * @returns Array of group slugs with pending migrations
 */
async function getGroupsWithPendingMigrations(): Promise<string[]> {
    const groupsDir = 'data/groups';
    if (!fs.existsSync(groupsDir)) {
        throw new Error('Groups directory not found');
    }

    return fs.readdirSync(groupsDir).filter((slug) => {
        const newFile = path.join(groupsDir, slug, 'details.new');
        return fs.existsSync(newFile);
    });
}

/**
 * Applies migration for a single group
 * @param groupSlug - The slug identifier for the group
 */
async function applyGroupMigration(groupSlug: string): Promise<void> {
    const groupDir = path.join('data/groups', groupSlug);
    const originalPath = path.join(groupDir, 'details.json');
    const newPath = path.join(groupDir, 'details.new');

    try {
        // Copy new file to original
        fs.copyFileSync(newPath, originalPath);

        // Delete new file
        fs.unlinkSync(newPath);

        console.log(`\x1b[32m✓ Applied migration for ${groupSlug}\x1b[0m`);
    } catch (error) {
        console.error(
            `\x1b[31m✗ Error applying migration for ${groupSlug}:\x1b[0m`,
            error,
        );
        throw error;
    }
}

/**
 * Main execution function for applying migrations
 */
async function main() {
    try {
        const groupsWithMigrations = await getGroupsWithPendingMigrations();

        if (groupsWithMigrations.length === 0) {
            console.log('\nNo pending migrations found.\n');
            process.exit(0);
        }

        console.log(
            `\nFound ${groupsWithMigrations.length} pending migrations:\n`,
        );
        groupsWithMigrations.forEach((slug) => console.log(`- ${slug}`));

        const confirm: string = await new Promise((resolve) => {
            rl.question(
                '\n\x1b[1mDo you want to apply these migrations? (y/n):\x1b[0m ',
                resolve,
            );
        });

        if (confirm.toLowerCase() !== 'y') {
            console.log('\nMigration cancelled.\n');
            process.exit(0);
        }

        console.log('\nApplying migrations...\n');

        for (const groupSlug of groupsWithMigrations) {
            // eslint-disable-next-line no-await-in-loop
            await applyGroupMigration(groupSlug);
        }

        console.log('\n\x1b[32mAll migrations applied successfully!\x1b[0m\n');
    } catch (error) {
        console.error('\n\x1b[31mError applying migrations:\x1b[0m', error);
        process.exit(1);
    } finally {
        rl.close();
    }
}

main().catch(console.error);
