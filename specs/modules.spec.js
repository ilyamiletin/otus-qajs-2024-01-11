import { farewell, greet } from '../src/modules'

describe('greet', () => {
    it('should greet Ilya', () => {
        expect(greet('Ilya')).toBe('Hello, Ilya!')
    })

    it('should correct work with empty string', () => {
        expect(greet('')).toBe('Hello, !')
    })
})

describe('farewell', () => {
    // eslint-disable-next-line
    // it ('is function', () => {
    //     expect(typeof farewell).toBe('function')
    // })

    it('should farewell Ilya', () => {
        const userName = 'Ilya'

        const resul = farewell(userName)

        expect(resul).toBe('Goodbye, Ilya!')
    })
})
