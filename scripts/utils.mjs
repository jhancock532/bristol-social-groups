import fs from 'fs';

/**
 * Converts a string from kebab-case to camelCase.
 * 
 * @param {string} str - The string to convert.
 * @returns {string} The converted string in camelCase.
 */
export function toCamelCase(str) {
  return str.replace(/-(.)/g, (_, group1) => group1.toUpperCase());
}

/**
 * Reads the content of a file.
 * 
 * @param {string} filePath - The path to the file to read.
 * @returns {string} The content of the file or an empty string if an error occurs.
 */
export const readFile = (filePath) => {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        console.error(`Error reading file ${filePath}: ${err}`);
        return '';
    }
};

/**
 * Calculates and logs the usage cost based on input and output tokens.
 * 
 * @param {Object} usage - The usage object containing input_tokens and output_tokens.
 * @param {string} model - The model to calculate the cost for.
 */
export function calculateUsageCost(usage, model) {
    let inputCostPerMillion, outputCostPerMillion;
    switch (model) {
        case 'Claude 3.5 Sonnet':
            inputCostPerMillion = 3.75;
            outputCostPerMillion = 3;
            break;
        case 'Claude 3 Opus':
            inputCostPerMillion = 18.75;
            outputCostPerMillion = 15;
            break;
        case 'Claude 3 Haiku':
            inputCostPerMillion = 0.30;
            outputCostPerMillion = 0.25;
            break;
        default:
            console.error(`Model ${model} is not supported.`);
            return;
    }

    const inputTokens = usage.input_tokens;
    const outputTokens = usage.output_tokens;

    const inputCost = (inputTokens / 1000000) * inputCostPerMillion;
    const outputCost = (outputTokens / 1000000) * outputCostPerMillion;

    const totalCost = inputCost + outputCost;

    console.log(
        `\n\x1b[4m${inputTokens}\x1b[0m input tokens, approx \x1b[1m$${inputCost.toFixed(
            4,
        )}\x1b[0m`,
    );
    console.log(
        `\x1b[4m${outputTokens}\x1b[0m output tokens, approx \x1b[1m$${outputCost.toFixed(
            4,
        )}\x1b[0m`,
    );
    console.log(
        `Total cost: approx \x1b[1m\x1b[36m$${totalCost.toFixed(4)}\x1b[0m\n`,
    );
}