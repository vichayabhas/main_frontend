"use client";

import createActionPlan from "@/libs/camp/createActionPlan";
import createWorkingItem from "@/libs/camp/createWorkingItem";
import { TextField } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSession } from "next-auth/react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { useRouter } from "next/navigation";
import React from "react";
import plusActionPlan from "@/libs/camp/plusActionPlan";
import PlaceSelect from "@/components/randomthing/PlaceSelect";
import FinishButton from "@/components/utility/FinishButton";
import SelectTemplate from "@/components/utility/SelectTemplate";
import {
  downloadText,
  removeElementInUseStateArray,
  setMap,
  modifyElementInUseStateArray,
  setTextToString,
  notEmpty,
  addTime,
  setTextToInt,
  getBackendUrl,
  getId,
} from "@/components/utility/setup";
import {
  BasicPart,
  BasicUser,
  ShowMember,
  UpdateTimeOffsetRaw,
  BasicCamp,
  AllPlaceData,
  InterPlace,
  MyMap,
} from "../../../../../interface";
import { io } from "socket.io-client";

const socket = io(getBackendUrl());
export default function PartClient({
  user,
  part,
  pees,
  petos,
  selectOffset,
  camp,
  allPlaceData,
}: {
  part: BasicPart;
  user: BasicUser;
  pees: ShowMember[];
  petos: ShowMember[];
  selectOffset: UpdateTimeOffsetRaw;
  camp: BasicCamp;
  allPlaceData: AllPlaceData;
}) {
  const { data: session } = useSession();
  if (user.mode == "nong" || !session) {
    return null;
  }
  const [password, setPassword] = React.useState<string>("null");
  const [name, setName] = React.useState<string | null>(null);
  const [link, setLink] = React.useState<string | null>(null);
  const [action, setAction] = React.useState<string | null>(null);
  const [places, setPlaces] = React.useState<(InterPlace | null)[]>([]);
  const [start, setStart] = React.useState<Date | null>(null);
  const [end, setEnd] = React.useState<Date | null>(null);
  const [body, setBody] = React.useState<string | null>(null);
  const [plus, setPlus] = React.useState<number>(0);
  const router = useRouter();
  const maps: MyMap[] = [];
  let i = 0;
  while (i < pees.length) {
    const { _id, nickname, name, lastname } = pees[i++];
    maps.push({ key: _id, value: `${nickname} ${name} ${lastname}` });
  }
  i = 0;
  while (i < petos.length) {
    const { _id, nickname, name, lastname } = petos[i++];
    maps.push({ key: _id, value: `${nickname} ${name} ${lastname}` });
  }
  const peeRef = React.useRef(null);
  const petoRef = React.useRef(null);
  const peeDownload = useDownloadExcel({
    currentTableRef: peeRef.current,
    filename: `รายชื่อพี่${camp.groupName}ฝ่าย${part.partName}`,
  });
  const petoDownload = useDownloadExcel({
    currentTableRef: petoRef.current,
    filename: `รายชื่อพี่ปีโตฝ่าย${part.partName}`,
  });
  return (
    <main
      className="text-center p-5  rounded-3xl"
      style={{
        border: "solid",
        color: "#373737",
        borderColor: "#373737",
        borderWidth: "2px",
        width: "80%",
        marginLeft: "10%",
        marginTop: "20px",
      }}
    >
      <div>
        <div
          className="text-4xl font-bold"
          style={{
            color: "#373737",
            marginTop: "30px",
            marginBottom: "10px",
          }}
        >
          รายชื่อพี่{camp.groupName}ฝ่าย{part.partName}
        </div>
        <table ref={peeRef}>
          <tr style={{ border: "solid", borderColor: "#373737" }}>
            <th>ชือเล่น</th>
            <th>ชื่อจริง</th>
            <th>นามสกุล</th>
            <th>เพศ</th>
            <th>ค้างคืนหรือไม่</th>
            <th>id</th>
            <th>รหัสประจำตัวนิสิต</th>
            <th>เบอร์โทรศัพท์</th>
            <th>email</th>
            <th>มีกระติกน้ำหรือไม่</th>
            <th>ขนาดเสื้อ</th>
            <th>กรุ๊ปของนิสิต</th>
            <th>ปัญหาสุขภาพ</th>
          </tr>
          {pees.map((user: ShowMember, i) => (
            <tr style={{ border: "solid", borderColor: "#373737" }} key={i}>
              <td>{user.nickname}</td>
              <td>{user.name}</td>
              <td>{user.lastname}</td>
              <td>{user.gender}</td>
              <td>{user.sleep ? <>ค้างคืน</> : <>ไม่ค้างคืน</>} </td>
              <td>{user._id.toString()}</td>
              <td>{user.studentId}</td>
              <td>{user.tel}</td>
              <td>{user.email}</td>
              <td>{user.haveBottle.toString()}</td>
              <td>{user.shirtSize}</td>
              <td>{user.group}</td>
              {user.healthIssueId ? (
                <td
                  onClick={() => {
                    router.push(
                      `/healthIssue/${user.healthIssueId?.toString()}`
                    );
                  }}
                >
                  {user.healthIssueId.toString()}
                </td>
              ) : (
                <td> null</td>
              )}
            </tr>
          ))}
        </table>
      </div>
      <FinishButton text={downloadText} onClick={peeDownload.onDownload} />
      <div>
        <div
          className="text-4xl font-bold"
          style={{
            color: "#373737",
            marginTop: "30px",
            marginBottom: "10px",
          }}
        >
          รายชื่อปีโตฝ่าย{part.partName}
        </div>
        <table ref={petoRef}>
          <tr style={{ border: "solid", borderColor: "#373737" }}>
            <th>ชือเล่น</th>
            <th>ชื่อจริง</th>
            <th>นามสกุล</th>
            <th>เพศ</th>
            <th>ค้างคืนหรือไม่</th>
            <th>id</th>
            <th>รหัสประจำตัวนิสิต</th>
            <th>เบอร์โทรศัพท์</th>
            <th>email</th>
            <th>มีกระติกน้ำหรือไม่</th>
            <th>ขนาดเสื้อ</th>
            <th>กรุ๊ปของนิสิต</th>
            <th>ปัญหาสุขภาพ</th>
          </tr>
          {petos.map((user: ShowMember, i) => (
            <tr style={{ border: "solid", borderColor: "#373737" }} key={i}>
              <td>{user.nickname}</td>
              <td>{user.name}</td>
              <td>{user.lastname}</td>
              <td>{user.gender}</td>
              <td>{user.sleep ? <>ค้างคืน</> : <>ไม่ค้างคืน</>} </td>
              <td>{user._id.toString()}</td>
              <td>{user.studentId}</td>
              <td>{user.tel}</td>
              <td>{user.email}</td>
              <td>{user.haveBottle.toString()}</td>
              <td>{user.shirtSize}</td>
              <td>{user.group}</td>
              {user.healthIssueId ? (
                <td
                  onClick={() => {
                    router.push(
                      `/healthIssue/${user.healthIssueId?.toString()}`
                    );
                  }}
                >
                  {user.healthIssueId.toString()}
                </td>
              ) : (
                <td> null</td>
              )}
            </tr>
          ))}
        </table>
      </div>
      <FinishButton text={downloadText} onClick={petoDownload.onDownload} />
      <div
        className="w-[80%] items-center] p-10 rounded-3xl "
        style={{
          backgroundColor: "#961A1D",
          marginLeft: "10%",
          marginTop: "10px",
        }}
      >
        <div className=" rounded-lg ">
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
              value={start}
              onChange={(newValue) => {
                setStart(newValue);
              }}
            />
            <div
              style={{
                height: "10px",
              }}
            ></div>
          </LocalizationProvider>
        </div>
        <div className=" rounded-lg ">
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
              value={end}
              onChange={(newValue) => {
                setEnd(newValue);
              }}
            />
            <div
              style={{
                height: "10px",
              }}
            ></div>
          </LocalizationProvider>
        </div>
        <FinishButton
          text={"add"}
          onClick={() => {
            setPlaces((previous) => [...previous, null]);
          }}
        />
        <FinishButton
          text={"remove"}
          onClick={() => {
            setPlaces(removeElementInUseStateArray);
          }}
        />
        {places.map((v, i) => (
          <PlaceSelect
            key={i}
            place={v}
            onClick={setMap(setPlaces, modifyElementInUseStateArray(i))}
            buildingText={`ตึกที่${i + 1}`}
            placeText={`ชั้นและห้องที่${i + 1}`}
            allPlaceData={allPlaceData}
          />
        ))}
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            ทำอะไร กริยาขึ้นก่อน
          </label>
          <TextField
            name="Tel"
            id="Tel"
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
            onChange={setTextToString(setAction)}
            value={action}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">รายละเอียด</label>
          <TextField
            name="Email"
            id="Email"
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
            onChange={setTextToString(setBody, true)}
          />
        </div>
        <SelectTemplate
          mapIn={maps}
          select={(headId) => {
            if (headId && body && action && start && end) {
              createActionPlan(
                {
                  action,
                  partId: part._id,
                  placeIds: places.map(getId).filter(notEmpty),
                  start: addTime(start, selectOffset),
                  end: addTime(end, selectOffset),
                  headId,
                  body,
                },
                session.user.token,
                socket
              );
            }
          }}
          buttonText={"สร้าง action plan"}
        />
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            +- action plan ล่าสุด {camp.actionPlanOffset} นาที
          </label>
          <TextField
            name="Email"
            id="Email"
            type="number"
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
            value={plus.toString()}
            onChange={setTextToInt(setPlus)}
          />
          <FinishButton
            text="+- action plan"
            onClick={() => {
              plusActionPlan({ campId: camp._id, plus }, session.user.token);
            }}
          />
        </div>
      </div>
      <div
        className="w-[80%] items-center  p-10 rounded-3xl "
        style={{
          backgroundColor: "#961A1D",
          marginLeft: "10%",
          marginTop: "10px",
        }}
      >
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">ทำอะไร</label>
          <TextField
            name="Tel"
            id="Tel"
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
            onChange={setTextToString(setName)}
            value={name}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">link</label>
          <TextField
            name="Email"
            id="Email"
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
            onChange={setTextToString(setLink)}
            value={link}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">รหัสผ่าน</label>
          <TextField
            name="Email"
            id="Email"
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
            onChange={setTextToString(setPassword, true)}
            value={password}
          />
        </div>
        <FinishButton
          text={"สร้างการทำงาน"}
          onClick={() => {
            if (name) {
              createWorkingItem(
                {
                  name,
                  link,
                  partId: part._id,
                  fromId: null,
                  password: password ? password : "null",
                },
                session.user.token,
                socket
              );
            }
          }}
        />
      </div>
    </main>
  );
}
