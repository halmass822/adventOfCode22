const fs = require("fs");
const path = require("path");

filePath = path.join(process.cwd(), 'puzzle5.txt')

const puzzleInput = fs.readFileSync(filePath, 'utf8', (err) => { //splits stack and the movements into 2 strings
    if(err) throw err;
}).split('\n\n')

class stackObject {
    constructor(stackInput) { //accepts a string representing the stack
        this.movements = stackInput[1];
        const regex = /\d{1,2}/g
        let [stackItems, ...stackNumbers] = stackInput[0].replaceAll(regex, (match) => `|${match}`).split("|") //splits the string into the stacked items and the stack numbers
        stackNumbers = stackNumbers.reduce((acc, x) => [...acc, x.trim()]).filter((x) => x !== " ") //trims the numbers and filters out any blanks
        stackNumbers.forEach((stackNumber) => { //adds a property representing each stack
            this[stackNumber] = []
        })
        this.numOfStacks = stackNumbers.length;
        stackItems.split("\n").filter((x) => x !== " ") //splits the stack into rows, filtering out any blanks
        .forEach((row) => {
            let stackCounter = 1
            for(let i = 0 ; i < row.length ; i += 4) {
                const stackObject = row.slice(i, i + 4).match(/\[\w\]/)
                stackObject && this[stackCounter].unshift(stackObject[0])
                stackCounter ++
            }
        })
    }
    performAllMovements(modelNumber = 9000) {
        this.movements.split("\n").forEach((movement) => {
            const [numOfMovements, stackSource, stackReciever] = movement.match(/\d{1,2}/g);
            if(modelNumber === 9000) {
                for(let i = 0; i < numOfMovements; i++) {
                    this[stackReciever].push(this[stackSource].pop());
                }
            } else {
                let movedCrates = [];
                for( let i = 0 ; i < numOfMovements ; i++ ) {
                    movedCrates.unshift(this[stackSource].pop());
                }
                this[stackReciever].push(...movedCrates)
            }
        })
    }
    getCurrentStack() {
        let stackOutput = [];
        let topItemOutput = "";
        
        for(let i = 1; i <= this.numOfStacks ; i++) {
            stackOutput.push(this[i]);
            const lastItem = this[i][this[i].length - 1];
            topItemOutput += lastItem.replaceAll(/\[|\]/g, "");
        }
        return [stackOutput, topItemOutput];
    }
}

const puzzle5 = new stackObject(puzzleInput);
puzzle5.performAllMovements();
console.log(puzzle5.getCurrentStack()[1]);

const puzzle5part2 = new stackObject(puzzleInput);
puzzle5part2.performAllMovements(9001);
console.log(puzzle5part2.getCurrentStack()[1]);