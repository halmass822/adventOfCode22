const fs = require("fs");
const path = require("path");

function checkWin(opponent, player) {
        if((opponent === 'A' && player === 'X') || (opponent === 'B' && player === 'Y') || (opponent === 'C' && player === 'Z')) {
            return 3; //draw
        } else if((opponent === 'A' && player === 'Y') || (opponent === 'B' && player === 'Z') || (opponent === 'C' && player === 'X')) {
            return 6; //player wins
        } else {
            return 0; //player loses
        }
}

function checkSelection(player) {
    switch(player) {
        case 'X':
            return 1;
        case 'Y':
            return 2;
        case 'Z':
            return 3;
    }
}

function checkScore(opponent, player) {
    return checkSelection(player) + checkWin(opponent, player);
}

function forceResult(opponent, instruction) {
    if (instruction === 'X') { //player must lose
        switch(opponent) {
            case 'A':
                return 'Z';
            case 'B':
                return 'X';
            case 'C':
                return 'Y';
        }

    } else if(instruction === 'Y') { //player must draw
        switch(opponent) {
            case 'A':
                return 'X';
            case 'B':
                return 'Y';
            case 'C':
                return 'Z';
        }
    
    } else if(instruction === 'Z') { //player must win
        switch(opponent) {
            case 'A':
                return 'Y';
            case 'B':
                return 'Z';
            case 'C':
                return 'X';
        }
    }
}

fs.readFile(path.join(process.cwd(), 'puzzle2.txt'), 'utf8', (err, content) => {
    if (err) throw err;
    
    let puzzleInput = content.split('\n');
    
    scoreCounter = 0;

    puzzleInput.forEach((x) => {
        if(x === '') return;
        scoreCounter += checkScore(x.slice(0,1), x.slice(2,3));
    })

    console.log(`Score using the Elf's first strategy guide is ${scoreCounter}`);

    forcedScoreCounter = 0;

    puzzleInput.forEach((x) => {
        if(x === '') return;
        forcedScoreCounter += checkScore(x.slice(0,1), forceResult(x.slice(0,1), x.slice(2,3)));
    })

    console.log(`Score using the Elf's second strategy guide is ${forcedScoreCounter}`);
});