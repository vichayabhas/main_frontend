"use client";

import { Session } from "next-auth";
import { Select, MenuItem, TextField, Input } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import createCamp from "@/libs/admin/createCamp";
import addCampName from "@/libs/admin/addCampName";
import React from "react";

import {
  InterNameContainer,
  CreateCamp,
  InterPartNameContainer,
  Id,
} from "../../interface";
import addPartName from "@/libs/admin/addPartName";
import FinishButton from "./FinishButton";
import { getBackendUrl, stringToId } from "./setup";
//import { InterNameContainer, CreateCamp } from "../../interface";

export default function AdminClient({
  campNameContainers,
  session,
  partNameContainers,
}: {
  campNameContainers: InterNameContainer[];
  session: Session;
  partNameContainers: InterPartNameContainer[];
}) {
  const models: (
    | "นอนทุกคน"
    | "เลือกได้ว่าจะค้างคืนหรือไม่"
    | "ไม่มีการค้างคืน"
  )[] = ["นอนทุกคน", "เลือกได้ว่าจะค้างคืนหรือไม่", "ไม่มีการค้างคืน"];
  const [chose, setChose] = useState<Id | null>(null);
  const [round, setRound] = useState<number | null>(null);
  const [dateStart, setDateStart] = useState<Date | null>(null);
  const [dateEnd, setDateEnd] = useState<Date | null>(null);
  const [memberStructure, setMemberStructure] = useState<
    | "nong->highSchool,pee->1year,peto->2upYear"
    | "nong->highSchool,pee->2upYear"
    | "nong->1year,pee->2upYear"
    | "nong->highSchool,pee->allYear"
    | "allYearMix"
    | null
  >(null);
  const [registerModel, setRegisterModel] = useState<
    "noPaid" | "noInterview" | "all" | null
  >(null);
  const [boardIds, setBoardIds] = useState<string | null>(null);
  const [newName, setNewName] = useState<string | null>(null);
  const [nongSleepModel, setNongSleepModel] = useState<
    "นอนทุกคน" | "เลือกได้ว่าจะค้างคืนหรือไม่" | "ไม่มีการค้างคืน" | null
  >(null);
  const [peeSleepModel, setPeeSleepModel] = useState<
    "นอนทุกคน" | "เลือกได้ว่าจะค้างคืนหรือไม่" | "ไม่มีการค้างคืน" | null
  >(null);
  const [newPartName, setNewPartName] = useState<string | null>(null);
  return (
    <form
      className="w-[70%] items-center p-10 rounded-3xl "
      style={{
        backgroundColor: "#961A1D",
      }}
    >
      <div className=" flex flex-row items-center ">
        <label
          className="w-2/5 text-2xl text-white"
          style={{
            textAlign: "left",
          }}
        >
          เลือกชื่อค่าย
        </label>
        <Select
          variant="standard"
          name="location"
          id="location"
          className="h-[2em] w-[200px] text-white"
          style={{
            textAlign: "left",
          }}
        >
          {campNameContainers.map((choice: InterNameContainer,i) => {
            return (
              <MenuItem key={i}
                value={choice.name}
                onClick={() => {
                  setChose(choice._id);
                  //alert(choice._id);
                }}
              >
                {choice.name}
              </MenuItem>
            );
          })}
        </Select>
      </div>

      <div className=" rounded-lg ">
        <div className="flex flex-row items-center my-5">
          <label
            className="w-2/5 text-2xl text-white"
            style={{
              textAlign: "left",
            }}
          >
            ครั้งที่
          </label>
          <Input
            type="number"
            id="name"
            name="name"
            className="text-white"
            required
            onChange={(e) => {
              setRound(parseInt(e.target.value));
            }}
          />
        </div>
      </div>
      <div className=" flex flex-row items-center">
        <label
          className="w-2/5 text-2xl text-white"
          style={{
            textAlign: "left",
          }}
        >
          วันเริ่มค่าย
        </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            className="bg-white m-10 rounded-2xl"
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
            value={dateStart}
            onChange={(newValue) => {
              setDateStart(newValue);
              console.log(newValue);
            }}
            disablePast
          />
        </LocalizationProvider>
      </div>
      <div className=" flex flex-row items-center">
        <label
          className="w-2/5 text-2xl text-white"
          style={{
            textAlign: "left",
          }}
        >
          วันจบค่าย
        </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            className="bg-white m-10 rounded-2xl"
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
            value={dateEnd}
            onChange={(newValue) => {
              setDateEnd(newValue);
              console.log(newValue);
            }}
            disablePast
          />
        </LocalizationProvider>
      </div>
      <div className=" flex flex-row items-center ">
        <label
          className="w-2/5 mb-5 text-2xl text-white"
          style={{
            textAlign: "left",
          }}
        >
          รูปแบบสมาชิกค่าย
        </label>
        <Select
          variant="standard"
          name="location"
          id="location"
          className="h-[2em] w-[200px] mb-5 text-white"
        >
          <MenuItem
            value={"น้องค่ายเป็นเด็กมใปลาย พี่บ้านเป็นปี 1"}
            onClick={() => {
              setMemberStructure("nong->highSchool,pee->1year,peto->2upYear");
            }}
          >
            น้องค่ายเป็นเด็กมใปลาย พี่บ้านเป็นปี 1
          </MenuItem>
          <MenuItem
            onClick={() => {
              setMemberStructure("nong->1year,pee->2upYear");
            }}
            value="น้องค่ายเป็นปี 1"
          >
            น้องค่ายเป็นปี 1
          </MenuItem>
          <MenuItem
            onClick={() => {
              setMemberStructure("nong->highSchool,pee->2upYear");
            }}
            value="น้องค่ายเป็นเด็กมใปลาย พี่บ้านเป็นปีโต"
          >
            น้องค่ายเป็นเด็กมใปลาย พี่บ้านเป็นปีโต
          </MenuItem>
          <MenuItem
            onClick={() => {
              setMemberStructure("nong->highSchool,pee->allYear");
            }}
            value="น้องค่ายเป็นเด็กมใปลาย พี่บ้านเป็นปี 1-4"
          >
            น้องค่ายเป็นเด็กมใปลาย พี่บ้านเป็นปี 1-4
          </MenuItem>
          <MenuItem
            onClick={() => {
              setMemberStructure("allYearMix");
            }}
            value="นิสิตเป็นได้ทั้งพี่บ้านและน้องค่าย"
          >
            นิสิตเป็นได้ทั้งพี่บ้านและน้องค่าย
          </MenuItem>
        </Select>
      </div>
      <div className=" flex flex-row items-center">
        <label
          className="w-2/5 text-2xl mb-5 text-white"
          style={{
            textAlign: "left",
          }}
        >
          รูปแบบการลงทะเบียนค่าย
        </label>
        <Select
          variant="standard"
          name="location"
          id="location"
          className="h-[2em] w-[200px] mb-5 text-white"
        >
          <MenuItem
            onClick={() => {
              setRegisterModel("all");
            }}
            value="มีสัมภาสและค่าใช้จ่าย"
          >
            มีสัมภาสและค่าใช้จ่าย
          </MenuItem>
          <MenuItem
            onClick={() => {
              setRegisterModel("noInterview");
            }}
            value="ไม่มีสัมภาสแต่มีค่าใช้จ่าย"
          >
            ไม่มีสัมภาสแต่มีค่าใช้จ่าย
          </MenuItem>
          <MenuItem
            onClick={() => {
              setRegisterModel("noPaid");
            }}
            value="ไม่มีสัมภาสและไม่มีค่าใช้จ่าย"
          >
            ไม่มีสัมภาสและไม่มีค่าใช้จ่าย
          </MenuItem>
        </Select>
      </div>
      <div className=" flex flex-row items-center ">
        <label
          className="w-2/5 text-2xl mb-5 text-white"
          style={{
            textAlign: "left",
          }}
        >
          รูปแบบการค้างคืนของพี่ค่าย
        </label>
        <Select
          variant="standard"
          name="location"
          id="location"
          className="h-[2em] w-[200px] mb-5 mx-3 text-white"
        >
          {models.map(
            (
              value:
                | "นอนทุกคน"
                | "เลือกได้ว่าจะค้างคืนหรือไม่"
                | "ไม่มีการค้างคืน",i
            ) => {
              return (
                <MenuItem key={i}
                  onClick={() => {
                    setPeeSleepModel(value);
                  }}
                  value={value}
                >
                  {value}
                </MenuItem>
              );
            }
          )}
        </Select>
        <label
          className="w-2/5 text-2xl mb-5 text-white"
          style={{
            textAlign: "left",
          }}
        >
          รูปแบบการค้างคืนของน้องค่าย
        </label>
        <Select
          variant="standard"
          name="location"
          id="location"
          className="h-[2em] w-[200px] mb-5 mx-3 text-white"
        >
          {models.map(
            (
              value:
                | "นอนทุกคน"
                | "เลือกได้ว่าจะค้างคืนหรือไม่"
                | "ไม่มีการค้างคืน",i
            ) => {
              return (
                <MenuItem key={i}
                  onClick={() => {
                    setNongSleepModel(value);
                  }}
                  value={value}
                >
                  {value}
                </MenuItem>
              );
            }
          )}
        </Select>
      </div>

      <div className="flex flex-row items-center mt-4">
        <label
          className="w-2/5 text-2xl text-white"
          style={{
            textAlign: "left",
          }}
        >
          บอร์ดค่าย userId ให้ใส่ , ห้ามเว้นวรรค
        </label>
        <TextField
          name="Name"
          id="Name"
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
          className="w-3/5 bg-white rounded-2xl shadow-inner"
          onChange={(e) => setBoardIds(e.target.value)}
        />
      </div>
      <div className=" rounded-lg ">
        <button
          className="bg-white p-3 mt-2  mb-4 font-medium rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
          style={{
            color: "#961A1D",
          }}
          onClick={() => {
            if (
              chose &&
              boardIds &&
              memberStructure &&
              registerModel &&
              round &&
              dateStart &&
              dateEnd &&
              nongSleepModel &&
              peeSleepModel
            ) {
              try {
                const reddy: CreateCamp = {
                  nameId: chose,
                  boardIds: boardIds
                    .split(",")
                    .map((input: string) => stringToId(input)),
                  registerModel,
                  round,
                  dateEnd,
                  dateStart,
                  memberStructure,
                  peeSleepModel,
                  nongSleepModel,
                };
                createCamp(reddy, session.user.token);
              } catch (error) {
                alert(error);
                console.log(error);
              }
            } else {
              alert("Please type in all the details!");
              alert(chose);
              alert(boardIds);
              alert(registerModel);
              alert(round);
              alert(dateEnd);
              alert(dateStart);
              alert(memberStructure);
              console.log({
                nameId: chose,
                boardIds,
                registerModel,
                round,
                dateEnd,
                dateStart,
                memberStructure,
              });
            }
          }}
        >
          Create Camp
        </button>
      </div>
      {campNameContainers.map((nameContainer: InterNameContainer,i) => (
        <label className="w-2/5 text-2xl text-white" key={i}>
          {nameContainer.name}
        </label>
      ))}
      <div className="flex flex-row items-center">
        <label
          className="w-2/5 text-2xl text-white"
          style={{
            textAlign: "left",
          }}
        >
          เพิ่มชื่อค่าย
        </label>
        <TextField
          name="Name"
          id="Name"
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
          className="w-3/5 bg-white rounded-2xl shadow-inner"
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <button
        className="bg-white mt-2  mb-4  p-3 font-medium rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
        style={{
          color: "#961A1D",
        }}
        onClick={() => {
          if (newName) {
            try {
              addCampName(newName, session.user.token);
            } catch (error) {
              console.log(error);
            }
          } else {
            alert("Please type in all the detail!");
          }
        }}
      >
        สร้างชื่อค่าย
      </button>

      {partNameContainers.map((nameContainer: InterPartNameContainer,i) => (
        <div key={i}>
          <label className="text-2xl text-white" style={{ textAlign: "left" }}>
            {nameContainer.name}
          </label>
        </div>
      ))}

      <div className="flex flex-row items-center">
        <label
          className="w-2/5 text-2xl text-white"
          style={{
            textAlign: "left",
          }}
        >
          เพิ่มชื่อฝ่าย
        </label>
        <TextField
          name="Name"
          id="Name"
          className="w-3/5 bg-white rounded-2xl shadow-inner"
          onChange={(e) => setNewPartName(e.target.value)}
        />
      </div>
      <button
        className=" p-3 bg-white rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
        style={{
          color: "#961A1D",
          marginTop: "20px",
        }}
        onClick={() => {
          if (newPartName) {
            try {
              addPartName(newPartName, session.user.token);
            } catch (error) {
              console.log(error);
            }
          } else {
            alert("Please type in all the details!");
          }
        }}
      >
        สร้างชื่อค่าย
      </button>
      <FinishButton
        onClick={async () => {
          await fetch(`${getBackendUrl()}/admin/afterVisnuToPee`, {
            method: "POST",
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${session.user.token}`,
            },
          });
        }}
        text="เปลี่ยนสถานะจากน้องค่ายวิศนุเป็นพี่บ้าน"
      />
      <FinishButton
        onClick={async () => {
          await fetch(`${getBackendUrl()}/admin/peeToPeto`, {
            method: "POST",
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${session.user.token}`,
            },
          });
        }}
        text="เปลี่ยนสถานะจากพี่บ้านเป็นปีโต"
      />
    </form>
  );
}
