import { Problem } from '../lib/problem';
import { input } from './io/input';

interface Rucksack {
	comp1: string,
	comp2: string
}

interface Group {
	elf1: string,
	elf2: string,
	elf3: string,
}

enum Priority {
	a = 1, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z,
	A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z
}
type Item = keyof typeof Priority;

export class Problem03 extends Problem {
	createRucksacks() {
		const rucksacks: Rucksack[] = []; 

		const inventories: string[] = input.split('\n');
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

	createGroups() {
		const groups: Group[] = [];

		const inventories: string[] = input.split('\n');
		const unprocessedGroups: string[] = [];

		for(let i: number = 0; i < inventories.length; i += 1) {
			if (i % 3 === 2) {
				unprocessedGroups.push(`${inventories[i-2]}\n${inventories[i-1]}\n${inventories[i]}`);
			}
		}

		unprocessedGroups.forEach((unprocessedGroup: string) => {
			const elfs: string[] = unprocessedGroup.split('\n');
			const group: Group = {
				elf1: elfs[0],
				elf2: elfs[1],
				elf3: elfs[2]
			}
			groups.push(group);
		});
		return groups;
	}

	findRepeatedItemPriority(rucksack: Rucksack) {
		const comp1Items: string[] = Array.from(rucksack.comp1);
		
		let found: boolean = false;
		let itemIndex: number = 0;
		let priority: number = -1;
		
		while (!found && itemIndex < comp1Items.length) {
			const item: Item = comp1Items[itemIndex] as Item;
			const itemIsRepeated: boolean = rucksack.comp2.includes(item);
			if (itemIsRepeated) {
				found = true;
				priority = Priority[item];
			}
			itemIndex += 1;
		}
		return priority;
	}

	findBadgePriority(group: Group) {
		const elf1Items: string[] = Array.from(group.elf1);
		const elf2Items: string[] = Array.from(group.elf2);

		
		let found: boolean = false;
		let item1Index: number = 0;
		let priority: number = -1;
		
		while (!found && item1Index < elf1Items.length) {
			const item1 = elf1Items[item1Index];
			const indexOfSharedItem: number = elf2Items.findIndex((e) => item1 === e);
			if (indexOfSharedItem >= 0) {
				let item2Index: number = indexOfSharedItem;
				while (!found && item2Index < elf2Items.length) {
					const item: Item = elf2Items[item2Index] as Item;
					const itemIsShared: boolean = group.elf3.includes(item);
					if (itemIsShared) {
						found = true;
						priority = Priority[item];
					}
					item2Index += 1;
				}
			}
			item1Index += 1;
		}
		return priority;
	}

	solve() {
		const rucksacks: Rucksack[] = this.createRucksacks();
		const groups: Group[] = this.createGroups();
		let itemSum: number = 0;
		let badgeSum: number = 0;

		rucksacks.forEach((rucksack) => {
			const priority = this.findRepeatedItemPriority(rucksack);
			itemSum += priority;
		});

		groups.forEach((group) => {
			const priority = this.findBadgePriority(group);
			badgeSum += priority;
		});


		const p1Solution: string = itemSum.toString();
		const p2Solution: string = badgeSum.toString();
		return {
			p1: p1Solution,
			p2: p2Solution
		}
	}
};