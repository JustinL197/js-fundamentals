/*
Exercise: write a function that takes an array of numbers and returns the largest one.

Assumptions:
    - numbers: -100 < x < 100
    - input will always be a number
    - array will always have at least one number

Expected:
    - return the largest number in the array
*/

const findMaximum = require("./find-maximum");

describe("find maxmium in array", () => {
    test("return 2 in an array of [1, 2]", () => {
        expect(findMaximum([1,2])).toBe(2)
    })

    test("return -3 in an array of [-10, -3, -50]", () => {
        expect(findMaximum([-10, -3, -50])).toBe[-3]
    })

    test("return 7 in an array of [-2, 0, 7, -5]", () => {
        expect(findMaximum([-2, 0, 7, -5])).toBe[7]
    })

    test("return -3 in an array of [-6, -3, -15]", () => {
        expect(findMaximum([-6, -3, -15])).toBe[-3]
    })
})

