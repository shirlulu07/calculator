import { useState } from "react";
import ButtonStyle from "../component/ButtonStyle";

const Calculator = () => {
  const [value, setValue] = useState("");

  const handleButtonClick = (buttonValue: number | string) => {
    switch (buttonValue) {
      case "C":
        setValue("");
        break;
      case "+-":
        setValue((-1 * Number(value)).toString());
        break;
      default:
        setValue(value + buttonValue);
    }
  };
  const buttons = [
    { text: "C" },
    { text: "+-" },
    { text: "%" },
    { text: "/" },
    { text: "7" },
    { text: "8" },
    { text: "9" },
    { text: "x" },
    { text: "4" },
    { text: "5" },
    { text: "6" },
    { text: "-" },
    { text: "1" },
    { text: "2" },
    { text: "3" },
    { text: "+" },
    { text: "0" },
    { text: "." },
    { text: "=" },
  ];
  return (
    <div className="flex flex-col justify-center items-center border-2 border-black bg-gray-800 rounded-md gap-1 p-1">
      <input
        type="text"
        value={value}
        placeholder="0"
        disabled
        className="bg-gray-700 h-14 rounded-md w-52 text-right px-0.5 text-white text-4xl"
      ></input>
      <div className="grid grid-cols-4 grid-rows-5 gap-1 w-52">
        {buttons.map((button, index) => (
          <ButtonStyle
            key={index}
            text={button.text}
            onClick={() => handleButtonClick(button.text)}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
