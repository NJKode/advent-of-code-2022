import { Problem } from '../lib/problem';
import { input } from './io/input';
interface Node {
	id: string,
	pos: Coord,
	parent: Node | null,
	height: number,
	steps: number,
	score: number
}
interface Coord {
	x: number,
	y: number
}
export class Problem12 extends Problem {
	hills: string[][] = [];
	goal: Node = this.createDefaultNode();
	start: Node = this.createDefaultNode();
	startingNodes: Node[] = [];

	createNode(x: number, y: number, character: string, parent: Node | null) {
		if (character === 'S') {
			character = 'a';
		}
		if (character === 'E') {
			character = 'z';
		}

		const node: Node = {
			id: `${x},${y}`,
			pos: { x, y },
			parent,
			height: this.getNodeHeight(character),
			score: parent ? parent.steps : 0,
			steps: parent ? parent.steps + 1 : 0
		};

		return node;
	}

	createDefaultNode() {
		return this.createNode(-1, -1, '', null);
	}

	nodesAreEqual(a: Node, b: Node) {
		return a.id === b.id;
	}

	findNode(list: Node[], node: Node) {
		let foundNode: Node | null = null;
		let index = 0;
		while (index < list.length && !foundNode) {
			if (this.nodesAreEqual(list[index], node)) {
				foundNode = list[index];
			}
			index += 1;
		}
		return foundNode;
	}

	getNodeHeight(character: string) {
		return character.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
	}

	createProblemSpace() {
		input.split('\n').forEach((line, y) => {
			const points = Array.from(line);
			points.forEach((pt, x) => {
				const node = this.createNode(x, y, pt, null);
				if (pt === 'S') {
					this.startingNodes.push(node);
					this.start = node;
				} else if (pt === 'E') {
					this.goal = node;
				} else if (pt === 'a') {
					this.startingNodes.push(node);
				}
			});
			this.hills.push(points);
		});
	}

	findDistanceToGoal(startingNode: Node) {
		this.goal.parent = null;
		let openList: Node[] = [startingNode];
		let closedList: Node[] = [];

		while (openList.length && !this.goal.parent) {
			const bestNode: Node = openList.pop() || this.createDefaultNode();
			const { x, y } = bestNode.pos;
			const neighbouringCoords: Coord[] = [
				{ x: x - 1, y},
				{ x: x + 1, y},
				{ x, y: y - 1},
				{ x, y: y + 1 }];
			const neighbours: Node[] = [];

			neighbouringCoords.forEach((n) => {
				if (n.x >= 0 && n.x < this.hills[0].length && n.y >= 0 && n.y < this.hills.length) {
					const newNode = this.createNode(n.x, n.y, this.hills[n.y][n.x], bestNode);
					if (newNode.height - bestNode.height <= 1) {
						neighbours.push(newNode);
					}
				}
			});

			neighbours.forEach((neighbour) => {
				if (this.nodesAreEqual(neighbour, this.goal)) {
					this.goal.parent = bestNode;
				} else {
					const openNode: Node | null = this.findNode(openList, neighbour);
					const closeNode: Node | null = this.findNode(closedList, neighbour);
					if (!(openNode && openNode.score < neighbour.score) &&
						!(closeNode && closeNode.score < neighbour.score)) {

						if (openNode) {
							openList = openList.filter((node) => {
								return !this.nodesAreEqual(node, openNode);
							});
						}
						if (closeNode) {
							closedList = closedList.filter((node) => {
								return !this.nodesAreEqual(node, closeNode);
							});
						}
						openList.push(neighbour);
					}
				}
			});

			closedList.push(bestNode);

			openList.sort((a: Node, b: Node) => {
				return b.score - a.score;
			});
		}
		let nodeInChain: Node | null = this.goal;
		const steps: Coord[] = [];

		while (nodeInChain) {
			steps.push(nodeInChain.pos);
			nodeInChain = nodeInChain.parent;
		}

		steps.pop(); // remove start point from chain
		steps.reverse();
		const numSteps = steps.length || Number.MAX_SAFE_INTEGER;
		return numSteps;
	}

	findScenicRoute() {
		let shortestRoute = Number.MAX_SAFE_INTEGER;
		const numNodes = this.startingNodes.length;
		const percentChunk = Math.round(numNodes * 1.0 / 100);
		const percentPointsPerLog = 25;

		this.startingNodes.forEach((start, index) => {
			const distance = this.findDistanceToGoal(start);
			if (distance < shortestRoute) {
				shortestRoute = distance;
			}

			if (index % (percentChunk * percentPointsPerLog) === 0) {
				const percentComplete = Math.round((index * 1.0 / numNodes) * 100);
				console.log(`${percentComplete}% complete`);
			}
		});
		console.log('\n');

		return shortestRoute;
	}

	solve() {
		this.createProblemSpace();

		const p1Solution: string = this.findDistanceToGoal(this.start).toString();
		const p2Solution: string = this.findScenicRoute().toString();

		return {
			p1: p1Solution,
			p2: p2Solution
		};
	}
}