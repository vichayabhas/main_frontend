import React from "react";
export default function FinishButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      className="bg-white font-bold mx-3 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
      style={{
        color: "#961A1D",
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
