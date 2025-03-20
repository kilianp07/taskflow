module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    collectCoverage: true,
    coverageDirectory: ".coverage",
    coverageReporters: ["json", "lcov", "text", "clover"],
    testTimeout: 30000,
    coveragePathIgnorePatterns: ["/node_modules/", "/.coverage/"],
};
