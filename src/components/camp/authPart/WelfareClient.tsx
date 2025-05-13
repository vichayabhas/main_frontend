"use client";

import {
  CampWelfarePack,
  InterMeal,
  InterTimeOffset,
  RoleCamp,
  UpdateTimeOffsetRaw,
} from "../../../../interface";
import { Checkbox, MenuItem, Select } from "@mui/material";
import CampNumberTable from "../../utility/CampNumberTable";
import React from "react";
import {
  copy,
  downloadText,
  getBackendUrl,
  selectTimeToSystem,
  setBoolean,
  SocketReady,
} from "../../utility/setup";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import createMeal from "@/libs/randomthing/createMeal";
import { useDownloadExcel } from "react-export-table-to-excel";
import FinishButton from "@/components/utility/FinishButton";
import GetTimeHtml from "@/components/utility/GetTimeHtml";
import { io } from "socket.io-client";
import { RealTimeCamp } from "./UpdateCampClient";
const socket = io(getBackendUrl());
export default function WelfareClient({
  welfare,
  displayOffset,
  partIdString,
  token,
  selectOffset,
}: {
  welfare: CampWelfarePack;
  displayOffset: UpdateTimeOffsetRaw;
  partIdString: string;
  token: string;
  selectOffset: InterTimeOffset;
}) {
  
  const welfareModes = [
    "ดูเฉพาะขนาดเสื้อ",
    "ดูทั้งหมด",
    "ซ่อนปัญหาสุขภาพพี่บ้านในฝ่าย",
    "ขั้นสูง",
  ] as const;
  type WelfareMode = (typeof welfareModes)[number];
  const [welfareMode, setWelfareMode] =
    React.useState<WelfareMode>("ดูทั้งหมด");
  const [camp, setCamp] = React.useState(welfare.camp);
  const [nong, setNong] = React.useState(true);
  const [pee, setPee] = React.useState(true);
  const [peto, setPeto] = React.useState(
    camp.memberStructure == "nong->highSchool,pee->1year,peto->2upYear"
  );
  const [time, setTime] = React.useState<Date | null>(null);
  const [meals, setMeals] = React.useState(welfare.meals);
  const showPart =
    camp.memberStructure == "nong->highSchool,pee->1year,peto->2upYear" ||
    welfareMode != "ซ่อนปัญหาสุขภาพพี่บ้านในฝ่าย";
  const router = useRouter();
  const sizeRef = React.useRef(null);
  const foodRef = React.useRef(null);
  const sizeDownload = useDownloadExcel({
    currentTableRef: sizeRef.current,
    filename: `ตารางขนาดเสื้อของค่าย${camp.campName}`,
  });
  const foodDownload = useDownloadExcel({
    currentTableRef: foodRef.current,
    filename: `ข้อมูลแพ้อาหารของค่าย${camp.campName}`,
  });
  const realTimeCamp = new RealTimeCamp(camp._id, socket);
  const createMealSocket = new SocketReady<InterMeal[]>(
    socket,
    "createMeal",camp._id
  );
  React.useEffect(() => {
    createMealSocket.listen(setMeals);
    realTimeCamp.listen(setCamp);
    return () => {
      createMealSocket.disconnect();
      realTimeCamp.disconnect();
    };
  });
  return (
    <>
      <Select value={welfareMode}>
        {welfareModes.map((e, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              setWelfareMode(e);
            }}
            value={e}
          >
            {e}
          </MenuItem>
        ))}
      </Select>
      <table
        style={{
          width: "80%",
          marginLeft: "10%",
        }}
        ref={sizeRef}
      >
        <tr>
          <th>กลุ่ม</th>
          <th>{camp.nongCall} S</th>
          <th>{camp.nongCall} M</th>
          <th>{camp.nongCall} L</th>
          <th>{camp.nongCall} XL</th>
          <th>{camp.nongCall} XXL</th>
          <th>{camp.nongCall} 3XL</th>
          <th>พี่{camp.groupName} S</th>
          <th>พี่{camp.groupName} M</th>
          <th>พี่{camp.groupName} L</th>
          <th>พี่{camp.groupName} XL</th>
          <th>พี่{camp.groupName} XXL</th>
          <th>พี่{camp.groupName} 3XL</th>
          {camp.memberStructure ==
          "nong->highSchool,pee->1year,peto->2upYear" ? (
            <>
              <th>ปีโต S</th>
              <th>ปีโต M</th>
              <th>ปีโต L</th>
              <th>ปีโต XL</th>
              <th>ปีโต XXL</th>
              <th>ปีโต 3XL</th>
            </>
          ) : null}
        </tr>
        <tr>
          <td>{camp.campName}</td>
          <td>{welfare.campWelfare.nongSize.sizeS}</td>
          <td>{welfare.campWelfare.nongSize.sizeM}</td>
          <td>{welfare.campWelfare.nongSize.sizeL}</td>
          <td>{welfare.campWelfare.nongSize.sizeXL}</td>
          <td>{welfare.campWelfare.nongSize.sizeXXL}</td>
          <td>{welfare.campWelfare.nongSize.size3XL}</td>
          <td>{welfare.campWelfare.peeSize.sizeS}</td>
          <td>{welfare.campWelfare.peeSize.sizeM}</td>
          <td>{welfare.campWelfare.peeSize.sizeL}</td>
          <td>{welfare.campWelfare.peeSize.sizeXL}</td>
          <td>{welfare.campWelfare.peeSize.sizeXXL}</td>
          <td>{welfare.campWelfare.peeSize.size3XL}</td>
          {camp.memberStructure ==
          "nong->highSchool,pee->1year,peto->2upYear" ? (
            <>
              <td>{welfare.campWelfare.petoSize.sizeS}</td>
              <td>{welfare.campWelfare.petoSize.sizeM}</td>
              <td>{welfare.campWelfare.petoSize.sizeL}</td>
              <td>{welfare.campWelfare.petoSize.sizeXL}</td>
              <td>{welfare.campWelfare.petoSize.sizeXXL}</td>
              <td>{welfare.campWelfare.petoSize.size3XL}</td>
            </>
          ) : null}
        </tr>
        {welfare.baanWelfares.map((data, i) => (
          <tr key={i}>
            <td>{data.name}</td>
            <td>{data.nongSize.sizeS}</td>
            <td>{data.nongSize.sizeM}</td>
            <td>{data.nongSize.sizeL}</td>
            <td>{data.nongSize.sizeXL}</td>
            <td>{data.nongSize.sizeXXL}</td>
            <td>{data.nongSize.size3XL}</td>
            <td>{data.peeSize.sizeS}</td>
            <td>{data.peeSize.sizeM}</td>
            <td>{data.peeSize.sizeL}</td>
            <td>{data.peeSize.sizeXL}</td>
            <td>{data.peeSize.sizeXXL}</td>
            <td>{data.peeSize.size3XL}</td>
            {camp.memberStructure ==
            "nong->highSchool,pee->1year,peto->2upYear" ? (
              <>
                <td>{data.petoSize.sizeS}</td>
                <td>{data.petoSize.sizeM}</td>
                <td>{data.petoSize.sizeL}</td>
                <td>{data.petoSize.sizeXL}</td>
                <td>{data.petoSize.sizeXXL}</td>
                <td>{data.petoSize.size3XL}</td>
              </>
            ) : null}
          </tr>
        ))}
        {welfare.partWelfares.map((data, i) => (
          <tr key={i}>
            <td>{data.name}</td>
            <td>{data.nongSize.sizeS}</td>
            <td>{data.nongSize.sizeM}</td>
            <td>{data.nongSize.sizeL}</td>
            <td>{data.nongSize.sizeXL}</td>
            <td>{data.nongSize.sizeXXL}</td>
            <td>{data.nongSize.size3XL}</td>
            <td>{data.peeSize.sizeS}</td>
            <td>{data.peeSize.sizeM}</td>
            <td>{data.peeSize.sizeL}</td>
            <td>{data.peeSize.sizeXL}</td>
            <td>{data.peeSize.sizeXXL}</td>
            <td>{data.peeSize.size3XL}</td>
            {camp.memberStructure ==
            "nong->highSchool,pee->1year,peto->2upYear" ? (
              <>
                <td>{data.petoSize.sizeS}</td>
                <td>{data.petoSize.sizeM}</td>
                <td>{data.petoSize.sizeL}</td>
                <td>{data.petoSize.sizeXL}</td>
                <td>{data.petoSize.sizeXXL}</td>
                <td>{data.petoSize.size3XL}</td>
              </>
            ) : null}
          </tr>
        ))}
      </table>
      <FinishButton text={downloadText} onClick={sizeDownload.onDownload} />
      {welfareMode == "ดูเฉพาะขนาดเสื้อ" ? null : (
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        <>
          <table ref={foodRef}>
            <tr>
              <th>ชื่อเล่น</th>
              <th>ชื่อจริง</th>
              <th>นามสกุล</th>
              <th>จาก</th>
              <th>บทบาท</th>
              <th>แพ้อาหารอะไรบ้าง</th>
              <th>เน้นย้ำเรื่องอาหารอะไรบ้าง</th>
              <th>กินเผ็ดได้หรือไม่</th>
              {welfareMode == "ขั้นสูง" ? <th>ใส่แพมเพิสหรือไม่</th> : null}
            </tr>
            {welfare.baanWelfares.map((baan) => (
              <>
                {baan.nongHealths.map((nong, i) => (
                  <tr key={i}>
                    <td>{nong.user.nickname}</td>
                    <td>{nong.user.name}</td>
                    <td>{nong.user.lastname}</td>
                    <td>{baan.name}</td>
                    <td>{camp.nongCall}</td>
                    <td>{nong.heathIssue.food}</td>
                    <td>{nong.heathIssue.foodConcern}</td>
                    <td>{nong.heathIssue.spicy ? "ไม่ได้" : "ได้"}</td>
                    {welfareMode == "ขั้นสูง" ? (
                      <td>{nong.heathIssue.isWearing ? "ใส่" : "ไม่ใส่"}</td>
                    ) : null}
                  </tr>
                ))}
                {baan.peeHealths.map((pee, i) => (
                  <tr key={i}>
                    <td>{pee.user.nickname}</td>
                    <td>{pee.user.name}</td>
                    <td>{pee.user.lastname}</td>
                    <td>{baan.name}</td>
                    <td>พี่{camp.groupName}</td>
                    <td>{pee.heathIssue.food}</td>
                    <td>{pee.heathIssue.foodConcern}</td>
                    <td>{pee.heathIssue.spicy ? "ไม่ได้" : "ได้"}</td>
                    {welfareMode == "ขั้นสูง" ? (
                      <td>{pee.heathIssue.isWearing ? "ใส่" : "ไม่ใส่"}</td>
                    ) : null}
                  </tr>
                ))}
              </>
            ))}
            {showPart
              ? welfare.partWelfares.map((part) => (
                  <>
                    {camp.memberStructure ==
                    "nong->highSchool,pee->1year,peto->2upYear"
                      ? part.petoHealths.map((peto, i) => (
                          <tr key={i}>
                            <td>{peto.user.nickname}</td>
                            <td>{peto.user.name}</td>
                            <td>{peto.user.lastname}</td>
                            <td>{part.name}</td>
                            <td>ปีโต</td>
                            <td>{peto.heathIssue.food}</td>
                            <td>{peto.heathIssue.foodConcern}</td>
                            <td>{peto.heathIssue.spicy ? "ไม่ได้" : "ได้"}</td>
                            {welfareMode == "ขั้นสูง" ? (
                              <td>
                                {peto.heathIssue.isWearing ? "ใส่" : "ไม่ใส่"}
                              </td>
                            ) : null}
                          </tr>
                        ))
                      : null}
                    {welfareMode != "ซ่อนปัญหาสุขภาพพี่บ้านในฝ่าย"
                      ? part.peeHealths.map((pee, i) => (
                          <tr key={i}>
                            <td>{pee.user.nickname}</td>
                            <td>{pee.user.name}</td>
                            <td>{pee.user.lastname}</td>
                            <td>{part.name}</td>
                            <td>พี่{camp.groupName}</td>
                            <td>{pee.heathIssue.food}</td>
                            <td>{pee.heathIssue.foodConcern}</td>
                            <td>{pee.heathIssue.spicy ? "ไม่ได้" : "ได้"}</td>
                            {welfareMode == "ขั้นสูง" ? (
                              <td>
                                {pee.heathIssue.isWearing ? "ใส่" : "ไม่ใส่"}
                              </td>
                            ) : null}
                          </tr>
                        ))
                      : null}
                  </>
                ))
              : null}
          </table>
          <FinishButton text={downloadText} onClick={foodDownload.onDownload} />
        </>
      )}
      จำนวนสมาชิกที่มีกระติกน้ำ
      <CampNumberTable
        isHavePeto={
          camp.memberStructure == "nong->highSchool,pee->1year,peto->2upYear"
        }
        main={welfare.campBottleNumber}
        baanNumbers={welfare.baanHaveBottles}
        partNumbers={welfare.partHaveBottles}
        groupName={camp.groupName}
        filename="จำนวนสมาชิกที่มีกระติกน้ำ"
        nongCall={camp.nongCall}
      />
      จำนวนสมาชิกที่มีกินเผ็ดไม่ได้
      <CampNumberTable
        isHavePeto={
          camp.memberStructure == "nong->highSchool,pee->1year,peto->2upYear"
        }
        main={welfare.campSpicyNumber}
        baanNumbers={welfare.baanSpicyS}
        partNumbers={welfare.partSpicyS}
        groupName={camp.groupName}
        filename="จำนวนสมาชิกที่มีกินเผ็ดไม่ได้"
        nongCall={camp.nongCall}
      />
      จำนวนสมาชิกที่ halal
      <CampNumberTable
        isHavePeto={
          camp.memberStructure == "nong->highSchool,pee->1year,peto->2upYear"
        }
        main={welfare.campHalalNumber}
        baanNumbers={welfare.baanHalalS}
        partNumbers={welfare.partHalalS}
        groupName={camp.groupName}
        filename="จำนวนสมาชิกที่ halal"
        nongCall={camp.nongCall}
      />
      จำนวนสมาชิกที่มังสวิรัติ
      <CampNumberTable
        isHavePeto={
          camp.memberStructure == "nong->highSchool,pee->1year,peto->2upYear"
        }
        main={welfare.campVegetarianNumber}
        baanNumbers={welfare.baanVegetarians}
        partNumbers={welfare.partVegetarians}
        groupName={camp.groupName}
        filename="จำนวนสมาชิกที่มังสวิรัติ"
        nongCall={camp.nongCall}
      />
      จำนวนสมาชิกที่กินเจ
      <CampNumberTable
        isHavePeto={
          camp.memberStructure == "nong->highSchool,pee->1year,peto->2upYear"
        }
        main={welfare.campVeganNumber}
        baanNumbers={welfare.baanVegans}
        partNumbers={welfare.partVegans}
        groupName={camp.groupName}
        filename="จำนวนสมาชิกที่กินเจ"
        nongCall={camp.nongCall}
      />
      <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
        <div
          className="w-[70%] items-center p-10 rounded-3xl"
          style={{
            backgroundColor: "#961A1D",
          }}
        >
          <div className="flex flex-row items-center my-5">
            <label className="w-2/5 text-2xl text-white">
              ข้าวมื้อนี้ให้{camp.nongCall}หรือไม่
            </label>
            <Checkbox
              onChange={setBoolean(setNong)}
              sx={{
                "&.Mui-checked": {
                  color: "#FFFFFF", // Custom color when checked
                },
              }}
              defaultChecked
            />
          </div>
          <div className="flex flex-row items-center my-5">
            <label className="w-2/5 text-2xl text-white">
              ข้าวมื้อนี้ให้พี่{camp.groupName}หรือไม่
            </label>
            <Checkbox
              onChange={setBoolean(setPee)}
              sx={{
                "&.Mui-checked": {
                  color: "#FFFFFF", // Custom color when checked
                },
              }}
              defaultChecked
            />
          </div>
          {camp.memberStructure ==
          "nong->highSchool,pee->1year,peto->2upYear" ? (
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-white">
                ข้าวมื้อนี้ให้ปีโตหรือไม่
              </label>
              <Checkbox
                onChange={setBoolean(setPeto)}
                sx={{
                  "&.Mui-checked": {
                    color: "#FFFFFF", // Custom color when checked
                  },
                }}
                defaultChecked
              />
            </div>
          ) : null}
          <div className="flex flex-row items-center my-5">
            <label className="w-2/5 text-2xl text-white">
              ข้าวมื้อนี้กินเวลาไหน
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                className="bg-white m-10"
                value={time}
                onChange={setTime}
              />
            </LocalizationProvider>
          </div>
          <div className="flex flex-row justify-end">
            <FinishButton
              text="สร้างมื้ออาหาร"
              onClick={() => {
                if (!time) {
                  alert("please select time");
                } else {
                  const roles: RoleCamp[] = [];
                  if (nong) {
                    roles.push("nong");
                  }
                  if (pee) {
                    roles.push("pee");
                  }
                  if (peto) {
                    roles.push("peto");
                  }
                  createMeal(
                    {
                      campId: camp._id,
                      roles,
                      time: selectTimeToSystem(time, selectOffset),
                    },
                    token,
                    createMealSocket,
                    socket
                  );
                }
              }}
            />
          </div>
        </div>
      </div>
      {meals
        .map(copy)
        .sort((a, b) => dayjs(a.time.toString()).diff(b.time.toString()))
        .map((v, i) => (
          <div
            key={i}
            onClick={() =>
              router.push(`/authPart/${partIdString}/welfare/${v._id}`)
            }
          >
            <GetTimeHtml offset={displayOffset} input={v.time.toString()} />
          </div>
        ))}
    </>
  );
}
