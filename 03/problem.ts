import { Problem } from '../lib/problem';
import { input } from './io/input';

interface Rucksack {
	comp1: string,
	comp2: string
}

export class Problem03 extends Problem {
	
	createRucksacks() {
		const rucksacks: Rucksack[] = []; 

		const inventories = input.split('\n');
		inventories.forEach((inventory: string) => {
			const rucksack: Rucksack = {
				comp1: '',
				comp2: ''
			}
			const halfway: number = Math.floor(inventory.length / 2);
			rucksack.comp1 = inventory.substring(0, halfway);
			rucksack.comp2 = inventory.substring(halfway);
			rucksacks.push(rucksack);
		});
		return rucksacks;
	}

	solve() {
		const rucksacks: Rucksack[] = this.createRucksacks();

		const p1Solution: string = '';
		const p2Solution: string = '';
		return {
			p1: p1Solution,
			p2: p2Solution
		}
	}
};