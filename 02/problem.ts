import { Problem } from '../lib/problem'
import { txt as input } from './io/p1_inputs';

interface Result {
	rock: number,
	paper: number,
	scissors: number
};

interface OverallResult {
	win: number,
	draw: number,
	loss: number
};

interface Hand {
	rock: any,
	paper: any,
	scissors: any
}
type H = keyof Hand;

export class Problem02 extends Problem {
	getHand(hand: string) {
		let response;
		switch (hand) {
		case 'A':
		case 'X':
			response = 'rock';
			break;
		case 'B':
		case 'Y':
			response = 'paper';
			break;
		case 'C':
		case 'Z':
			response = 'scissors';
			break;
		default:
			response = 'error';
		}
		return response;
	}

	getResult (myHand: string, opponentHand: string) {
		const responses: Hand = {
			rock: { rock: 3, paper: 0, scissors: 6 },
			paper: { paper: 3, scissors: 0, rock: 6 },
			scissors: { scissors: 3, rock: 0, paper: 6 },
		}
		const result: number = responses[myHand as H][opponentHand] || 0;
		return result;
	}

	playRound(opponent: string, response: string) {
		const opponentHand: string = this.getHand(opponent);
		const myHand: string = this.getHand(response);

		const scores = {
			rock: 1,
			paper: 2,
			scissors: 3
		}
		const handScore: number = scores[myHand as keyof Result];
		const result: number = this.getResult(myHand, opponentHand);
		const roundScore: number = handScore + result;
		return roundScore;
	}

	getResultP2(opponentHand: string, desiredResult: string) {
		const responses: Hand = {
			rock: { loss: 3, draw: 4, win: 8 },
			paper: { loss: 1, draw: 5, win: 9 },
			scissors: { loss: 2, draw: 6, win: 7 },
		}
		const result: number = responses[opponentHand as H][desiredResult] || 0;
		return result;
	}

	playRoundP2(opponent: string, response: string) {
		const translateResult = {
			X: 'loss',
			Y: 'draw',
			Z: 'win'
		}

		const opponentHand: string = this.getHand(opponent);
		const desiredResult: string = translateResult[response as keyof typeof translateResult];

		const result: number = this.getResultP2(opponentHand, desiredResult);
		return result;
	}

	solve() {
		let totalScore: number = 0;
		let totalScoreP2: number = 0;
		const rounds: string[] = input.split('\n');

		rounds.forEach((round) => {
			const hands: string[] = round.split(' ');
			const roundScore: number = this.playRound(hands[0], hands[1]);
			const roundScoreP2: number = this.playRoundP2(hands[0], hands[1]);
			totalScore += roundScore;
			totalScoreP2 += roundScoreP2;
		});

		const p1Solution: string = totalScore.toString();
		const p2Solution: string = totalScoreP2.toString();


		return {
			p1: p1Solution,
			p2: p2Solution
		}
	}
}