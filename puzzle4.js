const fs = require("fs");
const path = require('path');
const filePath = path.join(process.cwd(), 'puzzle4.txt');

const puzzleInput = fs.readFileSync(filePath, 'utf8', (err) => {
    if(err) throw err;
}).split('\n')

function parseRange(inputRange) {
    try {
        return inputRange.split("-").map((x) => Number(x));
    } catch (error) {
        console.log(inputRange)
    }
}

function checkRanges(rangePair, checkType = 1) {
    const [firstRange, secondRange] = rangePair.split(",");
    const [firstRangeMin, firstRangeMax] = parseRange(firstRange);
    const [secondRangeMin, secondRangeMax] = parseRange(secondRange);
    if(checkType == '1') { //checking if one range envelops the other
        if( (firstRangeMin <= secondRangeMin && firstRangeMax >= secondRangeMax) || (secondRangeMin <= firstRangeMin && secondRangeMax >= firstRangeMax ) ) {
            return true
        } else {
            return false
        }
    } else { //checking if one range overlaps the other
        if( firstRangeMin <= secondRangeMax && firstRangeMax >= secondRangeMin ) {
            return true
        } else {
            return false
        }
    }
}

console.log(puzzleInput.filter((x) => checkRanges(x)).length);
console.log(puzzleInput.filter((x) => checkRanges(x, 2)).length);