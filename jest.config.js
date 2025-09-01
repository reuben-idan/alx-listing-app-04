const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // Path to your Next.js app
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom', // Use jsdom for browser environment
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Map @/ to the root directory
  },
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'], // Look for test files in __tests__ directories
};

module.exports = createJestConfig(customJestConfig);
