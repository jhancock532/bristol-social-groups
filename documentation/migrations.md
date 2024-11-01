# Group Migration Scripts

There are two scripts available for automatically updating the data structures across the `data/groups` JSON files: `npm run make-migration` and `npm run apply-migration`.

**This is an AI enabled script**; you'll need to set an Anthropic API key in your `.env` file to use this feature. Use with caution!

## Make Migration

New migrations will be applied according to the TypeScript type definitions in the `src/types` folder, as well as user-provided instructions.

Make sure you update your type definitions before running the migration script!

### Command Usage

```bash
# Interactive mode
npm run make-migration

# Command line mode
npm run make-migration -- --prompt "your migration instructions" --groups "group1,group2"

# Migrate a single group
npm run make-migration -- -p "Update booking field structure" -g "bristol-tennis"

# Migrate multiple specific groups
npm run make-migration -- --prompt "Add price range field" --groups "group1,group2,group3"

# Migration with complex changes
npm run make-migration -- --prompt "Convert all event times to 24-hour format and add capacity limits based on venue size"
```

### Command Line Arguments

| Flag       | Alias | Description                                    | Required | Example                                      |
| ---------- | ----- | ---------------------------------------------- | -------- | -------------------------------------------- |
| `--prompt` | `-p`  | Instructions for how to modify the group data  | No       | `--prompt "Add a new field called capacity"` |
| `--groups` | `-g`  | Comma-separated list of group slugs to migrate | No       | `--groups "group1,group2,group3"`            |

### Interactive Mode

If you run the script without any flags, it will enter interactive mode and prompt you for:

1. Migration instructions
2. Whether to migrate all groups
3. If not migrating all groups, which specific groups to migrate

### Output

The script will:

1. Create a `details.new` file alongside each group's original `details.json`
2. Display progress for each group being processed
3. Show a summary of token usage and costs at the end
4. Prompt you to run the apply-migration script when ready

### Example

```bash
# Migrate specific groups
npm run make-migration -- --prompt "Add a capacity field of 20 to all indoor events" --groups "bristol-badminton,bristol-tennis"

# Migrate all groups interactively
npm run make-migration
```

## Apply Migration Script

The apply migration script takes the generated `details.new` files and applies them to the original files after creating backups.

### Usage

```bash
npm run apply-migration
```

This script does not accept any command line arguments as it automatically detects and processes all pending migrations.

### Process

1. Scans for any `details.new` files in the groups directory
2. Lists all found pending migrations
3. Asks for confirmation before proceeding
4. For each confirmed group:
   - Copies the new version over the original
   - Deletes the `.new` file
5. Provides feedback about each successful migration

## Complete Migration Workflow

1. Update your type definitions, making note of any changes you'd like to prompt the AI with later.

1. Run the migration script:

   ```bash
   npm run make-migration
   ```

1. Review the generated `details.new` files manually

1. When satisfied with the changes, apply the migration:

   ```bash
   npm run apply-migration
   ```

1. Verify the changes in the original `details.json` files, use the git commit diff to verify every change made is as expected.

## Useful tools

Log all the folders in the groups directory.

```bash
ls -d data/groups/*/ | cut -d'/' -f3 | tr '\n' ',' | sed 's/,$//'
```
