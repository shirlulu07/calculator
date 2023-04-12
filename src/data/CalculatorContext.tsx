import { createContext } from "react";

interface CalculatorState {
  value: string;
  prevValue: string;
  operator: string;
  display: string;
}

const initialState: CalculatorState = {
  value: "0",
  prevValue: "",
  operator: "",
  display: "0",
};

const CalculatorContext = createContext(initialState);

export default CalculatorContext;
