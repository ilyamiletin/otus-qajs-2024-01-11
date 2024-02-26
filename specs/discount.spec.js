import { calculateTotal } from '../src/discount.js'

describe('calculateTotal function', () => {
    const testCasesPositive = [
        {
            name: 'case 1: valid discount',
            products: [
                { name: 'Товар1', quantity: 3 },
                { name: 'Товар2', quantity: 5 },
            ],
            discount: 10,
            expected: {
                totalWithoutDiscount: 8,
                totalWithDiscount: 7.2,
            },
        },
        {
            name: 'case 2: discount is 0',
            products: [
                { name: 'Товар1', quantity: 3 },
                { name: 'Товар2', quantity: 5 },
            ],
            discount: 0,
            expected: {
                totalWithoutDiscount: 8,
                totalWithDiscount: 8,
            },
        },
    ]

    test.each(testCasesPositive)('%s', ({ products, discount, expected }) => {
        const result = calculateTotal(products, discount)
        expect(result.totalWithoutDiscount).toBe(expected.totalWithoutDiscount)
        expect(result.totalWithDiscount).toBeCloseTo(
            expected.totalWithDiscount,
            2,
        )
    })

    const testCasesNegative = [
        {
            name: 'case 3: invalid negative discount',
            products: [
                { name: 'Товар1', quantity: 3 },
                { name: 'Товар2', quantity: 5 },
            ],
            discount: -10,
            expectedError: 'Скидка не может быть отрицательным числом.',
        },
        {
            name: 'case 4: invalid discount over 100%',
            products: [
                { name: 'Товар1', quantity: 3 },
                { name: 'Товар2', quantity: 5 },
            ],
            discount: 110,
            expectedError: 'Скидка не может быть больше 100%.',
        },
    ]

    test.each(testCasesNegative)(
        '%s',
        ({ products, discount, expectedError }) => {
            expect(() => calculateTotal(products, discount)).toThrow(
                expectedError,
            )
        },
    )
})
