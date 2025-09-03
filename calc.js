import { cleanString, InfixToPostfix, EvaluatePostFix } from "/utlilities.js";

// Variables

const expressionInput = document.querySelector("#expression-input");
const resultDisplay = document.querySelector("#result-display");
const copyBtn = document.querySelector("#copy-btn");
let tokens = "";
let tokensPostFix = null;
let solution = "";

// Event Listeners

expressionInput.addEventListener("input", () => {
  ParseExpression(expressionInput.value);
});
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(solution);
});

function ParseExpression(inputString) {
  tokens = cleanString(inputString);
  tokensPostFix = InfixToPostfix(tokens);
  solution = Number(EvaluatePostFix(tokensPostFix));
  resultDisplay.textContent =
    expressionInput.value.trim() === "" || isNaN(solution) ? "" : `${solution}`;
  if (solution === 0) {
    resultDisplay.textContent = "0";
  }
}

// On Load
expressionInput.focus();
ParseExpression(expressionInput.value);
