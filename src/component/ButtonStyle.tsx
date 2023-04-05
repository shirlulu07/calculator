interface IbuttonProps {
  text: string;
  onClick?: () => void;
}

function ButtonStyle({ text, onClick }: IbuttonProps) {
  return (
    <button
      className={`${
        text === "="
          ? "col-span-2 bg-red-700 hover:bg-red-800 text-white h-12 rounded-lg"
          : "bg-violet-800 hover:bg-violet-900 text-white h-12 col-span-1 rounded-lg"
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default ButtonStyle;
