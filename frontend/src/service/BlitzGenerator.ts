interface BlitzRound {
  equation: string;
  options: number[];
  answer: number;
}

export function generateEquation(difficulty: string | null, operations: string | null): BlitzRound {
  if (difficulty === "Normal" && operations === "Basic") {
    return normalBasic();
  } else if (difficulty === "Hard" && operations === "Basic") {
    return hardBasic();
  } else if (difficulty === "Extreme" && operations === "Basic") {
    return extremeBasic();
  } else if (difficulty === "Normal" && operations === "Advanced") {
    return normalAdvanced();
  } else if (difficulty === "Hard" && operations === "Advanced") {
    return hardAdvanced();
  } else if (difficulty === "Extreme" && operations === "Advanced") {
    return extremeAdvanced();
  }
  return {
    equation: "-",
    options: shuffleArray([1]),
    answer: 1,
  };
}

export function normalBasic(): BlitzRound {
  let closeValues: number[];
  let answer = 0;
  let equation = "";
  do {
    const operators = ["+", "-"];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    const operand1 = Math.floor(Math.random() * 68) + 13;
    const operand2 = Math.floor(Math.random() * 68) + 13;

    equation = `${operand1} ${operator} ${operand2}`;

    if (operator === "+") {
      answer = operand1 + operand2;
    }
    if (operator === "-") {
      answer = operand1 - operand2;
    }

    const range = Math.floor(answer * 0.06);

    closeValues = [Math.ceil(answer - range * 0.8), answer, Math.floor(answer + range * 1.2), Math.floor(answer + range * 1.4)];
  } while (closeValues[0] === answer || closeValues[2] === answer || closeValues[3] === answer);
  return {
    equation: equation,
    options: shuffleArray(closeValues),
    answer: answer,
  };
}

export function hardBasic(): BlitzRound {
  let closeValues: number[];
  let answer = 0;
  let equation = "";
  do {
    const operators = ["+", "-"];
    const operator1 = operators[Math.floor(Math.random() * operators.length)];
    const operator2 = operators[Math.floor(Math.random() * operators.length)];
    const operand1 = Math.floor(Math.random() * 99) + 15;
    const operand2 = Math.floor(Math.random() * 99) + 15;
    const operand3 = Math.floor(Math.random() * 99) + 15;
    equation = `${operand1} ${operator1} ${operand2} ${operator2} ${operand3}`;

    if (operator1 === "+" && operator2 === "+") {
      answer = operand1 + operand2 + operand3;
    } else if (operator1 === "+" && operator2 === "-") {
      answer = operand1 + operand2 - operand3;
    } else if (operator1 === "-" && operator2 === "+") {
      answer = operand1 - operand2 + operand3;
    } else if (operator1 === "-" && operator2 === "-") {
      answer = operand1 - operand2 - operand3;
    }

    const range = Math.floor(answer * 0.06);

    closeValues = [Math.ceil(answer - range * 0.8), answer, Math.floor(answer + range * 1.2), Math.floor(answer + range * 1.4)];
  } while (closeValues[0] === answer || closeValues[2] === answer || closeValues[3] === answer);
  return {
    equation: equation,
    options: shuffleArray(closeValues),
    answer: answer,
  };
}

