"use client";

import { MenuItem, Select } from "@mui/material";
import { Mode, ShowImageAndDescriptions } from "../../interface";
import AllInOneLock from "./AllInOneLock";
import React from "react";
import FinishButton from "./FinishButton";
import Image from "next/image";
import SetIndexButton from "./SetIndexButton";

export default function ImageAndDescriptions({
  imageAndDescriptionsContainers,
  token,
  mode,
  gender,
}: {
  imageAndDescriptionsContainers: ShowImageAndDescriptions[];
  token: string;
  mode: Mode;
  gender: "Male" | "Female";
}) {
  if (imageAndDescriptionsContainers.length == 0) {
    return null;
  }
  const [isSelect, setIsSelect] = React.useState(true);
  const [{ children, name }, setImageAndDescriptionsContainer] =
    React.useState<ShowImageAndDescriptions>({
      name: "",
      children: [],
      types: "normal",
      _id: null,
      baanId: null,
    });
  const [index, setIndex] = React.useState(0);
  const sorted = children.sort((a, b) => a.order - b.order);
  const imageUrl= sorted[index].imageUrl
  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      <AllInOneLock token={token} mode={mode}>
        {isSelect ? (
          <Select
            variant="standard"
            name="location"
            id="location"
            className="h-[2em] w-[200px]"
            style={{
              color: "white",
            }}
            value={name}
            renderValue={() => name}
          >
            {imageAndDescriptionsContainers
              .filter((v) => {
                if (v.children.length == 0) {
                  return false;
                }
                if (mode == "pee") {
                  return true;
                }
                switch (v.types) {
                  case "boy":
                    return gender == "Male";
                  case "girl":
                    return gender == "Female";
                  case "normal":
                    return true;
                }
              })
              .map((v, i) => (
                <MenuItem
                  key={i}
                  onClick={() => setImageAndDescriptionsContainer(v)}
                >
                  {v.name}
                </MenuItem>
              ))}
          </Select>
        ) : (
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
            <SetIndexButton setIndex={setIndex} index={index} array={sorted} />
          </AllInOneLock>
        )}
        <FinishButton
          text={isSelect ? "โชว์คำไบ้" : "เลือกคำไบ้"}
          onClick={() =>
            setIsSelect((previous) => {
              setIndex(0);
              return !previous;
            })
          }
        />
      </AllInOneLock>{" "}
    </div>
  );
}
