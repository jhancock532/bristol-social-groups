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
    testMatch: ['**/__tests__/**/*.(test|spec).(js|jsx|ts|tsx)'],
};

export default createJestConfig(customJestConfig);
