"use client";

import { useState } from "react";
import staffRegisterCamp from "@/libs/camp/staffRegister";
import SelectTemplate from "./SelectTemplate";
import { Id, InterUser, MyMap, Size } from "../../interface";
import { Checkbox } from "@mui/material";
import SelectSize from "./SelectSize";
import { updateBottle } from "@/libs/user/updateBottle";
import updateSize from "@/libs/user/updateSize";
import updateSleep from "@/libs/user/updateSleep";
import React from "react";
export default function LocationDateReserve({
  partMap,
  token,
  user,
}: {
  partMap: MyMap[];
  token: string;
  user: InterUser;
}) {
  const [shirtSize, setShertSize] = useState<Size>(user.shirtSize);
  const [haveBottle, setHaveBottle] = useState<boolean>(user.haveBottle);
  const [likeToSleepAtCamp, setLikeToSleepAtCamp] = useState<boolean>(
    user.likeToSleepAtCamp
  );
  return (
    <>
      <div className="flex flex-row items-center my-5">
        <label className="w-2/5 text-2xl text-slate-200">เลือกขนาดเสื้อ</label>

        <SelectSize select={setShertSize} def={user.shirtSize} />
      </div>

      <div className="flex flex-row items-center my-5">
        <label className="w-2/5 text-2xl text-slate-200">
          มีกระติกน้ำหรือไม่
        </label>
        <Checkbox
          onChange={(e, state) => {
            setHaveBottle(state);
          }}
          defaultChecked={user.haveBottle}
        />
      </div>

      <div className="flex flex-row justify-end"></div>
      <div className="flex flex-row items-center my-5">
        <label className="w-2/5 text-2xl text-slate-200">
          ประสงค์นอนในค่ายหรือไม่
        </label>
        <Checkbox
          onChange={(e, state) => {
            setLikeToSleepAtCamp(state);
          }}
          defaultChecked={user.likeToSleepAtCamp}
        />
      </div>
      <SelectTemplate
        mapIn={partMap}
        select={(partId: Id) => {
          staffRegisterCamp(partId, token);
          updateBottle(haveBottle, token);
          updateSleep(likeToSleepAtCamp, token);
          updateSize(shirtSize, token);
        }}
        buttonText="Register"
      />
    </>
  );
} /*<div className=" rounded-lg ">
            <Select variant="standard" name="location" id="location" onChange={(e)=>setPartName(e.target.value as string)}
            className="h-[2em] w-[200px]">
                {choices.map((choice:string)=>{
                    return(<MenuItem value={choice}>{choice}</MenuItem>)
                })}
            </Select>
            <button
            className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
            onClick={async () => {
              console.log(userRef);
              if (partName) {
                console.log("ffffffffffffffffffffffffffff");
                try {
                  console.log("ffffffffffffffffffffffffffff");
                  staffRegisterCamp(partMap.get(partName) as string,token)
                } catch (error) {
                  console.log(error);
                }
              } else {
                alert("Please type in all the details!");
              }
            }}
          >
            Register
          </button>





        </div>*/
