import { readFileSync } from 'fs';

export class Runner {
	constructor() {
		
	}

	getInput() {
		const input = readFileSync('./io/p1_input.txt', 'utf8');
		console.log(input);
	}

	solve() {
		console.log('working...');
		this.getInput();
	}
}
