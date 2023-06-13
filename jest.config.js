module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    // other configurations...
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};
