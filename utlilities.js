export function cleanString(input) {
  return input.replace(/([+\-*/^()])/g, " $1 ").trim();
}

export function InfixToPostfix(expression) {
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

export function EvaluatePostFix(postFixArray) {
  const stack = [];
  for (let token of postFixArray) {
    if (!isNaN(token)) {
      stack.push(Number(token));
    } else {
      const b = stack.pop();
      const a = stack.pop();
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
