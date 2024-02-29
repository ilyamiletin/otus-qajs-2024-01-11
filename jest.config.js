/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'allure-jest/node',
    setupFiles: ['dotenv/config'],
    verbose: true,
}

module.exports = config
