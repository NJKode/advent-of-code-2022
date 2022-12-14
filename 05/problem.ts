import { Problem } from '../lib/problem';
import { input } from './io/input';

const CRATE_SPACE = 4;
const NUM_STACKS = 9;

interface Command {
	amount: number,
	from: number,
	to: number
}

export class Problem05 extends Problem {

	createStacks() {
		const stacksString: string = input.substring(0, input.indexOf('\n 1'));
		const stackLayers: string[] = stacksString.split('\n');

		const stacks: string[][] = [];
		for (let i = 0; i < NUM_STACKS; i += 1) {
			stacks.push([]);
		}

		stackLayers.forEach((layer: string) => {
			for (let stk = 0; stk < NUM_STACKS; stk += 1) {
				const crateStart: number = stk * CRATE_SPACE;
				const crateEnd: number = crateStart + CRATE_SPACE;
				const crate: string = layer.substring(crateStart, crateEnd); // e.g. '[A] ' (without quotes)
				const crateID: string = crate.charAt(1).trim();
				if (crateID) {
					stacks[stk].push(crateID)
				}
			}
		});

		for (let s = 0; s < stacks.length; s += 1) {
			stacks[s].reverse();
		}
		return stacks;
	}

	parseCommands() {
		const commands: Command[] = [];
		const commandsString: string = input.substring(input.indexOf('move') - 1).trim();

		commandsString.split('\n').forEach((commandString) => {
			const commandParams = commandString
				.replace(/[a-zA-Z]/ig, '')
				.replace(/\s+/ig, ' ')
				.trim().split(' ');
			commands.push({
				amount: parseInt(commandParams[0]) || 0,
				from: parseInt(commandParams[1]) - 1 || 0,
				to: parseInt(commandParams[2]) - 1 || 0
			})
		})
		return commands;
	}

	executeCommands(stacks: string[][], commands: Command[]) {
		commands.forEach((command) => {
			for (let c = 0; c < command.amount; c += 1) {
				const crate: string = stacks[command.from].pop() || '';
				stacks[command.to].push(crate);
			}
		});

		return stacks;
	}

	executeCommandsP2(stacks: string[][], commands: Command[]) {
		commands.forEach((command) => {
			const cratesToMove: string[] = stacks[command.from].slice(- 1 * command.amount);
			stacks[command.to] = stacks[command.to].concat(cratesToMove);
			stacks[command.from] = stacks[command.from].slice(0, - 1 * command.amount);
		});

		return stacks;
	}

	solve() {
		const commands: Command[] = this.parseCommands();
		const stacks: string[][] = this.createStacks();
		const stacksP2: string[][] = this.createStacks();
		
		const sortedStacks: string[][] = this.executeCommands(stacks, commands);
		const sortedStacksP2: string[][] = this.executeCommandsP2(stacksP2, commands);

		const p1Solution: string = sortedStacks.reduce((memo: string, stack: string[]) => {
			return `${memo}${stack[stack.length-1] || ' '}`
		}, '');
		const p2Solution: string = sortedStacksP2.reduce((memo: string, stack: string[]) => {
			return `${memo}${stack[stack.length-1] || ' '}`
		}, '');

		return {
			p1: p1Solution,
			p2: p2Solution
		}
	}
}