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

	headPosition: Coords = [0, 0];
	tailPositon: Coords = [0, 0];

	chase() {
		if (this.headPosition[x] - this.tailPositon[x] > 0) {
			this.tailPositon[x] += 1;
		} else if (this.headPosition[x] - this.tailPositon[x] < 0)  {
			this.tailPositon[x] -= 1;
		}

		if (this.headPosition[y] - this.tailPositon[y] > 0) {
			this.tailPositon[y] += 1;
		} else if (this.headPosition[y] - this.tailPositon[y] < 0)  {
			this.tailPositon[y] -= 1;
		}
	}

	simulate() {
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
					this.headPosition[x] -= 1;
					break;
				case 'R':
					this.headPosition[x] += 1;
					break;
				case 'U':
					this.headPosition[y] += 1;
					break;
				case 'D':
					this.headPosition[y] -= 1;
					break;
				default:
					break;
				}

				const distance = Math.max(
					Math.abs(this.headPosition[x] - this.tailPositon[x]),
					Math.abs(this.headPosition[y] - this.tailPositon[y])
				);

				if (distance > 1) {
					this.chase();
				}
				const positionKey = `${this.tailPositon[x]},${this.tailPositon[y]}`;
				tailHistory.add(positionKey);
			}
		});

		return tailHistory.size.toString();
	}

	solve() {
		const p1Solution = this.simulate();
		const p2Solution = '';

		return {
			p1: p1Solution,
			p2: p2Solution
		};
	}
}