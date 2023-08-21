interface BlitzRound {
	equation: string
	options: number[]
	answer: number
}

export function normalDifficultyEquation(): BlitzRound {
	const operators = ['+', '-']
	const operator = operators[Math.floor(Math.random() * operators.length)]
	console.log(operator)
	const operand1 = Math.floor(Math.random() * 100) + 1
	const operand2 = Math.floor(Math.random() * 100) + 1

	let equation = `${operand1} ${operator} ${operand2}`
	let answer = 0
	if (operator === '+') {
		console.log('Addition')
		answer = operand1 + operand2
	}
	if (operator === '-') {
		console.log('Substraction')
		answer = operand1 - operand2
	}

	const range = Math.floor(answer * 0.04)
	const closeValues = [answer - range, answer, answer + range]

	return {
		equation: equation,
		options: closeValues.sort(() => Math.random() - 0.5),
		answer: answer,
	}
}
