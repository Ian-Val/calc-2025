const expressionInput = document.querySelector("#expression-input");
// const expressionDisplay = document.querySelector("#expression-display");
const resultDisplay = document.querySelector("#result-display");
const copyBtn = document.querySelector("#copy-btn");
let tokens = "";
let tokensPostFix = null;
let solution = "";
expressionInput.addEventListener("input", () => {
  ParseExpression(expressionInput.value);
});
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(solution);
});
expressionInput.focus();
ParseExpression(expressionInput.value);

function ParseExpression(inputString) {
  tokens = cleanString(inputString);
  // expressionInput.value = tokens.split(/,\s+/);
  tokensPostFix = InfixToPostfix(tokens);
  solution = Number(EvaluatePostFix(tokensPostFix));

  // expressionDisplay.textContent = expressionDisplay.textContent.trim()
  //   ? ""
  //   : `${cleanString(inputString)} = `;
  resultDisplay.textContent =
    expressionInput.value.trim() === "" || isNaN(solution) ? "" : `${solution}`;
  if (solution === 0) {
    resultDisplay.textContent = "0";
  }
  // return solution;
}

function cleanString(input) {
  return input.replace(/([+\-*/^()])/g, " $1 ").trim();
}

function EvaluatePostFix(postFixArray) {
  const stack = [];
  for (let token of postFixArray) {
    if (!isNaN(token)) {
      stack.push(Number(token));
    } else {
      b = stack.pop();
      a = stack.pop();
      switch (token) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          stack.push(a / b);
          break;
        case "^":
          stack.push(a ** b);
          break;
        default:
          break;
      }
    }
  }
  return stack;
}
function GetPrecedence(op) {
  precedences = [
    {
      operator: "+",
      precedence: 1,
    },
    {
      operator: "-",
      precedence: 1,
    },
    {
      operator: "*",
      precedence: 2,
    },
    {
      operator: "/",
      precedence: 2,
    },
    {
      operator: "^",
      precedence: 3,
    },
  ];
  const match = precedences.find((entry) => entry.operator === op);
  return match ? match.precedence : null;
}

function InfixToPostfix(expression = "14 + 1") {
  const output = [];
  const stack = [];
  const tokens = expression.split(/\s+/);
  for (let token of tokens) {
    if (Number(token)) {
      output.push(token);
    } else if (token === "(") {
      stack.push(token);
    } else if (token === ")") {
      while (stack.length > 0 && stack[stack.length - 1] !== "(") {
        output.push(stack.pop());
      }
      stack.pop();
    } else {
      while (
        stack.length > 0 &&
        GetPrecedence(stack[stack.length - 1]) >= GetPrecedence(token)
      ) {
        output.push(stack.pop());
      }
      stack.push(token);
    }
  }
  while (stack.length > 0) {
    output.push(stack.pop());
  }
  return output;
}
