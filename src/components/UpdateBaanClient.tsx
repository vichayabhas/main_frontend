"use client";
import React, { useRef } from "react";
import { useState } from "react";
import { AllPlaceData, GetCoopData, InterPlace } from "../../interface";
import { useSession } from "next-auth/react";
import { Checkbox, TextField } from "@mui/material";
import updateBaan from "@/libs/admin/updateBaan";
import BackToHome from "./BackToHome";
import PlaceSelect from "./PlaceSelect";
import {
  downloadText,
  peeLookupNong,
  setBoolean,
  setTextToString,
} from "./setup";
import { useDownloadExcel } from "react-export-table-to-excel";
import FinishButton from "./FinishButton";
export default function UpdateBaanClient({
  coopData,
  allPlaceData,
}: {
  coopData: GetCoopData;
  allPlaceData: AllPlaceData;
}) {
  // dispatch = useDispatch<AppDispatch>();
  //const update = useAppSelector((state) => state.bookSlice.bookItem);
  const { data: session } = useSession();
  const [boy, setBoy] = useState<InterPlace | null>(coopData.boy);
  const [girl, setGirl] = useState<InterPlace | null>(coopData.girl);
  const [normal, setNormal] = useState<InterPlace | null>(coopData.normal);
  const [name, setName] = useState<string>(coopData.baan.name);
  const [fullName, setFullName] = useState<string | null>(
    coopData.baan.fullName
  );
  const [link, setLink] = useState<string | null>(coopData.baan.link);
  const [nongSendMessage, setNongSendMessage] = useState<boolean>(
    coopData.baan.nongSendMessage
  );
  const [highMode, setHighMode] = useState(false);
  if (!session) {
    return <BackToHome />;
  }
  const ref = useRef(null);
  const download = useDownloadExcel({
    currentTableRef: ref.current,
    filename: `รายชื่อ${coopData.camp.groupName}${coopData.baan.name}`,
  });
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
            onChange={setTextToString(setName)}
            value={name}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">ชื่อเต็ม</label>
          <TextField
            name="Tel"
            id="Tel"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={setTextToString(setFullName, true)}
            value={fullName}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">link</label>
          <TextField
            name="Tel"
            id="Tel"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={setTextToString(setLink)}
            value={link}
          />
        </div>
        {coopData.camp.nongSleepModel == "ไม่มีการค้างคืน" ? null : (
          <>
            <PlaceSelect
              buildingText="เลือกตึกที่ใช้เป็นห้องนอนน้องผู้ชาย"
              placeText="เลือกชั้นและห้องที่ใช้เป็นห้องนอนน้องผู้ชาย"
              allPlaceData={allPlaceData}
              place={boy}
              onClick={setBoy}
            />
            <PlaceSelect
              buildingText="เลือกตึกที่ใช้เป็นห้องนอนน้องผู้หญิง"
              placeText="เลือกชั้นและห้องที่ใช้เป็นห้องนอนน้องผู้หญิง"
              place={girl}
              onClick={setGirl}
              allPlaceData={allPlaceData}
            />
          </>
        )}
        <PlaceSelect
          buildingText="เลือกตึกที่ใช้เป็นห้องบ้าน"
          placeText="เลือกชั้นและห้องที่ใช้เป็นห้องบ้าน"
          allPlaceData={allPlaceData}
          place={normal}
          onClick={setNormal}
        />
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            อนุญาตให้น้องส่งข้อขวามในห้องบ้านหรือไม่
          </label>
          <Checkbox
            onChange={setBoolean(setNongSendMessage)}
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
                    baanId: coopData.baan._id,
                    link,
                    girlSleepPlaceId: girl ? girl._id : null,
                    boySleepPlaceId: boy ? boy._id : null,
                    normalPlaceId: normal ? normal._id : null,
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
      <div className="flex flex-row items-center my-5">
        <label className="w-2/5 text-2xl text-white">ดูข้อมูลขั้นสูง</label>
        <Checkbox
          onChange={setBoolean(setHighMode)}
          sx={{
            "&.Mui-checked": {
              color: "#FFFFFF", // Custom color when checked
            },
          }}
          defaultChecked={nongSendMessage}
        />
      </div>
      <table ref={ref}>
        <tr>
          <th>ชื่อเล่น</th>
          <th>ชื่อจริง</th>
          <th>นามสกุล</th>
          <th>บทบาท</th>
          <th>เน้นย้ำเรื่องอาหารอะไรบ้าง</th>
          <th>มีโรคประจำตัวอะไรบ้าง</th>
          {highMode ? <th>ใส่แพมเพิสหรือไม่</th> : null}
        </tr>
        {peeLookupNong(
          coopData.peeHealths.map((health, i) => (
            <tr key={i}>
              <td>{health.user.nickname}</td>
              <td>{health.user.name}</td>
              <td>{health.user.lastname}</td>
              <td>พี่{coopData.camp.groupName}</td>
              <td>{health.heathIssue.extra}</td>
              <td>{health.heathIssue.chronicDisease}</td>
              {highMode ? (
                <td>{health.heathIssue.isWearing ? "ใส่" : "ไม่ใส่"}</td>
              ) : null}
            </tr>
          )),
          coopData.nongHealths.map((health, i) => (
            <tr key={i}>
              <td>{health.user.nickname}</td>
              <td>{health.user.name}</td>
              <td>{health.user.lastname}</td>
              <td>น้องค่าย</td>
              <td>{health.heathIssue.extra}</td>
              <td>{health.heathIssue.chronicDisease}</td>
              {highMode ? (
                <td>{health.heathIssue.isWearing ? "ใส่" : "ไม่ใส่"}</td>
              ) : null}
            </tr>
          ))
        )}
      </table>
      <FinishButton text={downloadText} onClick={download.onDownload} />
    </div>
  );
}
