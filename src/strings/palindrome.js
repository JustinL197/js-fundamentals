"use strict";

function palindrome(word){
    let reversedWord = "";

    for (let i = (word.length) - 1; i >= 0; i--){
        reversedWord += word[i]
    }

    return word == reversedWord;
}
module.exports = palindrome; 