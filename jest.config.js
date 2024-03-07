/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'allure-jest/node',
    setupFiles: ['dotenv/config'],
    verbose: true,
    reporters: ['default', 'jest-html-reporters'],
}

module.exports = config
