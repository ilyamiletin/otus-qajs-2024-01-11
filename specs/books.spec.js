import {
    BookService,
    AuthService,
    config,
    UserService,
    UserBookService,
} from '../framework'
import { books } from '../framework/fixtures/Books.json'

describe.skip('Books', () => {
    const userId = config.userId
    const [book1, book2, book3] = books
    const isbn = book1.isbn

    let token

    beforeAll(async () => {
        const { data } = await AuthService.generateToken({
            userName: config.username,
            password: config.password,
        })

        token = data.token
    })

    it('Список книг', async () => {
        const response = await BookService.getAll()

        expect(response.status).toBe(200)
        expect(response.data).toEqual({ books })
    })

    const addBook = [
        {
            name: 'Добавить книгу `9781449325862` пользователю (Parameterized)',
            isbns: ['9781449325862'],
            isbn: '9781449325862',
        },
        {
            name: 'Добавить книгу `9781449337711` пользователю (Parameterized)',
            isbns: ['9781449337711'],
            isbn: '9781449337711',
        },
    ]

    it.each(addBook)('$name', async ({ isbns, isbn }) => {
        const responseAddListOfBooks = await UserBookService.addList({
            userId,
            isbns,
            token,
        })
        expect(responseAddListOfBooks.data).toEqual({ books: [{ isbn }] })
    })

    it('Попытка добавить книгу в коллекцию к пользователю, которая уже есть', async () => {
        const responseAddListOfBooks = await UserBookService.addList({
            userId,
            isbns: ['9781449337711'],
            token,
        })

        expect(responseAddListOfBooks.status).toBe(400)
        expect(responseAddListOfBooks.data.code).toBe('1210')
        expect(responseAddListOfBooks.data.message).toBe(
            "ISBN already present in the User's Collection!",
        )
    })

    it('Заменить книгу в коллекции пользователя', async () => {
        const responseAddBook = await UserBookService.replace({
            userId,
            fromIsbn: isbn,
            toIsbn: book2.isbn,
            token,
        })

        expect(responseAddBook.data).toEqual({
            books: [book3, book2],
            userId,
            username: config.username,
        })
    })

    it('Получениe информации o книге `9781449331818`', async () => {
        const response = await UserBookService.getBookUser({
            isbns: '9781449331818',
        })

        expect(response.status).toBe(200)
        expect(response.data).toEqual(book2)
    })

    it('Попытка получить информацию o книге, которой нет у пользователя', async () => {
        const response = await UserBookService.getBookUser({
            isbns: '978144933181',
        })

        expect(response.status).toBe(400)
        expect(response.data.code).toBe('1205')
        expect(response.data.message).toBe(
            'ISBN supplied is not available in Books Collection!',
        )
    })

    it('Попытка удалить книгу у пользователя, которой у него нет', async () => {
        const responseRemoveOneBook = await UserBookService.removeOneBook({
            token,
            userId,
            isbn: '978144933181',
        })

        expect(responseRemoveOneBook.status).toBe(400)
        expect(responseRemoveOneBook.data.code).toBe('1206')
        expect(responseRemoveOneBook.data.message).toBe(
            "ISBN supplied is not available in User's Collection!",
        )
    })

    it('Удаление книги у пользователя', async () => {
        const responseRemoveOneBook = await UserBookService.removeOneBook({
            token,
            userId,
            isbn: '9781449331818',
        })

        expect(responseRemoveOneBook.status).toBe(204)
    })

    it('Повторная попытка удалить книгу у пользователя', async () => {
        const responseRemoveOneBook = await UserBookService.removeOneBook({
            userId,
            isbn: '9781449331818',
            token,
        })
        console.log(responseRemoveOneBook.data)
        expect(responseRemoveOneBook.status).toBe(400)
        expect(responseRemoveOneBook.data.code).toBe('1206')
        expect(responseRemoveOneBook.data.message).toBe(
            "ISBN supplied is not available in User's Collection!",
        )
    })

    it('Удаление всех книг из коллекции пользователя', async () => {
        const responseRemoveAll = await UserBookService.removeAll({
            userId,
            token,
        })

        expect(responseRemoveAll.status).toBe(204)
    })

    it('Проверка, что все книги удалились', async () => {
        const responseUser = await UserService.get({
            userId,
            token,
        })
        expect(responseUser.data.books).toEqual([])
    })
})
