"use client";
import React from "react";
import { useState } from "react";
import {
  AllPlaceData,
  InterBaanFront,
  InterCampFront,
  InterPlace,
} from "../../interface";
import { useSession } from "next-auth/react";
import { Checkbox, TextField } from "@mui/material";
import updateBaan from "@/libs/admin/updateBaan";
import BackToHome from "./BackToHome";
import PlaceSelect from "./PlaceSelect";
export default function UpdateBaanClient({
  baan,
  boy,
  girl,
  normal,
  camp,
  allPlaceData,
}: {
  baan: InterBaanFront;
  boy: InterPlace | null;
  girl: InterPlace | null;
  normal: InterPlace | null;
  camp: InterCampFront;
  allPlaceData: AllPlaceData;
}) {
  // dispatch = useDispatch<AppDispatch>();
  //const update = useAppSelector((state) => state.bookSlice.bookItem);
  const { data: session } = useSession();
  const [bP, setBP] = useState<InterPlace | null>(boy);
  const [gP, setGP] = useState<InterPlace | null>(girl);
  const [nP, setNP] = useState<InterPlace | null>(normal);
  const [name, setName] = useState<string>(baan.name);
  const [fullName, setFullName] = useState<string | null>(baan.fullName);
  const [link, setLink] = useState<string | null>(baan.link);
  const buildings: string[] = [];
  const [nongSendMessage, setNongSendMessage] = useState<boolean>(
    baan.nongSendMessage
  );
  allPlaceData.allPlace.forEach((e, input: string) => {
    buildings.push(input);
  });
  if (!session) {
    return <BackToHome />;
  }
  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      <div className="text-4xl font-medium">Update บ้าน </div>

      <form className="w-[30%] items-center bg-slate-600 p-10 rounded-3xl shadow-[25px_25px_40px_-10px_rgba(0,0,0,0.7)]">
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200"> ชื่อย่อ</label>
          <TextField
            name="Email"
            id="Email"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setName(e.target.value)}
            defaultValue={baan.name}
          />
        </div>

        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">ชื่อเต็ม</label>
          <TextField
            name="Tel"
            id="Tel"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setFullName(e.target.value)}
            defaultValue={baan.fullName}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">link</label>
          <TextField
            name="Tel"
            id="Tel"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setLink(e.target.value)}
            defaultValue={baan.link}
          />
        </div>

        {camp.nongSleepModel == "ไม่มีการค้างคืน" ? null : (
          <>
            <PlaceSelect
              buildingText="เลือกตึกที่ใช้เป็นห้องนอนน้องผู้ชาย"
              placeText="เลือกชั้นและห้องที่ใช้เป็นห้องนอนน้องผู้ชาย"
              allPlaceData={allPlaceData}
              place={boy}
              onClick={(place) => {
                setBP(place);
              }}
            />
            <PlaceSelect
              buildingText="เลือกตึกที่ใช้เป็นห้องนอนน้องผู้หญิง"
              placeText="เลือกชั้นและห้องที่ใช้เป็นห้องนอนน้องผู้หญิง"
              place={girl}
              onClick={(place) => {
                setGP(place);
              }}
              allPlaceData={allPlaceData}
            />
          </>
        )}
        <PlaceSelect
          buildingText="เลือกตึกที่ใช้เป็นห้องบ้าน"
          placeText="เลือกชั้นและห้องที่ใช้เป็นห้องบ้าน"
          allPlaceData={allPlaceData}
          place={normal}
          onClick={(place) => {
            setNP(place);
          }}
        />
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            อนุญาตให้น้องส่งข้อขวามในห้องบ้านหรือไม่
          </label>
          <Checkbox
            onChange={(e, state) => {
              setNongSendMessage(state);
            }}
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            defaultChecked={nongSendMessage}
          />
        </div>
        <div className="flex flex-row justify-end">
          <button
            className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
            onClick={() => {
              try {
                updateBaan(
                  {
                    name,
                    fullName,
                    baanId: baan._id,
                    link,
                    girlSleepPlaceId: gP ? gP._id : null,
                    boySleepPlaceId: bP ? bP._id : null,
                    normalPlaceId: nP ? nP._id : null,
                    nongSendMessage,
                  },
                  session.user.token
                );
              } catch (error) {
                console.log(error);
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
