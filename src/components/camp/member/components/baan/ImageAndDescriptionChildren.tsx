"use client";
import AllInOneLock from "@/components/utility/AllInOneLock";
import React from "react";
import { InterImageAndDescription, Mode } from "../../../../../../interface";
import Image from "next/image";
import SetIndexButton from "@/components/utility/SetIndexButton";
import { copy } from "@/components/utility/setup";
export default function ImageAndDescriptionChildren({
  token,
  mode,
  data,
  index,
  setIndex,
}: {
  token: string;
  mode: Mode;
  data: readonly InterImageAndDescription[];
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const sorted = data.map(copy).sort((a, b) => a.order - b.order);
  const imageUrl = sorted[index].imageUrl;
  return (
    <AllInOneLock token={token} mode={mode}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          alt="invalid"
          width={180}
          height={37}
          priority
        />
      ) : null}
      {sorted[index].description}
      <SetIndexButton
        setIndex={setIndex}
        index={index}
        array={sorted}
        nextText=""
        beforeText=""
      />
    </AllInOneLock>
  );
}
