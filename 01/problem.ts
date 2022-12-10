import { txt } from './io/p1_input'
import { Problem } from '../lib/problem'

interface Solution {
	p1: string,
	p2: string
}

export class Problem01 extends Problem {

	getInput() {
		return txt;
	}

	solve() {
		const input: string = this.getInput();
		
		const elves: string[] = input.split('\n\n');
		let maxCalories: number[] = [0, 0, 0];

		elves.forEach((elf) => {
			const calories: string[] = elf.split('\n');
			const totalCalories: number = calories.reduce((total: number, snack:string) => {
				const snackCalories:number = parseInt(snack);
				return total += snackCalories;
			}, 0);
			

			if (totalCalories > maxCalories[2]) {
				maxCalories[2] = totalCalories;
				maxCalories.sort((a, b) => b-a);
			}

		});

		const p2Solution = maxCalories.reduce((sum: number, cal: number) => sum += cal, 0).toString()
		const solution = {
			p1: maxCalories[0].toString(),
			p2: p2Solution
		}
		return solution;
	}
}
