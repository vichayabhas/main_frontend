"use client";

import { AllPlaceData, Id, MyMap } from "../../interface";
import { useRef, useState } from "react";
import { MenuItem, Select, TextField } from "@mui/material";
import PlaceSelect from "./PlaceSelect";
import addLostAndFound from "@/libs/randomthing/addLostAndFound";
import { getId } from "./setup";
import React from "react";
export default function LostAndFoundClient({
  mapIn,
  token,
  allPlaceData,
}: {
  mapIn: MyMap[];
  token: string;
  allPlaceData: AllPlaceData;
}) {
  const userRef = useRef("");

  const [chose, setChose] = useState<Id | null>(null);
  const [placeId, setPlaceId] = useState<Id | null>(null);
  const [detail, setDetail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [type, setType] = useState<"lost" | "found" | null>(null);
  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      <div
        className="text-4xl font-bold"
        style={{
          color: "#961A1D",
        }}
      >
        Lost and Found{" "}
      </div>
      <form
        className="w-[70%] items-center p-10 rounded-3xl"
        style={{
          backgroundColor: "#961A1D",
        }}
      >
        <div className=" rounded-lg ">
          <label className="w-2/5 text-2xl text-white">lost or found</label>
          <Select
            variant="standard"
            name="location"
            id="location"
            className="h-[2em] w-[200px] ml-20 text-white"
            sx={{
              color: "white",
            }}
          >
            <MenuItem
              onClick={() => {
                setType("lost");
              }}
              value="ค้นหาของหาย"
            >
              ค้นหาของหาย
            </MenuItem>
            <MenuItem
              onClick={() => {
                setType("found");
              }}
              value="เจอของไม่มีเจ้าของ"
            >
              เจอของไม่มีเจ้าของ
            </MenuItem>
          </Select>
        </div>

        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">สิ่งของอะไร</label>
          <TextField
            name="Name"
            id="Name"
            className="w-3/5 bg-white rounded-2xl shadow-inner"
            sx={{
              backgroundColor: "#f5f5f5",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: " 1rem",
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "#5479FF",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#5479FF",
                },
              },
            }}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">รายละเอียด</label>
          <TextField
            name="Name"
            id="Name"
            className="w-3/5 bg-white rounded-2xl shadow-inner"
            sx={{
              backgroundColor: "#f5f5f5",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: " 1rem",
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "#5479FF",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#5479FF",
                },
              },
            }}
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>
        <PlaceSelect
          place={null}
          onClick={(place) => {
            setPlaceId(getId(place));
          }}
          buildingText={"ตึกที่พบเจอหรือคิดว่าทำหายถ้ารู้"}
          placeText={"ชั้นและห้องที่พบเจอหรือคิดว่าทำหายถ้ารู้"}
          allPlaceData={allPlaceData}
        />
        <div className=" rounded-lg ">
          <Select
            variant="standard"
            name="location"
            id="location"
            className="h-[2em] w-[200px] text-white"
            sx={{
              color: "white",
            }}
          >
            {mapIn.map((choice: MyMap, i) => {
              return (
                <MenuItem
                  key={i}
                  value={choice.value}
                  onClick={() => {
                    setChose(choice.key);
                  }}
                >
                  {choice.value}
                </MenuItem>
              );
            })}
          </Select>
          <button
            className="bg-white p-3 rounded-lg font-medium shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
            style={{
              color: "#961A1D",
            }}
            onClick={async () => {
              console.log(userRef);

              if (type && detail && name)
                addLostAndFound(
                  {
                    type,
                    campId: chose,
                    name,
                    detail,
                    placeId,
                  },
                  token
                );
            }}
          >
            ประกาศ lost & found
          </button>
        </div>
      </form>
    </div>
  );
}
