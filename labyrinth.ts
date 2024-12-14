import { bfs, dfs } from './algorithms';
import { findEndPoints, findStartPoint, generateLabyrinth } from './initialization';
import { Labyrinth, Point } from './types';
var clc = require("cli-color");

function printPaths(paths: Point[][]) {
    for (const path of paths) {
        const endPoint = path[path.length - 1];
        console.log(`\nEnd Point: ${endPoint[0]}, ${endPoint[1]}`);
        printLabytinth(labyrinth, path);
    }
}

function printLabytinth(labyrinth: Labyrinth, path: Point[] | null) {
    if (!path) return;

    const pathSet = new Set(path.map(([row, col]) => `${row},${col}`));

    for (let row = 0; row < labyrinth.length; row++) {
        const rowCharacters: (number | string)[] = [];
        
        for (let column = 0; column < labyrinth[row].length; column++) {
            if (pathSet.has(`${row},${column}`)) {
                rowCharacters.push(clc.yellow('#'));
            } 
            else rowCharacters.push(labyrinth[row][column]);
        }

        console.log(rowCharacters.join(' '));
    }
}

const labyrinth = generateLabyrinth();
const endPoints = findEndPoints(labyrinth)
const startPoint = findStartPoint(labyrinth);

let exitPaths: Point[][] = [];
let shortestPathLength: number | undefined = undefined;

for (let endPointIndex = 0; endPointIndex < endPoints.length; endPointIndex++) {
    const bfsPath = bfs(labyrinth, startPoint, endPoints[endPointIndex]);
    const dfsPath = dfs(labyrinth, startPoint, endPoints[endPointIndex]);
    
    if (bfsPath) {
        exitPaths.push(bfsPath);
        if (!shortestPathLength || shortestPathLength > bfsPath.length) shortestPathLength = bfsPath.length;
    }
    if (dfsPath) {
        exitPaths.push(dfsPath);
        if (!shortestPathLength || shortestPathLength > dfsPath.length) shortestPathLength = dfsPath.length;
    }
}

let shortestPaths: Point[][] = [];
let remainingPaths: Point[][] = [];

exitPaths.forEach(path => 
    path.length === shortestPathLength
    ? shortestPaths.push(path)
    : remainingPaths.push(path)
);

console.log(`Start point: ${startPoint[0]}, ${startPoint[1]}`);
console.log('Shortest path length', shortestPathLength)

if (remainingPaths.length) {
    console.log('All available paths without shortest ones:')
    printPaths(remainingPaths);
}

if (shortestPaths.length) {
    console.log('Shortest paths:')
    printPaths(shortestPaths)
}

if (!exitPaths.length) {
    console.log('No paths to exit found.');
}