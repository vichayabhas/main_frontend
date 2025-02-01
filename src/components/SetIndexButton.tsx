"use client";

import React from "react";
import FinishButton from "./FinishButton";

export default function SetIndexButton<T>({
  array,
  index,
  setIndex,
}: {
  array: T[];
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div  className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      {index > 0 ? (
        <FinishButton
          text="ก่อนหน้า"
          onClick={() => setIndex((previous) => previous - 1)}
        />
      ) : null}
      {index < array.length - 1 ? (
        <FinishButton
          text="ถัดไป"
          onClick={() => setIndex((previous) => previous + 1)}
        />
      ) : null}
    </div>
  );
}
