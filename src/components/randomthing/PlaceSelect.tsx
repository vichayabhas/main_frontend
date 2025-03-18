"use client";

import { MenuItem, Select } from "@mui/material";
import React from "react";
import { InterPlace, AllPlaceData, Id } from "../../../interface";
export default function PlaceSelect({
  place,
  onClick,
  buildingText,
  placeText,
  allPlaceData, //const allPlaceData=await getAllPlaceData()
}: {
  place: InterPlace | null;
  onClick: (outPut: InterPlace | null) => void;
  buildingText: string;
  placeText: string;
  allPlaceData: AllPlaceData; //const allPlaceData=await getAllPlaceData()
}) {
  // dispatch = useDispatch<AppDispatch>();
  //const update = useAppSelector((state) => state.bookSlice.bookItem);

  const [nB, setNB] = React.useState<string | null>(
    allPlaceData.allBuildings.get(place?.buildingId as Id) as string | null
  );

  const nC = nB ? (allPlaceData.allPlace.get(nB) as InterPlace[]) : [];
  const buildings: string[] = [];
  allPlaceData.allPlace.forEach((e, input: string) => {
    buildings.push(input);
  });
  return (
    <>
      <div className="flex flex-row items-center my-5">
        <label className="w-2/5 text-2xl text-white">{buildingText}</label>
        <Select
          value={nB}
          variant="standard"
          name="location"
          id="location"
          className="h-[2em] w-[200px] text-white"
          sx={{
            color: "white",
          }}
        >
          {buildings.map((choice: string, i) => {
            return (
              <MenuItem value={choice} onClick={() => setNB(choice)} key={i}>
                {choice}
              </MenuItem>
            );
          })}
        </Select>
      </div>
      <div className="flex flex-row items-center my-5">
        <label className="w-2/5 text-2xl text-white">{placeText}</label>
        <Select
          value={`${place?.floor} ${place?.room}`}
          variant="standard"
          name="location"
          id="location"
          className="h-[2em] w-[200px] text-white"
          sx={{
            color: "white",
          }}
        >
          {nC?.map((choice: InterPlace, i) => {
            return (
              <MenuItem
                key={i}
                value={`${choice.floor} ${choice.room}`}
                onClick={() => {
                  onClick(choice);
                }}
              >
                {choice.floor} {choice.room}
              </MenuItem>
            );
          })}
          <MenuItem
            value={"-"}
            onClick={() => {
              onClick(null);
            }}
          >
            -
          </MenuItem>
        </Select>
      </div>
    </>
  );
}
