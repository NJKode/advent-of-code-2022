import { Problem } from '../lib/problem';
import { input } from './io/input';

// const input = `498,4 -> 498,6 -> 496,6
// 503,4 -> 502,4 -> 502,9 -> 494,9`;

interface Map {
	[loc: string]: string
}
export class Problem14 extends Problem {

	map: Map = {};
	minHeight = 0;

	createMap() {
		const lines = input.split('\n');

		lines.forEach((line) => {
			const points = line.split(' -> ');
			const startingPoint = points[0].split(',');
			let from = {
				x: parseInt(startingPoint[0]) || 0,
				y: parseInt(startingPoint[1]) || 0,
			};
			for(let p = 1; p < points.length; p += 1) {
				const point  = points[p].split(',');
				const to = {
					x: parseInt(point[0]) || 0,
					y: parseInt(point[1]) || 0,
				};
				const isVert = from.x === to.x;
				const ord = isVert ? 'y' : 'x';
				const start = Math.min(from[ord], to[ord]);
				const end = Math.max(from[ord], to[ord]);
				for (let t = start; t < end + 1; t += 1) {
					const id = isVert
						? `${from.x},${t}`
						: `${t},${from.y}`;
					this.map[id] = '#';
				}

				if (isVert && end > this.minHeight) {
					this.minHeight = end;
				}
				from = to;
			}
		});
	}

	spotTaken(x: number, y: number, floorHeight: number = Number.MAX_SAFE_INTEGER) {
		const id = `${x},${y}`;
		return (this.map[id] === '#') || (this.map[id] === 'o') || y === floorHeight;
	}

	dropSand() {
		const drop = { x: 500, y: 0 };
		this.map[`${drop.x},${drop.y}`] = '+';

		let finalized = false;
		let sandCount = 0;
		while(!finalized) {
			let settled = false;
			let sand = { x: drop.x, y: drop.y };
			while(!settled) {
				const testSpot = { x: sand.x, y: sand.y };
				testSpot.y = testSpot.y + 1;
				if (this.spotTaken(testSpot.x, testSpot.y)) {
					testSpot.x = sand.x - 1;
				}
				if (this.spotTaken(testSpot.x, testSpot.y)) {
					testSpot.x = sand.x + 1;
				}
				if (this.spotTaken(testSpot.x, testSpot.y)) {
					settled = true;
				}

				if (!settled) {
					sand = { x: testSpot.x, y: testSpot.y };
					if (sand.y > this.minHeight + 5) {
						finalized = true;
						settled = true;
					}
				} else {
					this.map[`${sand.x},${sand.y}`] = 'o';
					sandCount += 1;
				}
				// console.log(sand);
			}
		}
		return sandCount;
	}

	continueDroppingSand() {
		const floorHeight = this.minHeight + 2;

		const drop = { x: 500, y: 0 };
		this.map[`${drop.x},${drop.y}`] = '+';

		let finalized = false;
		let sandCount = 0;
		while(!finalized) {
			let settled = false;
			let sand = { x: drop.x, y: drop.y };
			while(!settled) {
				const testSpot = { x: sand.x, y: sand.y };
				testSpot.y = testSpot.y + 1;
				if (this.spotTaken(testSpot.x, testSpot.y, floorHeight)) {
					testSpot.x = sand.x - 1;
				}
				if (this.spotTaken(testSpot.x, testSpot.y, floorHeight)) {
					testSpot.x = sand.x + 1;
				}
				if (this.spotTaken(testSpot.x, testSpot.y, floorHeight)) {
					settled = true;
				}

				if (!settled) {
					sand = { x: testSpot.x, y: testSpot.y };
				} else {
					if (sand.x === drop.x && sand.y === drop.y) {
						sandCount += 1;
						settled = true;
						finalized = true;
					} else {
						sandCount += 1;
						this.map[`${sand.x},${sand.y}`] = 'o';
					}
				}
			}
		}
		return sandCount;
	}

	solve() {
		this.createMap();
		const settledSand = this.dropSand();
		const p1Solution: string = settledSand.toString();

		const blockedSand = this.continueDroppingSand() + settledSand;
		const p2Solution: string = blockedSand.toString();

		return {
			p1: p1Solution,
			p2: p2Solution
		};
	}
}