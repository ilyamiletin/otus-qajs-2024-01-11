import { config, AuthService } from '../framework'

describe('Авторизация', () => {
  it('Успешная авторизация (метод /GenerateToken)', async () => {
    const response = await AuthService.generateToken({
      userName: config.username,
      password: config.password,
    })
    expect(response.status).toBe(200)
    expect(response.data.result).toBe('User authorized successfully.')
    expect(response.data.token).toBeDefined()
  })

  it('Нельзя авторизоваться без пароля (generateToken)', async () => {
    const response = await AuthService.generateToken({
      userName: config.username,
      password: '',
    })
    expect(response.status).toBe(400)
    expect(response.data.code).toBe('1200')
    expect(response.data.message).toBe('UserName and Password required.')
  })

  it('Неверное имя при авторизации (generateToken)', async () => {
    const response = await AuthService.generateToken({
        userName: 'ILYAM',
        password: config.password
    })
    expect(response.status).toBe(200)
    expect(response.data.token).toBeNull()
    expect(response.data.expires).toBeNull()
    expect(response.data.status).toBe('Failed')
    expect(response.data.result).toBe('User authorization failed.')
  })

  it('Успешная авторизация (метод /Authorized)', async () => {
    const response = await AuthService.authorized({
        userName: config.username,
        password: config.password
    })
    expect(response.status).toBe(200)
    expect(response.data).toBeTruthy()
  })

  it('Нельзя авторизоваться без имени (authorized)', async () => {
    const response = await AuthService.authorized({
        userName: '',
        password: config.password
    })
    expect(response.status).toBe(400)
    expect(response.data.code).toBe('1200')
    expect(response.data.message).toBe('UserName and Password required.')
  })

  it('Неверный пароль при авторизации (authorized)', async () => {
    const response = await AuthService.authorized({
        userName: config.username,
        password: 'Vbvbkmrf1993'
    })
    expect(response.status).toBe(404)
    expect(response.data.code).toBe('1207')
    expect(response.data.message).toBe('User not found!')
  })
})