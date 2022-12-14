import { Problem } from '../lib/problem';
import { input } from './io/input';

interface TaskRange {
	min: number,
	max: number
}


export class Problem04 extends Problem {

	checkIfContained(pair: string) {
		const elfs: string[] = pair.split(',');

		const elf1Range: string[] = elfs[0].split('-');
		const elf1: TaskRange = {
			min: parseInt(elf1Range[0]) || -1,
			max: parseInt(elf1Range[1]) || -1,
		}

		const elf2Range: string[] = elfs[1].split('-');
		const elf2: TaskRange = {
			min: parseInt(elf2Range[0]) || -1,
			max: parseInt(elf2Range[1]) || -1,
		}

		let smallestStart: string = '';
		if (elf1.min === elf2.min) {
			return true
		} else {
			smallestStart = elf1.min < elf2.min ? 'one' : 'two';
		}
		
		let largestEnd: string = 'both';
		if (elf1.max === elf2.max) {
			return true
		} else {
			largestEnd = elf1.max > elf2.max ? 'one' : 'two';
		}

		if (smallestStart === largestEnd) {
			return true;
		}

		return false;
	}

	checkIfOverlapped(pair: string) {
		const elfs: string[] = pair.split(',');

		const elf1Range: string[] = elfs[0].split('-');
		const elf1: TaskRange = {
			min: parseInt(elf1Range[0]) || -1,
			max: parseInt(elf1Range[1]) || -1,
		}
		let elf1Tasks: number[] = [];
		for(let i = elf1.min; i < elf1.max + 1; i += 1) {
			elf1Tasks.push(i);
		}

		const elf2Range: string[] = elfs[1].split('-');
		const elf2: TaskRange = {
			min: parseInt(elf2Range[0]) || -1,
			max: parseInt(elf2Range[1]) || -1,
		}
		let elf2Tasks: number[] = [];
		for(let i = elf2.min; i < elf2.max + 1; i += 1) {
			elf2Tasks.push(i);
		}
		const intersection: number[] = elf1Tasks.filter((task) => elf2Tasks.includes(task));

		return !!(intersection.length);
	}

	solve() {
		const pairs: string[] = input.split('\n');
		let fullyContainedCount: number = 0;
		let overlappedCount: number = 0;

		pairs.forEach((pair) => {
			if (this.checkIfContained(pair)) {
				fullyContainedCount += 1;
			}

			if (this.checkIfOverlapped(pair)) {
				overlappedCount += 1;
			}
		})

		const p1Solution: string = fullyContainedCount.toString();
		const p2Solution: string = overlappedCount.toString();
		return {
			p1: p1Solution,
			p2: p2Solution
		}
	}
}