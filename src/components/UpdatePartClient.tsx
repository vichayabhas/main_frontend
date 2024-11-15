"use client";
import React from "react";
import { useState } from "react";
import { AllPlaceData, Id, InterPlace } from "../../interface";
import { useSession } from "next-auth/react";
import { MenuItem, Select } from "@mui/material";
import BackToHome from "./BackToHome";
import updatePart from "@/libs/admin/updatePart";
export default function UpdatePartClient({
  place,
  partId,
  allPlaceData,
}: {
  place: InterPlace | null;
  partId: Id;
  allPlaceData: AllPlaceData;
}) {
  // dispatch = useDispatch<AppDispatch>();
  //const update = useAppSelector((state) => state.bookSlice.bookItem);
  const { data: session } = useSession();

  const [nP, setNP] = useState<InterPlace | null>(place);

  const [nB, setNB] = useState<string | null>(
    allPlaceData.allBuildings.get(place?.buildingId as Id)
      ?.name as string | null
  );

  const nC = nB ? (allPlaceData.allPlace.get(nB) as InterPlace[]) : [];
  const buildings: string[] = [];
  allPlaceData.allPlace.forEach((e, input: string) => {
    buildings.push(input);
  });
  if (!session) {
    return <BackToHome />;
  }
  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      <div className="text-4xl font-medium">Update Part</div>

      <form className="w-[30%] items-center bg-slate-600 p-10 rounded-3xl shadow-[25px_25px_40px_-10px_rgba(0,0,0,0.7)]">
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">
            เลือกตึกที่ใช้เป็นห้องฝ่าย
          </label>
          <Select
            variant="standard"
            name="location"
            id="location"
            className="h-[2em] w-[200px]"
            defaultValue={nB}
          >
            {buildings.map((choice: string,i) => {
              return (
                <MenuItem value={choice} onClick={() => setNB(choice)} key={i}>
                  {choice}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">
            เลือกชั้นและห้องที่ใช้เป็นห้องฝ่าย
          </label>
          <Select
            variant="standard"
            name="location"
            id="location"
            className="h-[2em] w-[200px]"
            defaultValue={nP}
          >
            {nC?.map((choice: InterPlace,i) => {
              return (
                <MenuItem key={i}
                  value={`${choice.floor} ${choice.room}`}
                  onClick={() => setNP(choice)}
                >
                  {choice.floor} {choice.room}
                </MenuItem>
              );
            })}
          </Select>
        </div>

        <div className="flex flex-row justify-end">
          <button
            className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
            onClick={() => {
              if (nP) {
                try {
                  updatePart(partId, nP._id, session.user.token);
                } catch (error) {
                  console.log(error);
                }
              } else {
                alert("Please type in all the details!");
              }
            }}
          >
            update all
          </button>
        </div>
      </form>
    </div>
  );
}
