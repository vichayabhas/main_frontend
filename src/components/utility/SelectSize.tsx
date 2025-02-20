"use client";
import { Select, MenuItem } from "@mui/material";
import React from "react";
import { Size } from "../../../interface";
export default function SelectSize({
  select,
  def,
}: {
  select: (size: Size) => void;
  def: Size | null;
}) {
  const choices: Size[] = ["S", "M", "L", "XL", "XXL", "3XL"];

  //const [chose, setChose] = React.useState<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL' | null>(null);
  return (
    <div className=" rounded-lg ">
      <Select
        variant="standard"
        name="location"
        id="location"
        className="h-[2em] w-[200px]"
        defaultValue={def}
        style={{
          color: "white",
        }}
      >
        {choices.map((choice: Size, i) => {
          return (
            <MenuItem value={choice} onClick={() => select(choice)} key={i}>
              {choice}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
}
