// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

describe('getTotal function', () => {
  const testCasesPositive = [
    {
      name: 'case 1: discount is 0 (default value)',
      items: [{ price: 10, quantity: 10 }],
      discount: 0,
      expected: { total: 100 },
    },
    {
      name: 'case 2: valid discount',
      items: [{ price: 10, quantity: 10 }],
      discount: 10,
      expected: { total: 90 },
    },
  ]

  test.each(testCasesPositive)('$name', ({ items, discount, expected }) => {
    const result = getTotal(items, discount)
    expect(result).toBe(expected.total)
  })

  const testCasesNegative = [
    {
      name: 'case 3: invalid negative discount',
      items: [{ price: 10, quantity: 1 }],
      discount: -2,
      expectedError: 'Процент скидки не может быть отрицательным',
    },
    {
      name: 'case 4: discount is an object',
      items: [{ price: 10, quantity: 0 }],
      discount: { price: 10, quantity: 9 },
      expectedError: 'Скидка должна быть числом',
    },
  ]

  test.each(testCasesNegative)('$name', ({ items, discount, expectedError }) => {
      expect(() => getTotal(items, discount)).toThrow(expectedError)
    },
  )
})


describe ('nameIsValid function', () => {
  it ('testCasesPositive: name contains 4 symbol', () => {
    const name = 'Ilya'

    const result = nameIsValid(name)

    expect(result).toBeTruthy()
  })

  it ('testCasesPositive: name contains 2 symbol', () => {
    const name = 'Il'

    const result = nameIsValid(name)

    expect(result).toBeTruthy()
  })

  it ('testCasesNegative: name contains 1 symbol', () => {
    const name = 'I'

    const result = nameIsValid(name)

    expect(result).toBeFalsy()
  })

  it ('testCasesNegative: name contains whitespace', () => {
    const name = 'Ilya Miletin'

    const result = nameIsValid(name)

    expect(result).toBeFalsy()
  })

  it ('testCasesNegative: no name', () => {
    const name = ' '

    const result = nameIsValid(name)

    expect(result).toBeFalsy()
  })

  it ('testCasesNegative: name contains number', () => {
    const name = 1234

    const result = nameIsValid(name)

    expect(result).toBeFalsy()
  })
})


describe ('fullTrim function', () => {
  it ('testCasesPositive: the text contains 1 space' , () => {
    const text = 'Hello, world!'

    const result = fullTrim(text)

    expect(result).toBe('Hello,world!')
  })

  it ('testCasesPositive: the text contains 2 space' , () => {
    const text = 'bea uti ful'

    const result = fullTrim(text)

    expect(result).toBe('beautiful')
  })

  it ('testCasesNegative: invalid format (number)' , () => {
    try {
      const text = 1234

      fullTrim(text)

    } catch (error) {
      expect(error.message).toBe('(text || "").replace is not a function')}
  })

  it ('testCasesNegative: invalid format (nonexistent variable)' , () => {
    try {
      const text = 'dfgh'

      fullTrim(text)

    } catch (error) {
      expect(error.name + ': ' + error.message).toBe('ReferenceError: dfgh is not defined')}
  })
})