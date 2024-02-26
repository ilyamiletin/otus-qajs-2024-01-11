import 'dotenv/config'

// process.env.TEST_BASE_API_URL = undefined

const config = {
    baseURL: process.env.TEST_BASE_API_URL ?? 'http.....',
    userId: process.env.TEST_USER_ID,
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
}

export default Object.freeze(config)
