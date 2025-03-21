"use client";

import staffRegisterCamp from "@/libs/camp/staffRegister";
import SelectTemplate from "../../utility/SelectTemplate";
import { BasicUser, Id, MyMap, Size } from "../../../../interface";
import { Checkbox } from "@mui/material";
import SelectSize from "../../utility/SelectSize";
import { updateBottle } from "@/libs/user/updateBottle";
import updateSize from "@/libs/user/updateSize";
import updateSleep from "@/libs/user/updateSleep";
import React from "react";
import { setBoolean } from "../../utility/setup";
export default function LocationDateReserve({
  partMap,
  token,
  user,
  defaultSelect,
}: {
  partMap: MyMap[];
  token: string;
  user: BasicUser;
  defaultSelect?: MyMap;
}) {
  const [shirtSize, setShirtSize] = React.useState<Size>(user.shirtSize);
  const [haveBottle, setHaveBottle] = React.useState<boolean>(user.haveBottle);
  const [likeToSleepAtCamp, setLikeToSleepAtCamp] = React.useState<boolean>(
    user.likeToSleepAtCamp
  );
  return (
    <>
      <div className="flex flex-row items-center my-5">
        <label className="w-2/5 text-2xl text-slate-200">เลือกขนาดเสื้อ</label>

        <SelectSize select={setShirtSize} def={user.shirtSize} />
      </div>

      <div className="flex flex-row items-center my-5">
        <label className="w-2/5 text-2xl text-slate-200">
          มีกระติกน้ำหรือไม่
        </label>
        <Checkbox
          onChange={setBoolean(setHaveBottle)}
          checked={user.haveBottle}
        />
      </div>

      <div className="flex flex-row justify-end"></div>
      <div className="flex flex-row items-center my-5">
        <label className="w-2/5 text-2xl text-slate-200">
          ประสงค์นอนในค่ายหรือไม่
        </label>
        <Checkbox
          onChange={setBoolean(setLikeToSleepAtCamp)}
          checked={user.likeToSleepAtCamp}
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
        defaultSelect={defaultSelect}
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
