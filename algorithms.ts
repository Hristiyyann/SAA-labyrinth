import { SIZE } from './constants';
import { Labyrinth, Point } from './types';

const directions: Point[] = [[0, 1], [1, 0], [0, -1], [-1, 0]];

function isInsideLabyrinth(point: Point): boolean {
    const [row, col] = point;
    return row >= 0 && row < SIZE && col >= 0 && col < SIZE;
}

function getPath(endPoint: Point, parent: Map<string, Point>) {
    const path: Point[] = [];
    let current: Point | undefined = endPoint;

    while (current) {
        path.push(current);
        current = parent.get(current.toString());
    }

    return path.reverse();
}

export function bfs(labyrinth: Labyrinth, start: Point, end: Point): Point[] | null {
    const queue: Point[] = [start];
    const visited = Array.from({ length: SIZE }, () => Array(SIZE).fill(false));
    const parent = new Map<string, Point>();
    
    visited[start[0]][start[1]] = true;

    while (queue.length > 0) {
        const [row, col] = queue.shift()!;
        if (row === end[0] && col === end[1]) return getPath(end, parent);

        for (const [dr, dc] of directions) {
            const neighbourPoint: Point = [row + dr, col + dc];

            if (
                isInsideLabyrinth(neighbourPoint) &&
                labyrinth[neighbourPoint[0]][neighbourPoint[1]] === 0 &&
                !visited[neighbourPoint[0]][neighbourPoint[1]]
            ) {
                visited[neighbourPoint[0]][neighbourPoint[1]] = true;
                queue.push(neighbourPoint);
                parent.set(neighbourPoint.toString(), [row, col]);
            }
        }
    }

    return null;
}

export function dfs(labyrinth: Labyrinth, start: Point, end: Point) {
    const stack: Point[] = [start];
    const visited = Array.from({ length: SIZE }, () => Array(SIZE).fill(false));
    const parent = new Map<string, Point>();
   
    visited[start[0]][start[1]] = true;

    while (stack.length > 0) {
        const [row, col] = stack.pop()!;
        if (row === end[0] && col === end[1]) return getPath(end, parent);

        for (const [dr, dc] of directions) {
            const neighbourPoint: Point = [row + dr, col + dc];

            if (
                isInsideLabyrinth(neighbourPoint) &&
                labyrinth[neighbourPoint[0]][neighbourPoint[1]] === 0 &&
                !visited[neighbourPoint[0]][neighbourPoint[1]]
            ) {
                visited[neighbourPoint[0]][neighbourPoint[1]] = true;
                stack.push(neighbourPoint);
                parent.set(neighbourPoint.toString(), [row, col]);
            }
        }
    }

    return null;
}