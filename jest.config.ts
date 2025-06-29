// jest.config.ts
import nextJest from 'next/jest';
import type { Config } from '@jest/types';

const createJestConfig = nextJest({
    dir: './',
});

const customJestConfig: Config.InitialOptions = {
    // No external setup file; use built-in utilities directly
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(scss|sass|css)$': 'identity-obj-proxy', // Only needed if you're using CSS Modules
    },
    testMatch: [
        // Unit tests
        '**/?(*.)+(test).[jt]s?(x)',
        // Component tests
        '**/?(*.)+(spec).[jt]s?(x)',
        // Exclude visual tests
        '!**/?(*.)+(visual.spec).[jt]s?(x)',
    ],
};

export default createJestConfig(customJestConfig);
