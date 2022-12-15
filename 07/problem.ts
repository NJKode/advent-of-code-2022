import { Problem } from '../lib/problem';
import { input } from './io/input';

interface Dir {
	files: File[],
	size: number,
	dirs: { [name: string]: Dir }
}

interface File {
	name: string,
	size: number
}

export class Problem07 extends Problem {

	getCWD(root: Dir, scope: string[]) {
		let cwd: Dir = root;
		scope.forEach((dir: string) => {
			cwd = cwd.dirs[dir];
		});

		return cwd;
	}

	
	bubbleFileSizes(root: Dir, scope: string[], fileSize: number) {
		let cwd: Dir = root;
		scope.forEach((dir: string) => {
			cwd = cwd.dirs[dir];
			cwd.size += fileSize;
		});
		root.size += fileSize
	}

	createFileStructure() {
		const root: Dir = {
			size: 0,
			files: [],
			dirs: {}
		}

		const stdIO: string[] = input.split('\n');

		let scope: string[] = []

		stdIO.forEach((io: string) => {
			if (io.startsWith('$ cd')) {
				const dirName: string = io.substring(5);
				if (dirName === '..') {
					scope.pop();
				} else if (dirName !== '/') {
					scope.push(dirName);
				}
			} else if (io !== '$ ls') {
				const details: string[] = io.split(' ');
				if (details[0] === 'dir') {
					const dirName: string = details[1];
					const cwd: Dir = this.getCWD(root, scope);
					cwd.dirs[dirName] = {
						size: 0,
						files: [],
						dirs: {}
					}
				} else {
					const file: File = {
						size: parseInt(details[0]) || 0,
						name: details[1]
					}
					const cwd: Dir = this.getCWD(root, scope);
					cwd.files.push(file);
					this.bubbleFileSizes(root, scope, file.size)
				}
			}
		})

		return root;
	}

	getP1Solution(fileSystem: Dir) {
		let sum = 0;

		Object.keys(fileSystem.dirs).forEach((dirName: string) => {
			const dir: Dir = fileSystem.dirs[dirName];
			if (dir.size <= 100000) {
				sum += dir.size;
			}
			sum += this.getP1Solution(dir);

		});
		return sum;
	}

	getP2Solution(fileSystem: Dir, unusedSpace: number) {
		const TOTAL_SPACE = 70000000;
		const NEEDED_SPACE = 30000000;
		unusedSpace = unusedSpace || TOTAL_SPACE - fileSystem.size;
		const MINIMUM_FILESIZE = NEEDED_SPACE - unusedSpace;

		let smallestDir = TOTAL_SPACE;

		Object.keys(fileSystem.dirs).forEach((dirName: string) => {
			const dir: Dir = fileSystem.dirs[dirName];
			if (dir.size >= MINIMUM_FILESIZE && dir.size < smallestDir) {
				smallestDir = dir.size;
			}
			let child = this.getP2Solution(dir, unusedSpace);
			if (child < smallestDir) {
				smallestDir = child;
			}
			return smallestDir;
		});
		return smallestDir;
	}

	
	solve() {
		const fileSystem = this.createFileStructure();

		const p1Solution: string = this.getP1Solution(fileSystem).toString();
		const p2Solution: string =  this.getP2Solution(fileSystem, 0).toString();

		return {
			p1: p1Solution,
			p2: p2Solution
		}
	}
}