"use strict"; 

function findMaximum(numbers){
    let current = numbers[0]; 

    for (let num of numbers){
        if (num > current){
            current = num;
        }
    }
    
    return current
}

module.exports = findMaximum;