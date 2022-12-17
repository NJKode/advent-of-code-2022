import { Problem } from '../lib/problem';
import { input } from './io/input';

const x = 0;
const y = 1;
type Coords = [number, number];
interface Command {
	direction: string,
	steps: number
}
export class Problem09 extends Problem {

	chase(headPosition: Coords, tailPosition: Coords) {
		const distance = Math.max(
			Math.abs(headPosition[x] - tailPosition[x]),
			Math.abs(headPosition[y] - tailPosition[y])
		);

		if (distance <= 1) {
			return tailPosition;
		}

		if (headPosition[x] - tailPosition[x] > 0) {
			tailPosition[x] += 1;
		} else if (headPosition[x] - tailPosition[x] < 0)  {
			tailPosition[x] -= 1;
		}

		if (headPosition[y] - tailPosition[y] > 0) {
			tailPosition[y] += 1;
		} else if (headPosition[y] - tailPosition[y] < 0)  {
			tailPosition[y] -= 1;
		}
		return tailPosition;
	}

	simulate(numKnots = 1) {
		const headPosition: Coords = [0, 0];
		const knotPositions: Coords[] = [];

		for (let k = 0; k < numKnots; k += 1) {
			knotPositions.push([0, 0]);
		}
		const tailHistory = new Set();

		const commandStrings = input.split('\n');
		const commands: Command[] = commandStrings.map((cmd) => {
			const parts = cmd.split(' ');
			const command: Command = {
				direction: parts[0],
				steps: parseInt(parts[1]) || 0
			};
			return command;
		});

		commands.forEach((command) => {
			for(let s = 0; s < command.steps; s += 1) {
				switch(command.direction) {
				case 'L':
					headPosition[x] -= 1;
					break;
				case 'R':
					headPosition[x] += 1;
					break;
				case 'U':
					headPosition[y] += 1;
					break;
				case 'D':
					headPosition[y] -= 1;
					break;
				default:
					break;
				}

				for (let k = 0; k < numKnots; k += 1) {
					const head: Coords = k === 0 ? headPosition : knotPositions[k - 1];
					knotPositions[k] = this.chase(head, knotPositions[k]);
				}
				const tailPosition = knotPositions[numKnots - 1];
				const positionKey = `${tailPosition[x]},${tailPosition[y]}`;
				tailHistory.add(positionKey);
			}
		});

		return tailHistory.size.toString();
	}

	solve() {
		const p1Solution = this.simulate(1); // 6081
		const p2Solution = this.simulate(9);

		return {
			p1: p1Solution,
			p2: p2Solution
		};
	}
}