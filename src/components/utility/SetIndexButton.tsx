"use client";

import React from "react";
import FinishButton from "./FinishButton";

export default function SetIndexButton<T>({
  array,
  index,
  setIndex,
  isCycle,
  beforeText,
  middleText,
  nextText,
}: {
  array: ReadonlyArray<T>;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  isCycle?: boolean;
  beforeText?: string;
  nextText?: string;
  middleText?: string;
}) {
  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      {isCycle && index == 0 ? (
        <FinishButton
          text={`ไปหน้าสุดท้าย ${beforeText}`}
          onClick={() => setIndex(array.length - 1)}
        />
      ) : null}
      {index > 0 ? (
        <FinishButton
          text={`ก่อนหน้า ${beforeText}`}
          onClick={() => setIndex((previous) => previous - 1)}
        />
      ) : null}
      {middleText}
      {index < array.length - 1 ? (
        <FinishButton
          text={`ถัดไป ${nextText}`}
          onClick={() => setIndex((previous) => previous + 1)}
        />
      ) : null}
      {isCycle && index == array.length - 1 ? (
        <FinishButton
          text={`กลับไปเริ่มต้น ${nextText}`}
          onClick={() => setIndex(0)}
        />
      ) : null}
    </div>
  );
}