export function extremeBasic(): BlitzRound {
  let closeValues: number[];
  let answer = 0;
  let equation = "";
  do {
    const operators = ["+", "-"];
    const operator1 = operators[Math.floor(Math.random() * operators.length)];
    const operator2 = operators[Math.floor(Math.random() * operators.length)];
    const operator3 = operators[Math.floor(Math.random() * operators.length)];
    const operand1 = Math.floor(Math.random() * 150) + 25;
    const operand2 = Math.floor(Math.random() * 150) + 25;
    const operand3 = Math.floor(Math.random() * 150) + 25;
    const operand4 = Math.floor(Math.random() * 150) + 25;
    equation = `${operand1} ${operator1} ${operand2} ${operator2} ${operand3} ${operator3} ${operand4}`;

    if (operator1 === "+" && operator2 === "+" && operator3 === "+") {
      answer = operand1 + operand2 + operand3 + operand4;
    } else if (operator1 === "+" && operator2 === "+" && operator3 === "-") {
      answer = operand1 + operand2 + operand3 - operand4;
    } else if (operator1 === "+" && operator2 === "-" && operator3 === "+") {
      answer = operand1 + operand2 - operand3 + operand4;
    } else if (operator1 === "+" && operator2 === "-" && operator3 === "-") {
      answer = operand1 + operand2 - operand3 - operand4;
    } else if (operator1 === "-" && operator2 === "+" && operator3 === "+") {
      answer = operand1 - operand2 + operand3 + operand4;
    } else if (operator1 === "-" && operator2 === "+" && operator3 === "-") {
      answer = operand1 - operand2 + operand3 - operand4;
    } else if (operator1 === "-" && operator2 === "-" && operator3 === "+") {
      answer = operand1 - operand2 - operand3 + operand4;
    } else if (operator1 === "-" && operator2 === "-" && operator3 === "-") {
      answer = operand1 - operand2 - operand3 - operand4;
    }

    const range = Math.floor(answer * 0.06);

    closeValues = [Math.ceil(answer - range * 0.8), answer, Math.floor(answer + range * 1.2), Math.floor(answer + range * 1.4)];
  } while (closeValues[0] === answer || closeValues[2] === answer || closeValues[3] === answer);
  return {
    equation: equation,
    options: shuffleArray(closeValues),
    answer: answer,
  };
}

export function normalAdvanced(): BlitzRound {
  let closeValues: number[];
  let answer = 0;
  let equation = "";
  do {
    const operators = ["+", "-"];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    const operand1 = Math.floor(Math.random() * 68) + 13;
    const operand2 = Math.floor(Math.random() * 68) + 13;
    const operand3 = Math.floor(Math.random() * 2) + 2;
    let before = false;
    if (fiftyPercentChance()) {
      equation = `${operand1} ${operator} ${operand2} * ${operand3}`;
    } else {
      equation = `${operand3} * ${operand1} ${operator} ${operand2} `;
      before = true;
    }

    if (before) {
      if (operator === "+") {
        answer = operand3 * operand1 + operand2;
      } else if (operator === "-") {
        answer = operand3 * operand1 - operand2;
      }
    } else {
      if (operator === "+") {
        answer = operand1 + operand2 * operand3;
      } else if (operator === "-") {
        answer = operand1 - operand2 * operand3;
      }
    }

    const range = Math.floor(answer * 0.06);

    closeValues = [Math.ceil(answer - range * 0.8), answer, Math.floor(answer + range * 1.2), Math.floor(answer + range * 1.4)];
  } while (closeValues[0] === answer || closeValues[2] === answer || closeValues[3] === answer);
  return {
    equation: equation,
    options: shuffleArray(closeValues),
    answer: answer,
  };
}

export function hardAdvanced(): BlitzRound {
  let closeValues: number[];
  let answer = 0;
  let equation = "";
  do {
    const operators = ["+", "-"];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    const operand1 = Math.floor(Math.random() * 99) + 15;
    const operand2 = Math.floor(Math.random() * 99) + 15;
    const operand3 = Math.floor(Math.random() * 2) + 4;
    let before = false;
    if (fiftyPercentChance()) {
      equation = `${operand1} ${operator} ${operand2} * ${operand3}`;
    } else {
      equation = `${operand3} * ${operand1} ${operator} ${operand2} `;
      before = true;
    }

    if (before) {
      if (operator === "+") {
        answer = operand3 * operand1 + operand2;
      } else if (operator === "-") {
        answer = operand3 * operand1 - operand2;
      }
    } else {
      if (operator === "+") {
        answer = operand1 + operand2 * operand3;
      } else if (operator === "-") {
        answer = operand1 - operand2 * operand3;
      }
    }

    const range = Math.floor(answer * 0.06);

    closeValues = [Math.ceil(answer - range * 0.8), answer, Math.floor(answer + range * 1.2), Math.floor(answer + range * 1.4)];
  } while (closeValues[0] === answer || closeValues[2] === answer || closeValues[3] === answer);
  return {
    equation: equation,
    options: shuffleArray(closeValues),
    answer: answer,
  };
}

