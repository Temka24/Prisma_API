// jest.config.ts
export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__test__/**/*.test.ts'],
    moduleFileExtensions: ['ts', 'js'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
};
