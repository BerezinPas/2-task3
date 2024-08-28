import { useState } from "react";
import styles from "./app.module.scss";

const numbers = Array(10)
  .fill(1)
  .map((el, i) => i);

function getResult(op1, op2, operator = null) {
  switch (operator) {
    case "+":
      return Number(op1) + Number(op2);
    case "-":
      return Number(op1) - Number(op2);
    default:
      return null;
  }
}

function App() {
  const [operand1, setOperand1] = useState();
  const [operand2, setOperand2] = useState();
  const [operator, setOperator] = useState();
  const [showResult, setShowResult] = useState(false);

  const btnNumbHandler = (num) => {
    if (showResult) {
      setShowResult(false);
      setOperand1(num);
      setOperand2("");
      setOperator("");
    } else if (operator === "-" && !operand1 && num !== 0) {
      setOperand1("-" + num);
      setOperator("");
    } else if (operator) {
      setOperand2((prev) => (prev ? prev.toString() + num : num));
    } else {
      setOperand1((prev) => (prev ? prev.toString() + num : num));
    }
  };

  const result = getResult(operand1, operand2, operator);

  return (
    <div className={styles.calculator}>
      {!showResult && (
        <div className={styles.result}>
          {/* {(operand1 || "") + (operator || "") + (operand2 || "")} */}
          {(operand1 ? operand1 : "") +
            (operator ? operator : "") +
            (operand2 ? operand2 : "")}
        </div>
      )}
      {showResult && (
        <div className={styles.result + " " + styles.colorWhite}>{result}</div>
      )}

      <div className={styles.btns}>
        <div className={styles.numbers}>
          {numbers.map((num) => {
            return (
              <button
                onClick={() => btnNumbHandler(num)}
                key={num}
                className={
                  num === 0
                    ? styles.btnsItem + " " + styles["btnsItem-big"]
                    : styles.btnsItem
                }
              >
                {num}
              </button>
            );
          })}
        </div>

        <div className={styles.tools}>
          <button
            onClick={() => {
              setOperand1("");
              setOperand2("");
              setOperator("");
            }}
            className={styles.btnsItem}
          >
            C
          </button>
          <button
            onClick={() => {
              if (!operand1) {
                return;
              }
              if (showResult) {
                setShowResult(false);
                setOperand1(result);
                setOperand2("");
              } else if (operand2) {
                setOperand1(result);
                setOperand2("");
              }
              setOperator("+");
            }}
            className={styles.btnsItem}
          >
            +
          </button>
          <button
            onClick={() => {
              if (showResult) {
                setShowResult(false);
                setOperand1(result);
                setOperand2("");
              } else if (operand2) {
                setOperand1(result);
                setOperand2("");
              }
              setOperator("-");
            }}
            className={styles.btnsItem}
          >
            -
          </button>
          <button
            onClick={() => {
              if (operand2) {
                setShowResult(true);
              }
            }}
            className={styles.btnsItem}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