export function extremeAdvanced(): BlitzRound {
  let closeValues: number[];
  let answer = 0;
  let equation = "";
  do {
    const operators = ["+", "-"];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    const operand1 = Math.floor(Math.random() * 150) + 25;
    const operand2 = Math.floor(Math.random() * 150) + 25;
    const operand3 = Math.floor(Math.random() * 2) + 5;
    let before = false;
    if (fiftyPercentChance()) {
      equation = `${operand1} ${operator} ${operand2} * ${operand3}`;
    } else {
      equation = `${operand3} * ${operand1} ${operator} ${operand2} `;
      before = true;
    }

    if (before) {
      if (operator === "+") {
        answer = operand3 * operand1 + operand2;
      } else if (operator === "-") {
        answer = operand3 * operand1 - operand2;
      }
    } else {
      if (operator === "+") {
        answer = operand1 + operand2 * operand3;
      } else if (operator === "-") {
        answer = operand1 - operand2 * operand3;
      }
    }

    const range = Math.floor(answer * 0.06);

    closeValues = [Math.ceil(answer - range * 0.8), answer, Math.floor(answer + range * 1.2), Math.floor(answer + range * 1.4)];
  } while (closeValues[0] === answer || closeValues[2] === answer || closeValues[3] === answer);
  return {
    equation: equation,
    options: shuffleArray(closeValues),
    answer: answer,
  };
}

export const calculateMultiplier = (parameter: string | null): number => {
  if (parameter === null) {
    return 1.0;
  }
  switch (parameter) {
    case "None":
      return 1.0;
    case "Memory":
      return 2.0;
    case "PeekABoo":
      return 1.4;
    case "Normal":
      return 1.0;
    case "Hard":
      return 2.0;
    case "Extreme":
      return 3.0;
    case "Basic":
      return 1.0;
    case "Advanced":
      return 2.5;
    default:
      return 1.0;
  }
};

export function getInitialTimer(difficulty: string | null, operations: string | null) {
  if (difficulty === "Normal" && operations === "Basic") {
    return 15;
  } else if (difficulty === "Hard" && operations === "Basic") {
    return 20;
  } else if (difficulty === "Extreme" && operations === "Basic") {
    return 30;
  } else if (difficulty === "Normal" && operations === "Advanced") {
    return 20;
  } else if (difficulty === "Hard" && operations === "Advanced") {
    return 25;
  } else if (difficulty === "Extreme" && operations === "Advanced") {
    return 30;
  }
}

export function getMinimalTimer(difficulty: string | null, operations: string | null) {
  if (difficulty === "Normal" && operations === "Basic") {
    return 5;
  } else if (difficulty === "Hard" && operations === "Basic") {
    return 6;
  } else if (difficulty === "Extreme" && operations === "Basic") {
    return 7;
  } else if (difficulty === "Normal" && operations === "Advanced") {
    return 5;
  } else if (difficulty === "Hard" && operations === "Advanced") {
    return 6;
  } else if (difficulty === "Extreme" && operations === "Advanced") {
    return 7;
  }
}

export function getPlayerLives(difficulty: string | null, operations: string | null) {
  if (difficulty === "Normal" && operations === "Basic") {
    return 3;
  } else if (difficulty === "Hard" && operations === "Basic") {
    return 4;
  } else if (difficulty === "Extreme" && operations === "Basic") {
    return 5;
  } else if (difficulty === "Normal" && operations === "Advanced") {
    return 4;
  } else if (difficulty === "Hard" && operations === "Advanced") {
    return 5;
  } else if (difficulty === "Extreme" && operations === "Advanced") {
    return 6;
  }
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
  }
  return newArray;
}

function fiftyPercentChance(): boolean {
  const randomNumber = Math.random();
  return randomNumber < 0.5;
}
