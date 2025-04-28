"use client";

import { MenuItem, Select } from "@mui/material";
import { Id, Mode, ShowImageAndDescriptions } from "../../../../../interface";
import React from "react";
import AllInOneLock from "../../../utility/AllInOneLock";
import FinishButton from "../../../utility/FinishButton";
import ImageAndDescriptionChildren from "./ImageAndDescriptionChildren";
import { io } from "socket.io-client";
import { getBackendUrl, SocketReady } from "@/components/utility/setup";

const socket = io(getBackendUrl());
export default function ImageAndDescriptions({
  imageAndDescriptionsContainers: dataIn,
  token,
  mode,
  gender,
  baanId,
}: {
  imageAndDescriptionsContainers: ShowImageAndDescriptions[];
  token: string;
  mode: Mode;
  gender: "Male" | "Female";
  baanId: Id;
}) {
  if (dataIn.length == 0) {
    return null;
  }
  const [selectIndex, setSelectIndex] = React.useState<number | null>(null);
  const [index, setIndex] = React.useState(0);
  const [imageAndDescriptionContainers, setImageAndDescriptionContainers] =
    React.useState(dataIn);
  const name =
    selectIndex == null ? "" : imageAndDescriptionContainers[selectIndex].name;
  const updateSocket = new SocketReady<ShowImageAndDescriptions[]>(
    socket,
    "updateImageAndDescriptions"
  );
  const room = baanId.toString();
  React.useEffect(() => {
    updateSocket.listen(room, setImageAndDescriptionContainers);
    return () => updateSocket.disconnect();
  });
  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      <AllInOneLock token={token} mode={mode}>
        {selectIndex == null ? (
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
            {imageAndDescriptionContainers
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
                <MenuItem key={i} onClick={() => setSelectIndex(i)}>
                  {v.name}
                </MenuItem>
              ))}
          </Select>
        ) : (
          <ImageAndDescriptionChildren
            index={index}
            setIndex={setIndex}
            data={imageAndDescriptionContainers[selectIndex].children}
            mode={mode}
            token={token}
          />
        )}
        <FinishButton
          text={selectIndex == null ? "โชว์คำไบ้" : "เลือกคำไบ้"}
          onClick={() =>
            setSelectIndex(() => {
              setIndex(0);
              return null;
            })
          }
        />
      </AllInOneLock>
    </div>
  );
}
