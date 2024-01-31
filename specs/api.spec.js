import { faker } from '@faker-js/faker'

const createUser = async (userName, password) => {
    const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
        method: 'post',
        body: JSON.stringify({
            "userName": userName,
            "password": password
        }),
        headers: {'Content-Type':'application/json'}
    })
    return response
}

describe ('3 api tests bookstore service (create User)', () => {
    it ('Создание пользователя c ошибкой, логин уже используется', async () => {
        const res = await createUser ('KRIK', 'Vbvbkmrf1993!')
        const data = await res.json()
        expect(res.status).toBe(406)
        expect(data.code).toBe("1204")
        expect(data.message).toBe('User exists!')
    })

    it ('Создание пользователя c ошибкой, пароль не подходит', async () => {
        const res = await createUser ('KRIK', 'Vbv')
        const data = await res.json()
        expect(res.status).toBe(400)
        expect(data.code).toBe("1300")
        expect(data.message).toBe(`Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.`)
    })

    it ('Создание пользователя успешно', async () => {
        const randomName = faker.person.firstName()
        const res = await createUser (randomName, 'Vbvbkmrf1993!')
        const data = await res.json()
        expect(res.status).toBe(201)
        expect(data.username).toBe(randomName)
        expect(data.userID).not.toBeNull()
    })
})

const GenerateToken = async (userName, password) => {
    const response = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
        method: 'post',
        body: JSON.stringify({
            "userName": userName,
            "password": password
        }),
        headers: {'Content-Type':'application/json'}
    })
    return response
}

describe ('3 api tests bookstore service (GenerateToken)', () => {
    it ('Генерация токена c ошибкой (status 200)', async () => {
        const res = await GenerateToken ('KRI', 'Vbvbkmrf1993!')
        const data = await res.json()
        expect(res.status).toBe(200)
        expect(data.token).toBeNull()
        expect(data.expires).toBeNull()
        expect(data.status).toBe("Failed")
        expect(data.result).toBe('User authorization failed.')
    })

    it ('Генерация токена c ошибкой (status 400)', async () => {
        const res = await GenerateToken ('KRI', '')
        const data = await res.json()
        expect(res.status).toBe(400)
        expect(data.code).toBe('1200')
        expect(data.message).toBe('UserName and Password required.')
    })

    it ('Генерация токена успешно', async () => {
        const res = await GenerateToken ('KRIK', 'Vbvbkmrf1993!')
        const data = await res.json()
        expect(res.status).toBe(200)
        expect(data.token).not.toBeNull()
        expect(data.expires).not.toBeNull()
        expect(data.status).toBe("Success")
        expect(data.result).toBe('User authorized successfully.')
    })
})