import lookup from './lib/problem-lookup';

(function main() {
	const PROBLEM_INDEX = 2;
	const args: string[] = process.argv;
	let problemNumber: string = args[PROBLEM_INDEX];

	try {
		let test: number = parseInt(problemNumber);
		if (isNaN(test)) {
			throw new Error(`"${problemNumber}" is not a valid number`);
		}
		if (test <= 0 || test > 25) {
			throw new Error('Problem number must be between 1 and 25');
		}
	} catch (error: any) {
		console.error(error.message);
	}
	
	if (problemNumber.length === 1) {
		problemNumber = `0${problemNumber}`
	}

	const Problem = lookup[problemNumber as keyof typeof lookup];

	const runner = new Problem();
	const solution = runner.solve();

	let solutionString = `
	vvvvvvvvvvvvvvvvvv
	Part one solution:
	${solution.p1}`;

	if (solution.p2) {
		solutionString = `${solutionString}
		------------------
		Part two solution:
		${solution.p2}`
	}

	solutionString = `${solutionString}
	^^^^^^^^^^^^^^^^^^`.replace(/\t+/g, '').trim();

	console.log(solutionString);
}());