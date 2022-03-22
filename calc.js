function add(array){
  let sum = 0;
  for (const number of array){sum += Number(number)}
  return sum;
}

function subtract(array){
  let max = array[0];
  for (let i = 1; i < array.length; i++){
    max -= array[i];
  }
  return max;
}

function multiply(array){
  let product = 1;
  for (const number of array){product *= Number(number)}
  return product;}

function divide(array){
  let num = array[0];
  for (let i = 1; i < array.length; i++){
    num /= array[i];
  }
  return  num;
}

function operate(operation, array){
  switch(operation){
    case "+":
      return add(array);
    case "-":
      return subtract(array);
    case "*":
      return multiply(array);
    case "/":
      return divide(array);
    default:
      console.log(array, operation);
      return "ERROR";
  }
}


