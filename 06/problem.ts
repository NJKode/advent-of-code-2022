import { Problem } from '../lib/problem';
import { input } from './io/input';

export class Problem06 extends Problem {

	findMarkerPosition(bufferSize: number) {
		let markerPosition: number = 0;

		let start: number = 0;
		while (!markerPosition && start + bufferSize <= input.length) {
			const buffer: string = input.substring(start, start + bufferSize);

			if (new Set(Array.from(buffer)).size === bufferSize) {
				markerPosition = start + bufferSize
			}

			start += 1;
		}

		return markerPosition.toString();
	}
	
	solve() {
		const packetMarkerSize: number = 4;
		const messageMarkerSize: number = 14;

		const p1Solution: string = this.findMarkerPosition(packetMarkerSize);;
		const p2Solution: string = this.findMarkerPosition(messageMarkerSize);;

		return {
			p1: p1Solution,
			p2: p2Solution
		}
	}
}