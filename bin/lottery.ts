import chalk from 'chalk'
import * as inquirer from '@inquirer/prompts'

import package_ from '../package.json' with { type: 'json' }

import { DoubleChromosphere, RedBall, BlueBall } from '../index.js'


type DoubleChromosphereAnswers = {
	quantity: number
	exclude_red_ball: Array<RedBall>,
	exclude_blue_ball: Array<BlueBall>,

}


const step = steps()

try {
	step.next()

	let type = await inquirer.select<'double chromosphere'>(
		{
			message: 'Please select a type of lottery.',
			choices: ['double chromosphere'],
			default: 'double chromosphere',

		},

	)


	if (type === 'double chromosphere'

	) {
		let double_chromosphere = await ask_double_chromosphere_question()

		step.next()

		double_chromosphere_draw(double_chromosphere)

	}

	step.next()

}

catch (e) {
	if (e instanceof Error) {
		console.error(`\n${chalk.red(e.message)}\n`)

	}

}







function * steps(): Generator<void, void, void> {
	console.info(`

${chalk.green('>')} Please follow the prompts

`)

	yield

	console.info(`

${chalk.green('√')} Generating numbers!








████████╗ ██████╗ ██╗  ██╗███████╗██╗     
╚══██╔══╝██╔═══██╗╚██╗██╔╝██╔════╝██║     
   ██║   ██║   ██║ ╚███╔╝ █████╗  ██║     
   ██║   ██║   ██║ ██╔██╗ ██╔══╝  ██║     
   ██║   ╚██████╔╝██╔╝ ██╗███████╗███████╗
   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝ v${package_.version}


Number list:
`)

	yield


}


async function ask_double_chromosphere_question(): Promise<DoubleChromosphereAnswers> {
	let quantity = await inquirer.number(
		{
			message: 'Please enter the quantity of tickets.',
			required: true,
			min: 1,
			default: 100,

		},

	)

	let exclude_red_ball = await inquirer.checkbox(
		{
			message: 'Please select the red balls to be excluded.',

			choices: DoubleChromosphere.red_ball
				.map(
					value => ({ value }),

				),


		},

	)

	let exclude_blue_ball = await inquirer.checkbox(
		{
			message: 'Please select the blue balls to be excluded.',

			choices: DoubleChromosphere.blue_ball
				.map(
					value => ({ value }),

				),


		},

	)


	return { quantity: quantity!, exclude_red_ball, exclude_blue_ball }

}


function double_chromosphere_draw(answers: DoubleChromosphereAnswers): void {
	let lottery = new DoubleChromosphere()

	lottery.exclude('red', ...answers.exclude_red_ball)
	lottery.exclude('blue', ...answers.exclude_blue_ball)


	for (let i = 1; i <= answers.quantity; i++) {
		let index = i.toString()
			.padStart(
				answers.quantity.toString().length,
				'0',

			)

		let [red_ball, blue_ball] = lottery.draw()

		let red_ball_label = red_ball.map(
			v => v.toString().padStart(2, '0'),

		)

		let blue_ball_label = blue_ball.map(
			v => v.toString().padStart(2, '0'),

		)

		console.info(`${index} | ${red_ball_label.join(' ')} | ${blue_ball_label.join(' ')} |`)

	}


}


process.exit(0)