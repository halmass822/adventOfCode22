const fs = require("fs");
const path = require("path");

filePath = path.join(process.cwd(), 'puzzle6.txt');

const puzzleInput = fs.readFileSync(filePath, 'utf8', (err) => {
    if(err) throw err;
});

function checkBuffer(input, bufferLength) {
    let current4chars = [""];
    let markerBuffer;
    let markerIndex;
    current4chars.push(...input.slice(0, (bufferLength - 1)).split(""));
    for(let i = (bufferLength - 1); i < input.length ; i++) {
        current4chars.shift();
        current4chars.push(input.slice(i,i + 1));
        let isStartMarker = true;
        current4chars.forEach((x) => {
            if(current4chars.filter((y) => y === x).length > 1) {
                isStartMarker = false;
            }
        })
        if(isStartMarker) {
            markerBuffer = current4chars;
            markerIndex = i + 1;
            break;
        }
    }
    return [markerBuffer, markerIndex];
}

console.log(checkBuffer(puzzleInput, 4));
console.log(checkBuffer(puzzleInput, 14));