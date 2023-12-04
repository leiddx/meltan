export type RedBall =
	1 | 2 | 3 | 4 |
	5 | 6 | 7 | 8 |
	9 | 10 | 11 | 12 |
	13 | 14 | 15 | 16 |
	17 | 18 | 19 | 20 |
	21 | 22 | 23 | 24 |
	25 | 26 | 27 | 28 |
	29 | 30 | 31 | 32 | 33


export type BlueBall =
	1 | 2 | 3 | 4 |
	5 | 6 | 7 | 8 |
	9 | 10 | 11 | 12 |
	13 | 14 | 15 | 16


export class DoubleChromosphere {
	#red_ball: Array<RedBall> = []

	#blue_ball: Array<BlueBall> = []

	static readonly red_ball: Array<RedBall> = [
		1, 2, 3, 4,
		5, 6, 7, 8,
		9, 10, 11, 12,
		13, 14, 15, 16,
		17, 18, 19, 20,
		21, 22, 23, 24,
		25, 26, 27, 28,
		29, 30, 31, 32, 33,
	]

	static readonly blue_ball: Array<BlueBall> = [
		1, 2, 3, 4,
		5, 6, 7, 8,
		9, 10, 11, 12,
		13, 14, 15, 16,
	]

	constructor() {
		this.reset()

	}

	#exclude<T extends RedBall | BlueBall>(ball: Array<T>, number: Array<number>): Array<T> {
		let map = number.reduce(
			// eslint-disable-next-line no-return-assign
			(a, b) => (a[b] = true, a),

			{} as Record<number, true>,

		)

		return ball.filter(
			v => !map[v],

		)


	}

	exclude(color: 'red', ...number: Array<RedBall>): void

	exclude(color: 'blue', ...number: Array<BlueBall>): void

	exclude(color: 'red' | 'blue', ...number: Array<RedBall | BlueBall>): void {
		if (color === 'red') {
			let ball = this.#exclude(DoubleChromosphere.red_ball, number)

			if (ball.length < 6) {
				throw new Error('The number of red balls must not be less than 6.')

			}

			this.#red_ball = ball

		}

		if (color === 'blue') {
			let ball = this.#exclude(DoubleChromosphere.blue_ball, number)

			if (ball.length < 1) {
				throw new Error('The number of blue balls must not be less than 1.')

			}

			this.#blue_ball = ball

		}

	}

	reset(): void {
		this.#red_ball = [...DoubleChromosphere.red_ball]
		this.#blue_ball = [...DoubleChromosphere.blue_ball]

	}

	draw(red = 6, blue = 1): [Array<RedBall>, Array<BlueBall>] {
		let red_ball = [...this.#red_ball]
		let blue_ball = [...this.#blue_ball]


		red_ball.sort(
			() => Math.random() > 0.5 ? 1 : -1,

		)

		blue_ball.sort(
			() => Math.random() > 0.5 ? 1 : -1,

		)


		return [
			red_ball.slice(0, red).sort((a, b) => a - b),
			blue_ball.slice(0, blue).sort((a, b) => a - b),

		]

	}

}