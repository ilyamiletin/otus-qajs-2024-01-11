import { AuthService, UserService, UserFixture } from '../framework'

describe('Users', () => {
  let token
  let userId
  let newUser

  beforeAll(async () => {
    newUser = UserFixture.generateUserCredentials()
  })

  it('Авторизован ли пользователь?', async () => {
    const responseCreateUser = await UserService.create(newUser)
    userId = responseCreateUser.data.userID

    console.log(newUser)

    const { data: authorizedBeforeLogin } =
      await AuthService.authorized(newUser)

    const responseToken = await AuthService.generateToken(newUser)
    token = responseToken.data.token

    console.log(token)

    const { data: authorizedAfterLogin } = await AuthService.authorized(newUser)

    expect(authorizedBeforeLogin).toBe(false)
    expect(authorizedAfterLogin).toBe(true)
  })

  it('Получение информации о пользователе', async () => {
    const response = await UserService.get({userId, token})
    expect(response.status).toBe(200)
    expect(response.data.userId).toBe(userId)
    expect(response.data.username).toBe(newUser.userName)
    expect(response.data.books).toStrictEqual([])
  })

  it('Получение информации о пользователе с неверным {UUID}', async () => {
    const response = await UserService.get({
        userId: 'toipni32p4i', 
        token
    })
    expect(response.status).toBe(401)
    expect(response.data.code).toBe('1207')
    expect(response.data.message).toBe('User not found!')
  })

  it('Удаление пользователя с неверным {UUID}', async () => {
    const response = await UserService.remove({
        userId: 'ureuhr32', 
        token
    })
    expect(response.status).toBe(200)
    expect(response.data.code).toBe('1207')
    expect(response.data.message).toBe('User Id not correct!')
  })

  it('Получение информации о пользователе с неверным токеном', async () => {
    const response = await UserService.get({
        userId,
        token: 'eroijg434'
    })
    expect(response.status).toBe(401)
    expect(response.data.code).toBe('1200')
    expect(response.data.message).toBe('User not authorized!')
  })

  it('Удаление пользователя с неверным токеном', async () => {
    const response = await UserService.remove({
        userId, 
        token: 'dsdkfdlfld3242l342l3lk234'
    })
    expect(response.status).toBe(401)
    expect(response.data.code).toBe('1200')
    expect(response.data.message).toBe('User not authorized!')
  })

  it('Попытка удаления неавторизованного пользователя', async () => {
    const response = await UserService.remove({
        userId,
        token: null
    })
    expect(response.status).toBe(401)
    expect(response.data.code).toBe('1200')
    expect(response.data.message).toBe('User not authorized!')
  })

  it('Попытка получения информации неавторизованного пользователя', async () => {
    const response = await UserService.get({
        userId,
        token: null
    })
    expect(response.status).toBe(401)
    expect(response.data.code).toBe('1200')
    expect(response.data.message).toBe('User not authorized!')
  })

  it('Удаление пользователя с верным {UUID}', async () => {
    const response = await UserService.remove({ userId, token })
    expect(response.status).toBe(204)
    expect(response.data).toBe('')
  })

  it('Повторная попытка удаления того же пользователя', async () => {
    const response = await UserService.remove({ userId, token })
    expect(response.status).toBe(200)
    expect(response.data.code).toBe('1207')
    expect(response.data.message).toBe('User Id not correct!')
  })

  it('Попытка получение информации о пользователе после удаления', async () => {
    const response = await UserService.get({userId, token})
    expect(response.status).toBe(401)
    expect(response.data.code).toBe('1207')
    expect(response.data.message).toBe('User not found!')
  })
})