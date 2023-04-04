import { useCallback, useEffect, useState, createContext } from "react";
import ButtonStyle from "../component/ButtonStyle";

const buttonContext = createContext("button");

const Calculator = () => {
  const [value, setValue] = useState("0");
  const [prevValue, setPrevValue] = useState("");
  const [operator, setOperator] = useState("");
  const [display, setDisplay] = useState("0");

  const handleButtonClick = useCallback(
    (buttonValue: string) => {
      const utility = parseInt(buttonValue, 10);
      if (!isNaN(utility)) {
        value !== "0" ? setValue(value + buttonValue) : setValue(buttonValue);
      } else {
        if (buttonValue === "C") {
          setValue("0");
          setPrevValue("");
          setOperator("");
        } else if (buttonValue === "+-") {
          setValue((-1 * parseInt(value)).toString());
        } else if (buttonValue === "%") {
          setValue((parseInt(value) / 100).toString());
        } else if (buttonValue === ".") {
          !value.includes(".") ? setValue(value + buttonValue) : null;
        } else if (buttonValue === "=") {
          handleEqual();
        } else {
          handleOperator(buttonValue);
        }
      }
    },
    [value, prevValue, operator]
  );

  function handleOperator(buttonValue: string) {
    setOperator(buttonValue);

    if (prevValue !== "") {
      handleEqual();
    } else {
      setPrevValue(value);
      setValue(" ");
    }
  }

  function handleEqual() {
    let numPrevValue = parseFloat(prevValue);
    let numValue = parseFloat(value);
    let equal = 0;
    if (operator === "+") {
      equal = numPrevValue + numValue;
    } else if (operator === "-") {
      equal = numPrevValue - numValue;
    } else if (operator === "x") {
      equal = numPrevValue * numValue;
    } else if (operator === "/") {
      equal = numPrevValue / numValue;
    } else if (operator === "") {
      return;
    }

    setPrevValue(equal.toString());
    setOperator("");
    setValue("");
  }

  useEffect(() => {
    setDisplay(value);
  }, [value]);

  return (
    <div className="flex flex-col justify-center items-center border-2 border-black bg-gray-800 rounded-md gap-1 p-1">
      <input
        type="text"
        value={display ? display : prevValue}
        disabled
        className="bg-gray-700 h-14 rounded-md w-52 text-right text-white text-4xl"
      />

      <div className="grid grid-cols-4 grid-rows-5 gap-1 w-52">
        {[
          ["C", "+-", "%", "/"],
          ["7", "8", "9", "x"],
          ["4", "5", "6", "-"],
          ["1", "2", "3", "+"],
          ["0", ".", "="],
        ].map((row, rowindex) =>
          row.map((button, buttonindex) => (
            <buttonContext.Provider value={button}>
              <ButtonStyle
                key={`button-${rowindex}-${buttonindex}`}
                text={button}
                onClick={() => handleButtonClick(button)}
              />
            </buttonContext.Provider>
          ))
        )}
      </div>
    </div>
  );
};

export default Calculator;
