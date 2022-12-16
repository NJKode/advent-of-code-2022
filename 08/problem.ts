import { Problem } from '../lib/problem';
import { input } from './io/input';

export class Problem08 extends Problem {

	createForrest() {
		const forrest: string[][] = [];
		const lines = input.split('\n');

		lines.forEach((line)=> {
			forrest.push(Array.from(line));
		});
		return forrest;
	}

	findVisibleTrees(forrest: string[][]) {
		const width: number = forrest[0].length;
		const height: number = forrest.length;

		let numberVisibleTrees = (height * 2) + (width * 2) - 4;

		for (let y: number = 1; y < height - 1; y += 1){
			for (let x: number = 1; x < width - 1; x += 1){
				const tree: string = forrest[y][x]

				let visible: boolean = false;
				let visibleDown = true;
				let visibleUp = true;
				let visibleLeft = true;
				let visibleRight = true;

				let lookLeft: number = 0;
				while (!visible && visibleLeft && lookLeft < x) {
					const lookTree = forrest[y][lookLeft];
					visibleLeft = lookTree < tree;
					lookLeft += 1;
				}
				visible = visibleLeft;

				let lookRight: number = x + 1;
				while (!visible && visibleRight && lookRight < width) {
					const lookTree = forrest[y][lookRight];
					visibleRight = lookTree < tree;
					lookRight += 1;
				}
				visible = visibleRight;

				let lookUp: number = 0;
				while (!visible && visibleUp && lookUp < y) {
					const lookTree = forrest[lookUp][x];
					visibleUp = lookTree < tree;
					lookUp += 1;
				}
				visible = visibleUp;

				let lookDown: number = y + 1;
				while (!visible && visibleDown && lookDown < height) {
					const lookTree = forrest[lookDown][x];
					visibleDown = lookTree < tree;
					lookDown += 1;
				}
				visible = visibleDown;

				if (visible) {
					numberVisibleTrees += 1;
				}
			}
		}

		return numberVisibleTrees.toString();
	}


	findMostScenic(forrest: string[][]) {

		const width: number = forrest[0].length;
		const height: number = forrest.length;

		let maxViewScore = 0;

		for (let y: number = 1; y < height - 1; y += 1){
			for (let x: number = 1; x < width - 1; x += 1){
				const tree: string = forrest[y][x]

				let viewDown = 0;
				let viewUp = 0;
				let viewLeft = 0;
				let viewRight = 0;

				let lookLeft = x - 1;
				let visibleLeft = true;
				while (visibleLeft && lookLeft >= 0) {
					const lookTree = forrest[y][lookLeft];
					visibleLeft = lookTree < tree;
					lookLeft -= 1;
					viewLeft += 1;
				}

				let lookRight: number = x + 1;
				let visibleRight = true;
				while (visibleRight && lookRight < width) {
					const lookTree = forrest[y][lookRight];
					visibleRight = lookTree < tree;
					lookRight += 1;
					viewRight += 1;
				}

				let lookUp: number = y - 1;
				let visibleUp = true;
				while (visibleUp && lookUp >= 0) {
					const lookTree = forrest[lookUp][x];
					visibleUp = lookTree < tree;
					lookUp -= 1;
					viewUp += 1
				}

				let lookDown: number = y + 1;
				let visibleDown = true;
				while (visibleDown && lookDown < height) {
					const lookTree = forrest[lookDown][x];
					visibleDown = lookTree < tree;
					lookDown += 1;
					viewDown += 1;
				}

				const viewScore = viewLeft * viewRight * viewUp * viewDown;
				if (viewScore > maxViewScore) {
					maxViewScore = viewScore;
				}
			}
		}
		return maxViewScore.toString();
	}

	solve() {
		const forrest: string[][] = this.createForrest();
		const p1Solution: string = this.findVisibleTrees(forrest);
		const p2Solution: string = this.findMostScenic(forrest);;

		return {
			p1: p1Solution,
			p2: p2Solution
		}
	}
}