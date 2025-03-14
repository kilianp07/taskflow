module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    collectCoverage: true,
    coverageDirectory: ".coverage",
    coverageReporters: ["json", "lcov", "text", "clover"],
    coveragePathIgnorePatterns: ["/node_modules/", "/.coverage/"],
};
