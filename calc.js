let dec = false;
let n = 1;
function add(array) {
  let sum = 0;
  for (const number of array) {
    sum += number;
  }
  return sum;
}

function subtract(array) {
  let max = array[0];
  for (let i = 1; i < array.length; i++) {
    max -= array[i];
  }
  return max;
}

function multiply(array) {
  let product = 1;
  for (const number of array) {
    product *= Number(number);
  }
  return product;
}

function divide(array) {
  let num = array[0];
  for (let i = 1; i < array.length; i++) {
    num /= array[i];
  }
  return num;
}

function clear() {
  output.textContent = "";
  expression = [];
}

function evaluate(expression) {
  for (const value of expression) {
    switch (value) {
      case "*":
        expression.splice(
          expression.indexOf(value) - 1,
          3,
          multiply([
            expression[expression.indexOf(value) - 1],
            expression[expression.indexOf(value) + 1],
          ])
        );
        break;
      case "/":
        expression.splice(
          expression.indexOf(value) - 1,
          3,
          divide([
            expression[expression.indexOf(value) - 1],
            expression[expression.indexOf(value) + 1],
          ])
        );
        break;
      default:
        console.log(value);
        break;
    }
  }

  for (const value of expression) {
    switch (value) {
      case "+":
        expression.splice(
          expression.indexOf(value) - 1,
          3,
          add([
            expression[expression.indexOf(value) - 1],
            expression[expression.indexOf(value) + 1],
          ])
        );
        break;
      case "-":
        expression.splice(
          expression.indexOf(value) - 1,
          3,
          subtract([
            expression[expression.indexOf(value) - 1],
            expression[expression.indexOf(value) + 1],
          ])
        );
        break;
      default:
        break;
    }
  }
  if (expression.length !== 1) return evaluate(expression);
  else return expression[0];
}

let expression = [];
const output = document.getElementById("output");
const buttons = document.querySelectorAll(".button");
buttons.forEach((button) =>
  button.addEventListener("click", (e) => {
    let currentNumber;
    if (e.target.id === "c" || e.target.id === "") {
      clear();
      return;
    } else if (
      isNaN(Number(e.target.id)) &&
      (expression[expression.length - 1] === "+" ||
        expression[expression.length - 1] === "-" ||
        expression[expression.length - 1] === "*" ||
        expression[expression.length - 1] === "/") &&
      (e.target.id === "+" ||
        e.target.id === "-" ||
        e.target.id === "*" ||
        e.target.id === "/")
    )
      return;
    else if (
      isNaN(Number(e.target.id)) &&
      expression[expression.length - 1] === undefined
    )
      return;
    else if (e.target.id === "=") {
      if (isNaN(expression[expression.length - 1])) return;
      let ans = String(evaluate(expression));
      if (ans.length > 13) ans = Math.round(Number(ans).toExponential());
      else ans = Number(ans);
      output.textContent = ans;
      console.log(expression);
      return;
    } else if (
      !isNaN(Number(e.target.id)) &&
      typeof expression[expression.length - 1] === "number"
    ) {
      expression[expression.length - 1] = (dec === false)
        ? expression[expression.length - 1] * 10 + Number(e.target.id)
        : (expression[expression.length - 1] * 10**n + Number(e.target.id)) / 10**n;
      output.textContent +=
        output.textContent.length > 13 ? "" : String(e.target.id);
      console.log(expression);
      if (dec === true) n++;
      return;
    } else if (e.target.id === "." && dec === false) {
      dec = true;
      output.textContent += ".";
      return;
    } else
      currentNumber = !isNaN(Number(e.target.id))
        ? Number(e.target.id)
        : e.target.id;
    dec = false;
    n = 1;
    console.log(typeof Number(e.target.id) === "number");
    output.textContent +=
      output.textContent.length > 13 ? "" : String(e.target.id);
    expression.push(currentNumber);
    console.log(expression);
  })
);
