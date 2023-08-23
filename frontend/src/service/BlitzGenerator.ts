interface BlitzRound {
  equation: string;
  options: number[];
  answer: number;
}

export function normalDifficultyEquation(): BlitzRound {
  const operators = ["+", "-"];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  console.log(operator);
  const operand1 = Math.floor(Math.random() * 100) + 1;
  const operand2 = Math.floor(Math.random() * 100) + 1;

  let equation = `${operand1} ${operator} ${operand2}`;
  let answer = 0;
  if (operator === "+") {
    console.log("Addition");
    answer = operand1 + operand2;
  }
  if (operator === "-") {
    console.log("Substraction");
    answer = operand1 - operand2;
  }

  const range = Math.floor(answer * 0.04);
  const closeValues = [Math.ceil(answer - range * 0.8), answer, Math.floor(answer + range * 1.2), Math.floor(answer + range * 1.4)];

  return {
    equation: equation,
    options: shuffleArray(closeValues),
    answer: answer,
  };
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
  }
  return newArray;
}
