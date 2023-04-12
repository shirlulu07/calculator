import { createContext, useCallback, useEffect, useState } from "react";
import ButtonStyle from "./component/ButtonStyle";

export const ButtonContext = createContext<any>(null);

export default function App() {
  const [value, setValue] = useState("0");
  const [prevValue, setPrevValue] = useState("");
  const [operator, setOperator] = useState("");
  const [display, setDisplay] = useState("0");

  const handleButtonClick = useCallback(
    (buttonValue: string) => {
      const utility = parseInt(buttonValue, 10);
      if (!isNaN(utility)) {
        number(buttonValue);
      } else {
        switch (buttonValue) {
          case "C":
            clear();
            break;

          case "+-":
            invertSign();
            break;

          case ".":
            PointerEvent(buttonValue);
            break;
          case "%":
            decimal();
            break;

          case "=":
            handleEqual();
            break;

          default:
            handleOperator(buttonValue);
            break;
        }
      }
    },
    [value, prevValue, operator]
  );

  function number(buttonValue: string) {
    if (prevValue !== "" && operator === "") {
      setValue(buttonValue);
      setPrevValue("");
    } else {
      setValue(value === "0" ? buttonValue : value + buttonValue);
    }
  }

  function clear() {
    setValue("0");
    setPrevValue("");
    setOperator("");
  }

  function invertSign() {
    const invert_sign = -1;
    if (prevValue !== "" && value === "") {
      setPrevValue((invert_sign * parseFloat(prevValue)).toString());
    } else {
      setValue((invert_sign * parseFloat(value)).toString());
    }
  }

  function PointerEvent(buttonValue: string) {
    if (value.includes(".")) return;
    if (prevValue !== "" && value === "") {
      setValue(prevValue + buttonValue);
      setPrevValue("");
    } else {
      setValue(value + buttonValue);
    }
  }

  function decimal() {
    const decimal_converter = 0.01;
    if (prevValue !== "") {
      setPrevValue((parseFloat(prevValue) * decimal_converter).toString());
    } else {
      setValue((parseFloat(value) * decimal_converter).toString());
    }
  }

  function handleOperator(buttonValue: string) {
    if (prevValue !== "" && operator !== "" && value === " ") return;
    if (value === "0" && prevValue === "") return;
    setOperator(buttonValue);
    if (prevValue !== "" && value === "") null;
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
    switch (operator) {
      case "+":
        equal = numPrevValue + numValue;
        break;
      case "-":
        equal = numPrevValue - numValue;
        break;
      case "x":
        equal = numPrevValue * numValue;
        break;
      case "/":
        equal = numPrevValue / numValue;
        break;
      default:
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
    <div className="flex items-center justify-center h-screen w-screen bg-yellow-300">
      <div className="flex flex-col justify-center items-center border-2 border-black bg-gray-800 rounded-md gap-1 p-1">
        <input
          type="text"
          value={display ? display : prevValue}
          disabled
          className="bg-gray-700 h-14 rounded-md w-52 text-right text-white text-4xl"
        />

        <div className="grid grid-cols-4 grid-rows-5 gap-1 w-52">
          <ButtonContext.Provider value={{ handleClick: handleButtonClick }}>
            {[
              ["C", "+-", "%", "/"],
              ["7", "8", "9", "x"],
              ["4", "5", "6", "-"],
              ["1", "2", "3", "+"],
              ["0", ".", "="],
            ].map((row, rowindex) =>
              row.map((button, buttonindex) => (
                <ButtonStyle
                  key={`button-${rowindex}-${buttonindex}`}
                  text={button}
                />
              ))
            )}
          </ButtonContext.Provider>
        </div>
      </div>
    </div>
  );
}
