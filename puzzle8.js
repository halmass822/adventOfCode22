const fs = require("fs");
const path = require("path");

filePath = path.join(process.cwd(), 'puzzle8.txt');

function addLeadingZero(input) {
    if(input < 10 ) return `0${input}`;
    return input;
};

function parseCoordinates(input) {
    return [input.substring(0,2), input.substring(2,4)];
}

function stringifyCoordinates(inputArray) {
    return `${addLeadingZero(inputArray[0])}${addLeadingZero(inputArray[1])}`;
}

function checkRowOrColumn(inputTreeArray, treeHeight) {
    return inputTreeArray.every((x) => {
        return x.treeHeight < treeHeight
    })
}

const puzzleInput = fs.readFileSync(filePath, 'utf8', (err) => {
    if(err) throw err;
});

function generateTreeArray(input) {

    const forestByRow = input.split('\n');
    const forestWidth = input.indexOf('\n');
    const forestHeight = forestByRow.length;

    let treeArray = [];
    for(y = 0 ; y < forestHeight ; y++) {
        for(x = 0 ; x < forestWidth ; x++) {
            treeArray.push({
                coordinates: `${addLeadingZero(x)}${addLeadingZero(y)}`, //top left coordinate becomes 0000, bottom right becomes 9999
                treeHeight: forestByRow[y].substring(x, (x + 1))
            })
        }
    }

    function checkVisibility(tree) {
        const [xCoord, yCoord] = parseCoordinates(tree.coordinates);

        const treesFromWest = treeArray.filter((x) => {
            const [comparisonXCoord, comparisonYCoord] = parseCoordinates(x.coordinates);
            return comparisonXCoord < xCoord && comparisonYCoord === yCoord;
        });

        const treesFromEast = treeArray.filter((x) => {
            const [comparisonXCoord, comparisonYCoord] = parseCoordinates(x.coordinates);
            return comparisonXCoord > xCoord && comparisonYCoord === yCoord;
        });

        const treesFromNorth = treeArray.filter((x) => {
            const [comparisonXCoord, comparisonYCoord] = parseCoordinates(x.coordinates);
            return comparisonXCoord === xCoord && comparisonYCoord < yCoord;
        });

        const treesFromSouth = treeArray.filter((x) => {
            const [comparisonXCoord, comparisonYCoord] = parseCoordinates(x.coordinates);
            return comparisonXCoord === xCoord && comparisonYCoord > yCoord;
        });

        if([treesFromWest, treesFromEast, treesFromNorth, treesFromSouth].some((x) => {
            return x.length <= 0 || checkRowOrColumn(x, tree.treeHeight); //if any of the above tree arrays are empty or checkRowOrColumn returns true, return true
        })) return true;
        else return false;
    }

    treeArray.forEach((tree) => {
        tree.visibility = checkVisibility(tree);
    });

    const numOfVisibleTrees = treeArray.filter((x) => x.visibility === true).length;

    console.log(numOfVisibleTrees);
}


const testInput = `30373
25512
65332
33549
35390`

generateTreeArray(puzzleInput);