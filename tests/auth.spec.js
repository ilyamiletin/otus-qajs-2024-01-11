// тест от Дамира на занятии Основы JS. Объекты и массивы
import axios from 'axios'

const config = {
  baseURL: process.env.TEST_BASE_API_URL,
  userId: process.env.TEST_USER_ID,
  username: process.env.TEST_USERNAME,
  password: process.env.TEST_PASSWORD,
}

const client = axios.create({
  baseURL: config.baseURL,
  validateStatus: () => true,
})

describe('Авторизация', () => {
  it('Успешная авторизация', async () => {
    const response = await client.post('/Account/v1/GenerateToken', {
      userName: config.username,
      password: config.password,
    })
    expect(response.status).toBe(200)
    expect(response.data.result).toBe('User authorized successfully.')
    expect(response.data.token).toBeDefined()
  })
})