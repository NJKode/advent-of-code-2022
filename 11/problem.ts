import { Problem } from '../lib/problem';
// Input entered manually

interface Monkey {
	items: number[]
	inspect(item: number): number,
	test(worryLevel: number): number,
	timesInspected: number
}
export class Problem11 extends Problem {

	createMonkeys() {
		const monkeys: Monkey[] = [];
		// Monkey 0
		monkeys.push({
			items: [91, 66],
			inspect: (item) => item * 13,
			test: (worryLevel) => worryLevel % 19 === 0 ? 6 : 2,
			timesInspected: 0
		});

		// Monkey 1
		monkeys.push({
			items: [78, 97, 59],
			inspect: (item) => item + 7,
			test: (worryLevel) =>  worryLevel % 5 === 0 ? 0 : 3,
			timesInspected: 0
		});

		// Monkey 2
		monkeys.push({
			items: [57, 59, 97, 84, 72, 83, 56, 76],
			inspect: (item) => item + 6,
			test: (worryLevel) =>  worryLevel % 11 === 0 ? 5 : 7,
			timesInspected: 0
		});

		// Monkey 3
		monkeys.push({
			items: [81, 78, 70, 58, 84],
			inspect: (item) => item + 5,
			test: (worryLevel) =>  worryLevel % 17 === 0 ? 6 : 0,
			timesInspected: 0
		});

		// Monkey 4
		monkeys.push({
			items: [60],
			inspect: (item) => item + 8,
			test: (worryLevel) =>  worryLevel % 7 === 0 ? 1 : 3,
			timesInspected: 0
		});

		// Monkey 5
		monkeys.push({
			items: [57, 69, 63, 75, 62, 77, 72],
			inspect: (item) => item * 5,
			test: (worryLevel) =>  worryLevel % 13 === 0 ? 7 : 4,
			timesInspected: 0
		});

		// Monkey 6
		monkeys.push({
			items: [73, 66, 86, 79, 98, 87],
			inspect: (item) => item * item,
			test: (worryLevel) =>  worryLevel % 3 === 0 ? 5 : 2,
			timesInspected: 0
		});

		// Monkey 7
		monkeys.push({
			items: [95, 89, 63, 67],
			inspect: (item) => item + 2,
			test: (worryLevel) =>  worryLevel % 2 === 0 ? 1 : 4,
			timesInspected: 0
		});

		return monkeys;
	}

	monkeyBusiness(monkeys: Monkey[], numRounds: number) {
		for (let r = 0; r < numRounds; r += 1) {
			for (let m = 0; m < monkeys.length; m += 1) {
				const numItems = monkeys[m].items.length;
				for (let i = 0; i < numItems; i += 1) {
					let item: number = monkeys[m].items.shift() || 0;
					item = monkeys[m].inspect(item);
					monkeys[m].timesInspected += 1;
					item = Math.floor(item / 3);
					const targetMonkey = monkeys[m].test(item);
					monkeys[targetMonkey].items.push(item);
				}
			}
		}

		const sortedMonkeys = monkeys.sort((a: Monkey, b: Monkey) => {
			return b.timesInspected - a.timesInspected;
		});
		const monkeyBusiness = sortedMonkeys[0].timesInspected * sortedMonkeys[1].timesInspected;
		return monkeyBusiness.toString();
	}

	concerningMonkeyBusiness(monkeys: Monkey[], numRounds: number) {
		const trim = 19 * 5 * 11 * 17 * 7 * 13 * 3 * 2;

		for (let r = 0; r < numRounds; r += 1) {
			for (let m = 0; m < monkeys.length; m += 1) {
				const numItems = monkeys[m].items.length;
				for (let i = 0; i < numItems; i += 1) {
					let item: number = monkeys[m].items.shift() || 0;
					item = monkeys[m].inspect(item);
					item %= trim;
					monkeys[m].timesInspected += 1;
					const targetMonkey = monkeys[m].test(item);
					monkeys[targetMonkey].items.push(item);
				}
			}
		}

		const sortedMonkeys = monkeys.sort((a: Monkey, b: Monkey) => {
			return b.timesInspected - a.timesInspected;
		});
		const monkeyBusiness = sortedMonkeys[0].timesInspected * sortedMonkeys[1].timesInspected;
		return monkeyBusiness.toString();
	}

	solve() {
		const monkeys: Monkey[] = this.createMonkeys();
		const concerningMonkeys: Monkey[] = this.createMonkeys();

		const p1Solution: string = this.monkeyBusiness(monkeys, 20);
		const p2Solution: string = this.concerningMonkeyBusiness(concerningMonkeys, 10000);

		return {
			p1: p1Solution,
			p2: p2Solution
		};
	}
}