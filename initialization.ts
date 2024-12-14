import { SIZE } from './constants';
import { Labyrinth, Point } from './types';

function getRandomInnerCell() {
    return Math.floor(Math.random() * (SIZE - 2)) + 1;
}

export function generateLabyrinth() {
    const labyrinth: Labyrinth = Array.from({ length: SIZE }, () =>
        Array.from({ length: SIZE }, () => Math.random() < 0.7 ? 0 : 1)
    );

    return labyrinth;
}

export function findStartPoint(labyrinth: Labyrinth): Point {
    let point: Point;

    do {
        point = [getRandomInnerCell(), getRandomInnerCell()];
    } 
    while (labyrinth[point[0]][point[1]] !== 0 );

    return point;
}

export function findEndPoints(labyrinth: Labyrinth): Point[] {
    const SIZE = labyrinth.length;
    const borderPoints: Point[] = [];

    for (let column = 0; column < SIZE; column++) {
        if (labyrinth[0][column] === 0) borderPoints.push([0, column]);
        if (labyrinth[SIZE - 1][column] === 0) borderPoints.push([SIZE - 1, column]);
    }

    for (let row = 1; row < SIZE - 1; row++) {
        if (labyrinth[row][0] === 0) borderPoints.push([row, 0]);
        if (labyrinth[row][SIZE - 1] === 0) borderPoints.push([row, SIZE - 1]);
    }

    const randomEndpointsCount = Math.floor(Math.random() * borderPoints.length) + 1;
    let currentIndex = borderPoints.length;

    while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [borderPoints[currentIndex], borderPoints[randomIndex]] = [
            borderPoints[randomIndex], borderPoints[currentIndex]
        ];
    }

    return borderPoints.slice(0, randomEndpointsCount);
}
