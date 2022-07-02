let runningTotal = 0;
let previousOperator = null;
let buffer = "0";
const screen = document.querySelector(".screen");

document
  .querySelector(".calc-buttons")
  .addEventListener("click", function (event) {
    buttonClick(event.target.innerHTML);
  });

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}
function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "*") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
  rerender();
}

function handleSymbol(value) {
  switch (value) {
    case "C":
      runningTotal = 0;
      previousOperator = null;
      buffer = "0";
      break;

    case "=":
      if (previousOperator == null) {
        return;
      } else {
        flushOperation(parseInt(buffer));
        previousOperator = null;
        buffer = "" + runningTotal;
        runningTotal = 0;
        break;
      }
    case "Del":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    default:
      handleMath(value);
      break;
  }
}

function handleMath(value) {
  if (buffer === "0") {
    // do nothing
    return;
  }

  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;

  buffer = "0";
}
function rerender() {
  screen.innerHTML = buffer;
}
