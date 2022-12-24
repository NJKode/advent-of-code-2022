import { Problem } from '../lib/problem';
import { input } from './io/input';

interface Coords {
	x: number,
	y: number
}
interface Sensor extends Coords {
	closestDistance: number
}

type Map = {
	[position: string]: 'S' | 'B' | '#';
}

export class Problem15 extends Problem {
	map: Map = {};
	sensors: Sensor[] = [];
	beacons: Coords[] = [];

	space = {
		xMin: Number.MAX_SAFE_INTEGER,
		yMin: Number.MAX_SAFE_INTEGER,
		xMax: Number.MIN_SAFE_INTEGER,
		yMax: Number.MIN_SAFE_INTEGER,
	};

	adjustProblemSpace(x: number, y: number, dist: number) {
		if (x - dist < this.space.xMin) {
			this.space.xMin = x - dist;
		} else if (x + dist > this.space.xMax) {
			this.space.xMax = x + dist;
		}
		if (y - dist < this.space.yMin) {
			this.space.yMin = y - dist;
		} else if (y + dist > this.space.yMax) {
			this.space.yMax = y + dist;
		}
	}

	parseSensorOutput() {
		const lines = input.split('\n');

		lines.forEach((line) => {
			const coords: number[] = Array.from(line.match(/-?[0-9]+/ig) || [], (pos) => parseInt(pos) || 0);
			const beaconLocation: Coords = { x: coords[2] || 0, y: coords[3] || 0 };
			this.beacons.push(beaconLocation);
			this.map[`${beaconLocation.x},${beaconLocation.y}`] = 'B';
			this.adjustProblemSpace(beaconLocation.x, beaconLocation.y, 0);

			const sensor: Sensor = {
				x: coords[0] || 0, y: coords[1] || 0,
				closestDistance: Number.MAX_SAFE_INTEGER };
			sensor.closestDistance
				= Math.abs(sensor.x - beaconLocation.x)
				+ Math.abs(sensor.y - beaconLocation.y);
			this.sensors.push(sensor);
			this.map[`${sensor.x},${sensor.y}`] = 'S';
			this.adjustProblemSpace(sensor.x, sensor.y, sensor.closestDistance);

		});
	}

	runScan() {
		let numSpaces = 0;
		const yScan = 2000000;
		for (let x = this.space.xMin; x < this.space.xMax + 1; x += 1) {
			const taken = this.sensors.some((sensor) => {
				const pos = `${x},${yScan}`;
				const mnhtn = Math.abs(sensor.x - x) + Math.abs(sensor.y - yScan);
				return !this.map[pos] && mnhtn <= sensor.closestDistance;
			});
			numSpaces += taken ? 1 : 0;
		}
		return numSpaces.toString();
	}

	findBeacon() {
		const maxDimension = 4000000;
		let searching = true;
		let finalY = 0;
		let finalX = 0;

		let sensorIndex = 0;
		while(searching && sensorIndex < this.sensors.length) {
			const sensor = this.sensors[sensorIndex];
			const perimeterDistance = sensor.closestDistance + 1;
			let x = Math.max(sensor.x - perimeterDistance, 0);
			while(searching && x <= Math.min(sensor.x + perimeterDistance, maxDimension)) {
				const remainingDistance = perimeterDistance - Math.abs(x - sensor.x);
				const yUp = sensor.y + remainingDistance;
				const yDown = sensor.y - remainingDistance;
				const posUp = `${x},${yUp}`;
				const posDown = `${x},${yDown}`;
				let taken = false;

				if (!this.map[posUp] && !this.map[posDown]) {
					let checkIndex = 0;
					while (!taken && checkIndex < this.sensors.length) {
						const checkSensor = this.sensors[checkIndex];
						if (checkIndex !== sensorIndex) {
							if (yUp <= maxDimension && yUp >= 0) {
								const mnhtnUp = Math.abs(checkSensor.x - x) + Math.abs(checkSensor.y - yUp);
								taken = mnhtnUp <= checkSensor.closestDistance;
								finalY = yUp;
							}
							if (searching && yUp !== yDown && yDown <= maxDimension && yDown >= 0) {
								const mnhtnDown = Math.abs(checkSensor.x - x) + Math.abs(checkSensor.y - yDown);
								taken = mnhtnDown <= checkSensor.closestDistance;
								finalY = yDown;
							}
						}
						checkIndex += 1;
					}
					searching = taken;
				}
				finalX = x;
				x += 1;
			}
			sensorIndex += 1;
		}
		const frequency = (finalX * 4000000) + finalY;
		return frequency.toString();
	}

	solve() {
		this.parseSensorOutput();

		const p1Solution: string = this.runScan();
		const p2Solution: string = this.findBeacon(); // 11600823139120

		return {
			p1: p1Solution,
			p2: p2Solution
		};
	}
}