const fs = require("fs");
const path = require("path");

filePath = path.join(process.cwd(), 'puzzle7.txt');

const puzzleInput = fs.readFileSync(filePath, 'utf8', (err) => {
    if(err) throw err;
}); //puzzle input split by command

function identifyLine(input) {
    const inputSplit = input.split(" ");
    if(inputSplit[1] === "cd") return "directoryChange"
    else if(inputSplit[1] === "ls") return "log contents"
    else if(inputSplit[0].match(/\d+/)) return "file"
    else return 'directory'
}

function identifyFileOrDir(input) { //returns an object representing the file or directory
    const isDirectory = input.includes("dir"); 
    const [x, y] = input.split(" ");
    if(isDirectory) {
        return {directoryName: y};
    } else {
        return {fileName: y, fileSize: Number(x)};
    }
}

function removeDuplicateFiles(inputArray) {
    let output = [];
    inputArray.forEach((x) => {
        if(output.findIndex((y) => y.fileName === x.fileName) === -1) { //if file is not in the output array
            output.push(x);
        }
    })
    return output;
}

function processInput(input) {
    const splitByLine = input.split("\n");
    let directories = [];
    let pathHistory = [];
    let currentContents = [];

    function updateDirectory(targetDirectory, contents) { //adds contents to the directory. if no such array element exists in the directories array, one is added
        const directoryIndex = directories.findIndex((x) => x.directoryName === targetDirectory);
        if ( directoryIndex === -1) {
            directories.push({directoryName: targetDirectory, contents: [...contents], totalFileSize: 0});
        } else {
            directories[directoryIndex].contents.push(...contents);
        }
    }
    splitByLine.forEach((x, i) => {
        const lineType = identifyLine(x);
        switch(lineType) {
            case "directoryChange":
                pathHistory.forEach((y) => updateDirectory(y, currentContents)); //add all files observed to all directories in the path history
                currentContents = [];
                directoryName = x.split(" ")[2]
                if(directoryName === "..") {
                    pathHistory.shift();
                } else {
                    pathHistory.unshift(directoryName);
                }
                break;
            case "file" || "directory":
                currentContents.push(identifyFileOrDir(x));
                break;
        }
        if(i === splitByLine.length - 1) { //if on the last line, update all contents to the currently observed directory
            pathHistory.forEach((y) => updateDirectory(y, currentContents));
        }
    })

    directories.forEach(({contents}, index) => { //adds up the total file size of all files in each directory
        directories[index].contents = removeDuplicateFiles(contents);
        directories[index].contents.forEach((x) => {
            if(x.hasOwnProperty("fileSize")) {
                directories[index].totalFileSize += x.fileSize
            }
        })
    })

    const smallDirectories = directories.filter((directory) => {
        return directory.totalFileSize <= 100000
    });

    let fileSizeCounter = 0;
    smallDirectories.forEach((x) => fileSizeCounter += x.totalFileSize)

    console.log(fileSizeCounter);

}

processInput(puzzleInput);

const testInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`

processInput(testInput);

