import { Problem } from '../lib/problem';
import { input } from './io/input';

type Pair = [ number[], number[] ]
type Packet = [ Packet | number[] | number]
enum State { CORRECT, INCORRECT, UNCONFIRMED };
export class Problem13 extends Problem {

	createPairs() {
		const pairs: any[] = [];
		const segments = input.split('\n\n');

		segments.forEach((segment) => {
			const pair: Pair = [[], []];
			const packets = segment.split('\n');
			packets.forEach((packet, index) => {
				pair[index] = JSON.parse(packet);
			});
			pairs.push(pair);
		});
		return pairs;
	}

	createAllPackets() {
		const packets: any[] = [];
		const segments = input.split('\n');

		segments.forEach((segment) => {
			if (segment) {
				packets.push(JSON.parse(segment));
			}
		});
		packets.push([[2]]);
		packets.push([[6]]);

		return packets;
	}

	isCorrectlyOrdered(left: any, right: any): State {
		let state = State.UNCONFIRMED;
		let found = false;
		let index = 0;

		while(!found && state === State.UNCONFIRMED) {
			if (index >= left.length && index < right.length) {
				state = State.CORRECT;
				found = true;
			} else if (index < left.length && index >= right.length) {
				state = State.INCORRECT;
				found  = true;
			} else if (index >= left.length && index >= right.length) {
				state = State.UNCONFIRMED;
				found = true;
			} else {
				let leftVal = left[index];
				let rightVal = right[index];
				if (typeof leftVal === 'number' && Array.isArray(rightVal)) {
					leftVal = [leftVal];
				} else if (Array.isArray(leftVal) && typeof rightVal === 'number') {
					rightVal = [rightVal];
				}

				if (typeof leftVal === 'number' && typeof rightVal === 'number') {
					if (leftVal < rightVal) {
						found = true;
						state = State.CORRECT;
					} else if (leftVal > rightVal) {
						found = true;
						state = State.INCORRECT;
					} else {
						state = State.UNCONFIRMED;
						found = true;
					}
				} else if (Array.isArray(leftVal) && Array.isArray(rightVal)) {
					state = this.isCorrectlyOrdered(leftVal, rightVal);
					found = true;
				}

				if (found && state === State.UNCONFIRMED) {
					found = false;
					index += 1;
				}
			}
		}

		return state;
	}

	findSum(pairs: any[]) {
		let indexSum = 0;
		for (let p = 0; p < pairs.length; p += 1) {
			const index = p + 1;
			const left = pairs[p][0];
			const right = pairs[p][1];

			const state = this.isCorrectlyOrdered(left, right);
			if (state === State.CORRECT) {
				indexSum += index;
			}
		}
		return indexSum.toString();
	}

	sortPackets(packets: any[]) {
		packets.sort((a, b) => {
			const state = this.isCorrectlyOrdered(a, b);
			if (state === State.CORRECT) {
				return -1;
			}
			return 1;
		});
		return packets;
	}

	findDecoderKey(packets: any[]) {
		let decoderKey = 1;
		for (let p = 0; p < packets.length; p += 1) {
			const index = p + 1;
			if (Array.isArray(packets[p]) && packets[p].length === 1
				&& Array.isArray(packets[p][0]) && packets[p][0].length === 1
				&& (packets[p][0][0] === 2 || packets[p][0][0] === 6)) {
				decoderKey *= index;
			}
		}
		return decoderKey;
	}


	solve() {
		const pairs = this.createPairs();
		const packets = this.createAllPackets();
		const p1Solution: string = this.findSum(pairs);

		const sortedPackets = this.sortPackets(packets);
		const key = this.findDecoderKey(sortedPackets);
		const p2Solution: string = key.toString();

		return {
			p1: p1Solution,
			p2: p2Solution
		};
	}
}