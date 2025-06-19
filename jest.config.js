module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '\\.(scss|sass|css)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1', // optional path alias
    },
    testMatch: ['**/__tests__/**/*.(test|spec).(js|jsx|ts|tsx)'],
    transform: {
        '^.+\\.[jt]sx?$': 'babel-jest',
    },
    transformIgnorePatterns: ['/node_modules/'],
};
