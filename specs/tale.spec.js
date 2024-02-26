import { kolobok } from '../src/tale'

// тест писал Рома на вебинаре
describe('kolobok', () => {
    it('should return kolobok дедушка', () => {
        const result = kolobok('дедушка')
        expect(result).toBe('Я от дедушки ушёл')
    })
})

// тест писал Дамир на вебинаре
describe('function kolobok', () => {
    it('can see strange', () => {
        try {
            kolobok('Дедушку мороза')
            console.log('мы этого не увидим')
        } catch (error) {
            // eslint-disable-next-line
            expect(error.message).toBe('Я встретил кого-то неизвестного')
        }
    })
})

// тест писал Я по образцу из презентации
describe('function kolobok 2', () => {
    it('can see strange 2', () => {
        expect(() => {
            kolobok('Дедушку мороза')
        }).toThrow('Я встретил кого-то неизвестного')
    })
})

// тест который писал Я, но по паттерну AAA
describe('function kolobok 3', () => {
    it('can see strange 3', () => {
        const name = 'Дедушку мороза'

        const prepare = () => {
            kolobok(name)
        }

        expect(prepare).toThrow('Я встретил кого-то неизвестного')
    })
})
