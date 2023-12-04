import chalk from 'chalk'
import inquirer from 'inquirer'

import package_ from '../package.json' assert { type: 'json' }

import { DoubleChromosphere, RedBall, BlueBall } from '../index'

type Answers = {
	type: 'double chromosphere'
}

type DoubleChromosphereAnswers = {
	quantity: number
	exclude_red_ball: Array<RedBall>,
	exclude_blue_ball: Array<BlueBall>,
}


const step = steps()

try {
	step.next()

	const answers = await inquirer.prompt<Answers>(
		[
			{
				type: 'list',
				name: 'type',
				message: 'Please select a type of lottery.',
				choices: ['double chromosphere'],
				default: 'double chromosphere',
			},


		],

	)


	if (
		answers.type === 'double chromosphere'
	) {
		const double_chromosphere_answers = await ask_double_chromosphere_question()

		step.next()

		double_chromosphere_draw(double_chromosphere_answers)

	}

	step.next()

}

catch (e) {
	if (e instanceof Error) {
		console.error(`\n${chalk.red(e.message)}\n`)

	}

}







function* steps() {
	yield console.info(`
	
${chalk.green('>')} Please follow the prompts

`)


	yield console.info(`

${chalk.green('√')} Generating numbers!








████████╗ ██████╗ ██╗  ██╗███████╗██╗     
╚══██╔══╝██╔═══██╗╚██╗██╔╝██╔════╝██║     
   ██║   ██║   ██║ ╚███╔╝ █████╗  ██║     
   ██║   ██║   ██║ ██╔██╗ ██╔══╝  ██║     
   ██║   ╚██████╔╝██╔╝ ██╗███████╗███████╗
   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝ v${package_.version}

Number list:

`)

}


function ask_double_chromosphere_question(): Promise<DoubleChromosphereAnswers> {
	return inquirer.prompt<DoubleChromosphereAnswers>(
		[
			{
				type: 'number',
				name: 'quantity',
				message: 'Please enter the quantity of tickets.',
				default: 100,
			},

			{
				type: 'checkbox',
				name: 'exclude_red_ball',
				choices: DoubleChromosphere.red_ball,
				message: 'Please select the red balls to be excluded.',
			},

			{
				type: 'checkbox',
				name: 'exclude_blue_ball',
				choices: DoubleChromosphere.blue_ball,
				message: 'Please select the blue balls to be excluded.',
			},

		],

	)

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

		console.info(`${index} |${red_ball_label.join(' ')}|${blue_ball_label.join(' ')}|`)

	}


}


process.exit(0)