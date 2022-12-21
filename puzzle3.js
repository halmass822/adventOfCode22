const fs = require('fs');
const path = require('path');
const filePath = path.join(process.cwd(), 'puzzle3.txt');

const puzzleInput = fs.readFileSync(filePath, 'utf8', (err) => {
    if(err) throw err;
}).split('\n')

function separateContents(bagContents) {
    const firstCompartment = bagContents.slice(0, (bagContents.length / 2) );
    const secondCompartment = bagContents.slice((bagContents.length / 2), bagContents.length);
    return [firstCompartment, secondCompartment];
}

function checkSharedLetter(inputArray) {
    const firstLetters = inputArray[0].split('');
    const secondLetters = inputArray[1].split('');
    let sharedLetter = [];

    firstLetters.forEach((x) => {
        if(secondLetters.includes(x)) {
            sharedLetter.push(x);
        }
    });

    if(sharedLetter){
        return sharedLetter;
    } else {
        throw 'no letter shared';
    };
}

const upperCaseLetters = Array.from(Array(26)).map((e, i) => i + 65).map((x) => String.fromCharCode(x));
const lowerCaseLetters = Array.from(Array(26)).map((e, i) => i + 97).map((x) => String.fromCharCode(x));

function checkPriority(letter) {
    if(/[A-Z]/.test(letter)) {
        return upperCaseLetters.indexOf(letter) + 27;
    } else {
        return lowerCaseLetters.indexOf(letter) + 1;
    }
}

let priorityCounter = 0;

puzzleInput.forEach((x) => {
    priorityCounter += checkPriority( checkSharedLetter ( separateContents(x) )[0] );
})

console.log(priorityCounter);

function groupElves(input) {
    let output = [];
    for(i = 0 ; i < input.length ; i += 3) {
        output.push(input.slice(i, i + 3));
    }
    return output;
}

function checkSharedObject(input) {
    let output;
    const shared1 = checkSharedLetter([input[0], input[1]]);
    const shared2 = checkSharedLetter([input[1], input[2]]);
    shared1.forEach((x) => {
        if(shared2.includes(x)) {
            output = x;
        }
    })
    return output;
}

let groupScoreCounter = 0;

groupElves(puzzleInput).forEach((x) => {
    groupScoreCounter += checkPriority(checkSharedObject(x));
});

console.log(groupScoreCounter);