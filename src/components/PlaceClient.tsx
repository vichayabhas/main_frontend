"use client";

import { useRouter } from "next/navigation";
import { TextField } from "@mui/material";
import { useState } from "react";
import { InterPlace } from "../../interface";
import createPlace from "@/libs/randomthing/createPlace";
import { stringToId } from "./setup";
import React from "react";
export default function PlaceClient({
  places,
  buildingId,
  token,
}: {
  places: InterPlace[];
  token: string;
  buildingId: string;
}) {
  const [floor, setFloor] = useState<string | null>(null);
  const [room, setRoom] = useState<string | null>(null);
  const router = useRouter();
  //alert (places.length)
  return (
    <>
      {places.map((place,i) => (
        <div key={i}
          className="flex flex-row h-auto"
          onClick={() => {
            router.push(`/place/${place.buildingId}/${place._id}`);
          }}
        >
          <div className="w-1/5 h-auto relative rounded-t-lg"></div>

          <div className="w-3/5 h-auto p-[10px]">
            <div className="text-left pl-5">
              <div className="text-3xl">
                {place.floor} {place.room}
              </div>
              <div>
                <table>
                  <tr>
                    <td>กิจกรรม</td>
                    <td>ห้องเรียน</td>
                    <td>ห้องนอน</td>
                  </tr>
                  <tr>
                    <td>{place.actCap}</td>
                    <td>{place.studyCap}</td>
                    <td>{place.sleepCap} </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className="w-1/5 h-auto bg-slate-800 rounded-xl hover:bg-slate-600"></div>
        </div>
      ))}
      <div className="flex flex-row items-center">
        <label className="w-2/5 text-2xl text-slate-200">เพิ่มชั้น</label>
        <TextField
          name="Name"
          id="Name"
          className="w-3/5 bg-slate-100 rounded-2xl shadow-inner"
          onChange={(e) => setFloor(e.target.value)}
        />
      </div>
      <div className="flex flex-row items-center">
        <label className="w-2/5 text-2xl text-slate-200">เพิ่มห้อง</label>
        <TextField
          name="Name"
          id="Name"
          className="w-3/5 bg-slate-100 rounded-2xl shadow-inner"
          onChange={(e) => setRoom(e.target.value)}
        />
      </div>
      <button
        className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
        onClick={() => {
          if (floor && room) {
            try {
              createPlace(
                floor,
                room,
                stringToId(buildingId),
                token
              );
            } catch (error) {
              console.log(error);
            }
          } else {
            alert("Please type in all the detavdtrjbyfugjunils!");
          }
        }}
      >
        สร้างห้อง
      </button>
    </>
  );
}
