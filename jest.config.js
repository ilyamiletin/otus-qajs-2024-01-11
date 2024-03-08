/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'allure-jest/node',
    setupFiles: ['dotenv/config'],
    verbose: true,
    reporters: [
        'default',
        [
            'jest-html-reporters',
            {
                publicPath: './html-report',
                filename: 'report.html',
                openReport: true,
            },
        ],
    ],
}

module.exports = config
