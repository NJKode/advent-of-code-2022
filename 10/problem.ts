import { Problem } from '../lib/problem';
import { input } from './io/input';

interface Vals {
	[cycle: number]: number
}

export class Problem10 extends Problem {
	importantCycles = [20, 60, 100, 140, 180, 220];


	calculateSignalStrength() {
		let X = 1;
		const registerValues: Vals = {};
		const opCycles = 2;
		let cycleNum = 0;

		const commands = input.split('\n');
		let commandIndex = 0;
		let operationStep = 0;
		while (commandIndex < commands.length) {
			const command = commands[commandIndex];

			if (this.importantCycles.includes(cycleNum + 1)) {
				registerValues[cycleNum+1] = X;
			}

			if (command === 'noop') {
				commandIndex += 1;
			} else {
				operationStep += 1;
				if (operationStep === opCycles) {
					const parts = command.split(' ');
					const addValue = parseInt(parts[1]) || 0;
					X += addValue;
					operationStep = 0;
					commandIndex += 1;
				}
			}

			cycleNum += 1;
		}

		let sum = 0;
		this.importantCycles.forEach((cycle) => {
			sum += (registerValues[cycle] * cycle);
		});
		return sum.toString();
	}

	draw() {
		const SCREEN_SIZE = 40;
		const SPRITE_SIZE = 3;
		let output = '';
		let X = 1;
		const opCycles = 2;
		let cycleNum = 0;

		const commands = input.split('\n');
		let commandIndex = 0;
		let operationStep = 0;
		while (commandIndex < commands.length) {
			const command = commands[commandIndex];

			if (Math.abs(X - cycleNum) >= SPRITE_SIZE - 1) {
				output += '.';
			} else {
				output += '#';
			}


			if (command === 'noop') {
				commandIndex += 1;
			} else {
				operationStep += 1;
				if (operationStep === opCycles) {
					const parts = command.split(' ');
					const addValue = parseInt(parts[1]) || 0;
					X += addValue;
					operationStep = 0;
					commandIndex += 1;
				}
			}


			cycleNum += 1;
			if (cycleNum % SCREEN_SIZE === 0) {
				output += '\n';
				cycleNum = 0;
			}
		}

		return output;
	}

	solve() {

		const p1Solution: string = this.calculateSignalStrength();
		const p2Solution = this.draw();

		return {
			p1: p1Solution,
			p2: p2Solution
		};
	}
}