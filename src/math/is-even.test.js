/*
Exercise: Write a function isEven(num) that returns true if the number is even, false otherwise.
Assumption: 
    - input will always be a number
Expected:
    - return true if number is even
    - return false if number is odd
*/

const isEven = require('./is-even')

describe ("function to determine even number", () => {
    test("6 is an even number", () => {
        expect(isEven(6)).toBe(true)
    })

    test("3 is not an even number", () => {
        expect(isEven(3)).toBe(false)
    })

    test("-2 is an even number,", () => {
        expect(isEven(-2)).toBe(true)
    })
})

