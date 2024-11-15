"use client";
import { Select, MenuItem } from "@mui/material";
import { useRef, useState } from "react";
import React from "react";
export default function SelectTemplate<T>({
  mapIn,
  select,
  buttonText,
}: {
  mapIn: {key:T,value:string}[]
  select: (output: T) => void;
  buttonText: string;
}) {
  const userRef = useRef("");

  const [chose, setChose] = useState<T | null>(null);
  return (
    <div className=" rounded-lg ">
      <Select
        variant="standard"
        name="location"
        id="location"
        className="h-[2em] w-[200px]"
      >
        {mapIn.map((choice: {key:T,value:string},i) => {
          return (
            <MenuItem key={i}
              value={choice.value}
              onClick={() => {
                setChose(choice.key);
              }}
            >
              {choice.value}
            </MenuItem>
          );
        })}
      </Select>
      <button
        className="bg-white font-bold p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
        style={{
          color: "#961A1D",
        }}
        onClick={async () => {
          console.log(userRef);
          if (chose) {
            console.log("ffffffffffffffffffffffffffff");
            try {
              console.log("ffffffffffffffffffffffffffff");
              select(chose);
            } catch (error) {
              console.log(error);
            }
          } else {
            alert("Please type in all the details!");
          }
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}
