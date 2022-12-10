import { txt } from './io/p1_input';

export class Runner {
	constructor() {
		
	}

	getInput() {
		let nice;
		console.log(nice);
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

		console.log(maxCalories);
		const finalScore = maxCalories.reduce((sum: number, cal: number) => sum += cal, 0)
		console.log(finalScore);
		return finalScore;
	}
}
