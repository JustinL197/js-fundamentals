/* 
Exercise: Determine whether a word is a palindrome. 
Assumptions:
  - Input will be a single word string
  - Only lowercase letters a–z
  - No spaces or special characters
Expected:
  - Return true if the word is the same forwards and backwards
  - Return false otherwise
*/
const palindrome = require('./palindrome');

describe("palindrome", () => {
    test("racecar is the same forward and backwards", () => {
        expect(palindrome("racecar")).toBe(true);
    })
    
    test("father is not the same forward and backwards", () => {
        expect(palindrome("father")).toBe(false);
    })
});
  
