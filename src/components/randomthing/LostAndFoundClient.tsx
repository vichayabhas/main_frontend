"use client";

import addLostAndFound from "@/libs/randomthing/addLostAndFound";
import React from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import {
  AllPlaceData,
  Id,
  InterPlace,
  MyMap,
  ShowLostAndFound,
} from "../../../interface";
import { MenuItem, Select, TextField } from "@mui/material";
import FinishButton from "../utility/FinishButton";
import { downloadText, setTextToString, getId } from "../utility/setup";
import PlaceSelect from "./PlaceSelect";

export default function LostAndFoundClient({
  mapIn,
  token,
  allPlaceData,
  lostAndFounds,
}: {
  mapIn: MyMap[];
  token: string;
  allPlaceData: AllPlaceData;
  lostAndFounds: ShowLostAndFound[];
}) {
  const ref = React.useRef(null);

  const [chose, setChose] = React.useState<Id | null>(null);
  const [place, setPlace] = React.useState<InterPlace | null>(null);
  const [detail, setDetail] = React.useState<string | null>(null);
  const [name, setName] = React.useState<string | null>(null);
  const [type, setType] = React.useState<"lost" | "found" | null>(null);
  const download = useDownloadExcel({
    currentTableRef: ref.current,
    filename: "lost and found",
  });
  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      <table ref={ref}>
        <tr>
          <th>id</th>
          <th>สิ่งของอะไร</th>
          <th>รายละเอียด</th>
          <th>ชื่อเล่นของคนพบหรือหา</th>
          <th>เบอร์ติดต่อ</th>
          <th>ประเภท</th>
          <th>ตึก</th>
          <th>ชั้น</th>
          <th>ห้อง</th>
          <th>ค่าย</th>
        </tr>
        {lostAndFounds.map((lostAndFound, i) => (
          <tr key={i}>
            <td>{lostAndFound._id.toString()}</td>
            <td>{lostAndFound.name}</td>
            <td>{lostAndFound.detail}</td>
            <td>{lostAndFound.userNickname}</td>
            <td>{lostAndFound.tel}</td>
            <td>{lostAndFound.type}</td>
            <td>{lostAndFound.buildingName.toString()}</td>
            <td>{lostAndFound.floor.toString()}</td>
            <td>{lostAndFound.room.toString()}</td>
            <td>{lostAndFound.campName}</td>
          </tr>
        ))}
      </table>
      <FinishButton text={downloadText} onClick={download.onDownload} />
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
            onChange={setTextToString(setName, true)}
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
            onChange={setTextToString(setDetail, true)}
          />
        </div>
        <PlaceSelect
          place={null}
          onClick={setPlace}
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
              if (type && detail && name)
                addLostAndFound(
                  {
                    type,
                    campId: chose,
                    name,
                    detail,
                    placeId: getId(place),
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
