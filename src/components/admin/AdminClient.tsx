"use client";

import { Select, MenuItem, TextField, Input, Checkbox } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import createCamp from "@/libs/admin/createCamp";
import addCampName from "@/libs/admin/addCampName";
import React from "react";
import addPartName from "@/libs/admin/addPartName";
import {
  CreateAuthCamp,
  InterNameContainer,
  InterPartNameContainer,
  Id,
  authTypes,
  CreateCamp,
  GetAdminData,
  BasicUser,
} from "../../../interface";
import FinishButton from "../utility/FinishButton";
import {
  setTextToInt,
  setTextToString,
  setBoolean,
  setMap,
  modifyElementInUseStateArray,
  modifyElementInUseStateArray2Dimension,
  notEmpty,
  getBackendUrl,
  setSwop,
} from "../utility/setup";

const defaultPartAuths: CreateAuthCamp[] = [
  {
    partName: "PR/studio",
    auths: ["pr/studio"],
  },
  {
    partName: "board",
    auths: [
      "pr/studio",
      "ตรวจคำตอบข้อเขียน",
      "ทะเบียน",
      "พยาบาล",
      "สวัสดิการ",
      "หัวหน้าพี่เลี้ยง",
      "แก้ไขคำถาม",
      "แผน",
      "แก้ไขรูปภาพและคำอธิบายได้ทุกบ้าน",
      "แก้ไขกลุ่มได้",
      "สามารถจัดการของได้",
      "แก้ไขปัญหาสุขภาพให้เข้ากับพี่และน้อง",
    ],
  },
  {
    partName: "ทะเบียน",
    auths: ["ตรวจคำตอบข้อเขียน", "ทะเบียน", "แก้ไขคำถาม"],
  },
  {
    partName: "ประสาน",
    auths: [
      "หัวหน้าพี่เลี้ยง",
      "ตรวจคำตอบข้อเขียน",
      "แก้ไขรูปภาพและคำอธิบายได้เฉพาะบ้านตัวเอง",
      "แก้ไขกลุ่มได้",
      "แก้ไขปัญหาสุขภาพให้เข้ากับพี่และน้อง",
    ],
  },
  { partName: "พยาบาล", auths: ["พยาบาล"] },
  { partName: "พี่บ้าน", auths: [] },
  { partName: "สวัสดิการ", auths: ["สวัสดิการ", "สามารถจัดการของได้"] },
  { partName: "แผน", auths: ["แผน", "แก้ไขรูปภาพและคำอธิบายได้ทุกบ้าน"] },
];
export default function AdminClient({
  token,
  data: { campNameContainers, partNameContainers, users },
}: {
  data: GetAdminData;
  token: string;
}) {
  const models: (
    | "นอนทุกคน"
    | "เลือกได้ว่าจะค้างคืนหรือไม่"
    | "ไม่มีการค้างคืน"
  )[] = ["นอนทุกคน", "เลือกได้ว่าจะค้างคืนหรือไม่", "ไม่มีการค้างคืน"];
  const [chose, setChose] = React.useState<Id | null>(null);
  const [round, setRound] = React.useState<number | null>(null);
  const [dateStart, setDateStart] = React.useState<Date | null>(null);
  const [dateEnd, setDateEnd] = React.useState<Date | null>(null);
  const [memberStructure, setMemberStructure] = React.useState<
    | "nong->highSchool,pee->1year,peto->2upYear"
    | "nong->highSchool,pee->2upYear"
    | "nong->1year,pee->2upYear"
    | "nong->highSchool,pee->allYear"
    | "allYearMix"
    | null
  >(null);
  const [registerModel, setRegisterModel] = React.useState<
    "noPaid" | "noInterview" | "all" | null
  >(null);
  const [boardIds, setBoardIds] = React.useState<Id[]>([]);
  const [newName, setNewName] = React.useState<string | null>(null);
  const [nongSleepModel, setNongSleepModel] = React.useState<
    "นอนทุกคน" | "เลือกได้ว่าจะค้างคืนหรือไม่" | "ไม่มีการค้างคืน" | null
  >(null);
  const [peeSleepModel, setPeeSleepModel] = React.useState<
    "นอนทุกคน" | "เลือกได้ว่าจะค้างคืนหรือไม่" | "ไม่มีการค้างคืน" | null
  >(null);
  const [newPartName, setNewPartName] = React.useState<string | null>(null);
  const [defaultPartNameAndAuths, setDefaultPartNameAndAuths] = React.useState<
    boolean[][]
  >(
    defaultPartAuths.map((defaultPartAuth) =>
      authTypes.map((authType) => defaultPartAuth.auths.includes(authType))
    )
  );
  const [checks, setChecks] = React.useState<boolean[]>(
    defaultPartAuths.map(() => true)
  );
  const [name, setName] = React.useState<string>("");
  const [nickname, setNickname] = React.useState<string>("");
  const [lastname, setLastname] = React.useState<string>("");
  function filterUser(input: BasicUser): boolean {
    return (
      input.name.search(name) == 0 &&
      input.nickname.search(nickname) == 0 &&
      input.lastname.search(lastname) == 0
    );
  }
  function reset() {
    if (
      memberStructure == "allYearMix" ||
      memberStructure == "nong->highSchool,pee->allYear"
    ) {
      setBoardIds([]);
    }
  }
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
          {campNameContainers.map((choice: InterNameContainer, i) => {
            return (
              <MenuItem
                key={i}
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
            onChange={setTextToInt(setRound)}
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
            onChange={setDateStart}
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
            onChange={setDateEnd}
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
              reset();
            }}
          >
            น้องค่ายเป็นเด็กมใปลาย พี่บ้านเป็นปี 1
          </MenuItem>
          <MenuItem
            onClick={() => {
              setMemberStructure("nong->1year,pee->2upYear");
              reset();
            }}
            value="น้องค่ายเป็นปี 1"
          >
            น้องค่ายเป็นปี 1
          </MenuItem>
          <MenuItem
            onClick={() => {
              setMemberStructure("nong->highSchool,pee->2upYear");
              reset();
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
            value="มีสัมภาษณ์และค่าใช้จ่าย"
          >
            มีสัมภาษณ์และค่าใช้จ่าย
          </MenuItem>
          <MenuItem
            onClick={() => {
              setRegisterModel("noInterview");
            }}
            value="ไม่มีสัมภาษณ์แต่มีค่าใช้จ่าย"
          >
            ไม่มีสัมภาษณ์แต่มีค่าใช้จ่าย
          </MenuItem>
          <MenuItem
            onClick={() => {
              setRegisterModel("noPaid");
            }}
            value="ไม่มีสัมภาษณ์และไม่มีค่าใช้จ่าย"
          >
            ไม่มีสัมภาษณ์และไม่มีค่าใช้จ่าย
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
                | "ไม่มีการค้างคืน",
              i
            ) => {
              return (
                <MenuItem
                  key={i}
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
                | "ไม่มีการค้างคืน",
              i
            ) => {
              return (
                <MenuItem
                  key={i}
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
      <div className="flex flex-row items-center">
        <label className="w-2/5 text-2xl text-white">ชื่อจริง</label>
        <TextField
          name="Name"
          id="Name"
          className="w-3/5 bg-white rounded-2xl "
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
          value={name}
        />
      </div>
      <div className="flex flex-row items-center my-5">
        <label className="w-2/5 text-2xl text-white">นามสกุล</label>
        <TextField
          name="LastName"
          id="LastName"
          className="w-3/5 bg-white rounded-2xl border-gray-200"
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
          onChange={setTextToString(setLastname, true)}
          value={lastname}
        />
      </div>
      <div className="flex flex-row items-center">
        <label className="w-2/5 text-2xl text-white">ชือเล่น</label>
        <TextField
          name="Nickname"
          id="Nickname"
          className="w-3/5 bg-white rounded-2xl border-gray-200"
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
          onChange={setTextToString(setNickname)}
          value={nickname}
        />
      </div>
      <table>
        <tr>
          <th>ชื่อเล่น</th>
          <th>ชื่อจริง</th>
          <th>นามสกุล</th>
          <th>รหัสประจำตัวนิสิต</th>
          <th>check</th>
        </tr>
        {users
          .filter((user) => {
            if (name == "" && nickname == "" && lastname == "") {
              return boardIds.includes(user._id);
            }
            if (!memberStructure) {
              return false;
            }
            switch (memberStructure) {
              case "nong->highSchool,pee->1year,peto->2upYear": {
                if (user.role == "pee") {
                  return false;
                } else {
                  break;
                }
              }
              case "nong->highSchool,pee->2upYear": {
                if (user.role == "pee") {
                  return false;
                } else {
                  break;
                }
              }
              case "nong->1year,pee->2upYear": {
                if (user.role == "pee") {
                  return false;
                } else {
                  break;
                }
              }
              case "nong->highSchool,pee->allYear":
                break;
              case "allYearMix":
                break;
            }
            return filterUser(user) || boardIds.includes(user._id);
          })
          .map((user, i) => {
            return (
              <tr key={i}>
                <td>{user.nickname}</td>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td></td>
                <td>
                  <Checkbox
                    checked={boardIds.includes(user._id)}
                    onChange={setSwop(user._id, setBoardIds)}
                  />
                </td>
              </tr>
            );
          })}
      </table>
      <table>
        <tr>
          <th>ฝ่าย</th>
          <th>checked</th>
          {authTypes.map((authType, i) => (
            <th key={i}>{authType}</th>
          ))}
        </tr>
        {defaultPartAuths.map((defaultPartAuth, i) => (
          <tr key={i}>
            <td>{defaultPartAuth.partName}</td>
            <td>
              <Checkbox
                checked={checks[i]}
                onChange={setBoolean(
                  setMap(setChecks, modifyElementInUseStateArray(i))
                )}
              />
            </td>
            {authTypes.map((_authType, j) => (
              <th key={j}>
                <Checkbox
                  checked={defaultPartNameAndAuths[i][j]}
                  onChange={setBoolean(
                    setMap(
                      setDefaultPartNameAndAuths,
                      modifyElementInUseStateArray2Dimension(i, j)
                    )
                  )}
                />
              </th>
            ))}
          </tr>
        ))}
      </table>
      <div className=" rounded-lg ">
        <button
          className="bg-white p-3 mt-2  mb-4 font-medium rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
          style={{
            color: "#961A1D",
          }}
          onClick={() => {
            if (
              chose &&
              boardIds.length &&
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
                  boardIds,
                  registerModel,
                  round,
                  dateEnd,
                  dateStart,
                  memberStructure,
                  peeSleepModel,
                  nongSleepModel,
                  defaultPartNameAndAuths: defaultPartNameAndAuths
                    .map((defaultPartNameAndAuth, i) =>
                      checks[i]
                        ? {
                            partName: defaultPartAuths[i].partName,
                            auths: authTypes
                              .map((authType, j) =>
                                defaultPartNameAndAuth[j] ? authType : null
                              )
                              .filter(notEmpty),
                          }
                        : null
                    )
                    .filter(notEmpty),
                };
                createCamp(reddy, token);
              } catch (error) {
                alert(error);
                console.log(error);
              }
            } else {
              alert("Please type in all the details!");
            }
          }}
        >
          Create Camp
        </button>
      </div>
      {campNameContainers.map((nameContainer: InterNameContainer, i) => (
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
          onChange={setTextToString(setNewName)}
          value={newName}
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
              addCampName(newName, token);
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

      {partNameContainers.map((nameContainer: InterPartNameContainer, i) => (
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
          onChange={setTextToString(setNewPartName)}
          value={newPartName}
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
              addPartName(newPartName, token);
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
              authorization: `Bearer ${token}`,
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
              authorization: `Bearer ${token}`,
            },
          });
        }}
        text="เปลี่ยนสถานะจากพี่บ้านเป็นปีโต"
      />
    </form>
  );
}
