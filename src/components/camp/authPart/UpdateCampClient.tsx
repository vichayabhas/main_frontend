"use client";

import AllInOneLock from "@/components/utility/AllInOneLock";
import FinishButton from "@/components/utility/FinishButton";
import SelectTemplate from "@/components/utility/SelectTemplate";
import {
  SetUpMiddleDownPack,
  setTextToString,
  setMap,
  modifyElementInUseStateArray,
  removeElementInUseStateArray,
  setBoolean,
  modifyElementInUseStateArray2Dimension,
  notEmpty,
  SocketReady,
  getBackendUrl,
} from "@/components/utility/setup";
import TypingImageSource from "@/components/utility/TypingImageSource";
import addBaan from "@/libs/admin/addBaan";
import addPart from "@/libs/admin/addPart";
import createBaanByGroup from "@/libs/admin/createBaanByGroup";
import saveDeleteCamp from "@/libs/admin/saveDeleteCamp";
import updateCamp from "@/libs/admin/updateCamp";
import { TextField, Checkbox } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import React from "react";
import {
  BasicCamp,
  BasicPart,
  authTypes,
  Id,
  GetCampForUpdate,
  UpdateCampOut,
} from "../../../../interface";
import { io, Socket } from "socket.io-client";

const socket = io(getBackendUrl());
interface RealTimeAuthPart {
  i: number;
  j: number;
  check: boolean;
}

export class RealTimeCamp {
  private room: string;
  private socket: SocketReady<UpdateCampOut>;
  constructor(campId: Id, socket: Socket) {
    this.room = campId.toString();
    this.socket = new SocketReady<UpdateCampOut>(socket, "updateCamp");
  }
  public listen(setCamp: React.Dispatch<React.SetStateAction<BasicCamp>>) {
    this.socket.listen(this.room, (event) => {
      setCamp(event.camp);
    });
  }
  public disconect() {
    this.socket.disconect();
  }
}
export default function UpdateCampClient({
  token,
  data,
}: {
  data: GetCampForUpdate;
  token: string;
}) {
  const [camp, setCamp] = React.useState(data.camp);
  const [parts, setParts] = React.useState(data.parts);
  const router = useRouter();
  const [newBaanName, setNewBaanName] = React.useState<string | null>(null);
  const [registerSheetLink, setRegisterSheetLink] = React.useState<
    string | null
  >(camp.registerSheetLink);
  const [link, setLink] = React.useState<string | null>(camp.link);
  const pictureUrls = React.useState<(string | null)[]>(camp.pictureUrls);
  const [logoUrl, setLogoUrl] = React.useState<string | null>(camp.logoUrl);
  const [nongDataLock, setDataLock] = React.useState<boolean>(
    camp.nongDataLock
  );
  const [peeLock, setPeeLock] = React.useState<boolean>(!camp.peeLock);
  const [lockChangePickup, setLockChangePickup] = React.useState<boolean>(
    camp.lockChangePickup
  );
  const [allDone, setAllDone] = React.useState<boolean>(camp.allDone);
  const [dateStart, setDateStart] = React.useState<Dayjs | null>(
    dayjs(camp.dateStart)
  );
  const [dateEnd, setDateEnd] = React.useState<Dayjs | null>(
    dayjs(camp.dateEnd)
  );
  const [groupName, setGroupName] = React.useState<string>(camp.groupName);
  const [peeDataLock, setPeeDataLock] = React.useState<boolean>(
    camp.peeDataLock
  );
  const [petoDataLock, setPetoDataLock] = React.useState<boolean>(
    camp.petoDataLock
  );
  const [haveCloth, setHaveCloth] = React.useState<boolean>(camp.haveCloth);
  const [showCorrectAnswerAndScore, setShowCorrectAnswerAndScore] =
    React.useState(camp.showCorrectAnswerAndScore);
  const {
    up: lockChangeQuestion,
    middle: canAnswerTheQuestion,
    down: open,
    setUp: setLockChangeQuestion,
    setMiddle: setCanAnswerTheQuestion,
    setDown: setOpen,
  } = new SetUpMiddleDownPack(
    React.useState(
      SetUpMiddleDownPack.init(
        camp.lockChangeQuestion,
        camp.canAnswerTheQuestion,
        camp.open
      )
    )
  );
  const [canNongSeeAllAnswer, setCanNongSeeAllAnswer] = React.useState(
    camp.canNongSeeAllAnswer
  );
  const [canNongSeeAllActionPlan, setCanNongSeeAllActionPlan] = React.useState(
    camp.canNongSeeAllActionPlan
  );
  const [canNongSeeAllTrackingSheet, setCanNongSeeAllTrackingSheet] =
    React.useState(camp.canNongSeeAllTrackingSheet);
  const [canNongAccessDataWithRoleNong, setCanNongAccessDataWithRoleNong] =
    React.useState(camp.canNongAccessDataWithRoleNong);
  const [arrayOfAuthPartList, setArrayOfAuthPartList] = React.useState<
    boolean[][]
  >(parts.map((part) => authTypes.map((auth) => part.auths.includes(auth))));
  const [canReadTimeOnMirror, setCanReadTimeOnMirror] = React.useState(
    camp.canReadTimeOnMirror
  );
  const isHaveNongInGeneralRoleNong =
    camp.memberStructure == "nong->highSchool,pee->1year,peto->2upYear" ||
    camp.memberStructure == "nong->highSchool,pee->2upYear" ||
    camp.memberStructure == "nong->highSchool,pee->allYear";
  const [nongCall, setNongCall] = React.useState(camp.nongCall);
  function reset(newCampData: BasicCamp, newPartsData: BasicPart[]) {
    setCamp(newCampData);
    setParts(newPartsData);
    setRegisterSheetLink(newCampData.registerSheetLink);
    setLink(newCampData.link);
    pictureUrls[1](newCampData.pictureUrls);
    setLogoUrl(newCampData.logoUrl);
    setDataLock(newCampData.nongDataLock);
    setPeeLock(!newCampData.peeLock);
    setLockChangePickup(newCampData.lockChangePickup);
    setAllDone(newCampData.allDone);
    setDateStart(dayjs(newCampData.dateStart));
    setDateEnd(dayjs(newCampData.dateEnd));
    setGroupName(newCampData.groupName);
    setPeeDataLock(newCampData.peeDataLock);
    setPetoDataLock(newCampData.petoDataLock);
    setHaveCloth(newCampData.haveCloth);
    setShowCorrectAnswerAndScore(newCampData.showCorrectAnswerAndScore);
    setLockChangeQuestion(newCampData.lockChangeQuestion);
    setCanAnswerTheQuestion(newCampData.canAnswerTheQuestion);
    setOpen(newCampData.open);
    setCanNongSeeAllAnswer(newCampData.canNongSeeAllAnswer);
    setCanNongSeeAllActionPlan(newCampData.canNongSeeAllActionPlan);
    setCanNongSeeAllTrackingSheet(newCampData.canNongSeeAllTrackingSheet);
    setCanNongAccessDataWithRoleNong(newCampData.canNongAccessDataWithRoleNong);
    setArrayOfAuthPartList(
      newPartsData.map((part) =>
        authTypes.map((auth) => part.auths.includes(auth))
      )
    );
    setCanReadTimeOnMirror(newCampData.canReadTimeOnMirror);
    setNongCall(newCampData.nongCall);
  }
  const realTimeAuthPartSocket = new SocketReady<RealTimeAuthPart>(
    socket,
    "realTimeAuthPart"
  );
  const updateCampSocket = new SocketReady<UpdateCampOut>(socket, "updateCamp");
  const room = data.camp._id.toString();
  React.useEffect(() => {
    updateCampSocket.listen(room, (newData) => {
      reset(newData.camp, newData.parts);
    });
    realTimeAuthPartSocket.listen(room, ({ i, j, check }) => {
      setMap(
        setArrayOfAuthPartList,
        modifyElementInUseStateArray2Dimension(i, j)
      )(check);
    });
    return () => {
      updateCampSocket.disconect();
      realTimeAuthPartSocket.disconect();
    };
  });
  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      <div>บ้าน</div>
      {data.baans.map((baan, i) => {
        return (
          <div
            key={i}
            onClick={() => {
              router.push(`/admin/baan/${baan._id}`);
            }}
          >
            {baan.name}
          </div>
        );
      })}
      <div>ฝ่าย</div>
      {parts.map((part, i) => {
        return (
          <div
            key={i}
            onClick={() => {
              router.push(`/admin/part/${part._id}`);
            }}
          >
            {part.partName}
          </div>
        );
      })}
      <div
        className="text-4xl font-bold"
        style={{
          color: "#961A1D",
        }}
      >
        Update Camp
      </div>
      <div
        className="w-[30%] items-center p-10 rounded-3xl "
        style={{
          backgroundColor: "#961A1D",
          width: "70%",
          marginTop: "20px",
        }}
      >
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">ชื่อบ้านใหม่</label>
          <TextField
            name="Tel"
            id="Tel"
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
            onChange={setTextToString(setNewBaanName)}
            value={newBaanName}
          />
        </div>
        <FinishButton
          text="สร้างบ้านจากกรุ๊ป"
          onClick={() => {
            createBaanByGroup(camp._id, token);
          }}
        />
        <FinishButton
          text="สร้างบ้าน"
          onClick={() => {
            if (newBaanName) {
              addBaan(newBaanName, camp._id, token);
            }
          }}
        />
        <SelectTemplate
          mapIn={data.remainPartName}
          select={(e: Id) => {
            addPart(e, camp._id, token);
          }}
          buttonText="สร้างฝ่าย"
        />
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            link ใบสมัคร ถ้าไม่ต้องการให้ใส่ id ตามหลังให้ใส่ ~ ตามหลัง link
            ด้วย
          </label>
          <TextField
            name="Tel"
            id="Tel"
            type="url"
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
            onChange={setTextToString(setRegisterSheetLink)}
            value={registerSheetLink}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">link frontend รอง</label>
          <TextField
            name="Email"
            id="Email"
            type="url"
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
            onChange={setTextToString(setLink)}
            value={link}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">link รูปภาพ</label>
          {pictureUrls[0].map((pictureUrl, i) => (
            <div key={i}>
              <TypingImageSource
                onChange={setMap(
                  pictureUrls[1],
                  modifyElementInUseStateArray(i)
                )}
                defaultSrc={pictureUrl}
              />
            </div>
          ))}
        </div>
        <FinishButton
          text="add photo"
          onClick={() => {
            pictureUrls[1]([...pictureUrls[0], null]);
          }}
        />
        <FinishButton
          text="remove photo"
          onClick={() => {
            pictureUrls[1](removeElementInUseStateArray);
          }}
        />
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">link logo</label>
          <TypingImageSource defaultSrc={logoUrl} onChange={setLogoUrl} />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">คำเรียกชื่อกลุ่ม</label>
          <TextField
            name="Tel"
            id="Tel"
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
            onChange={setTextToString(setGroupName)}
            value={groupName}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            คำเรียกแทนน้องค่าย
          </label>
          <TextField
            name="Tel"
            id="Tel"
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
            onChange={setTextToString(setNongCall)}
            value={nongCall}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            ล็อกข้อมูลน้องหรือไม่
          </label>
          <Checkbox
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            onChange={setBoolean(setDataLock)}
            checked={nongDataLock}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            ล็อกข้อมูลพี่บ้านหรือไม่
          </label>
          <Checkbox
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            onChange={setBoolean(setPeeDataLock)}
            checked={peeDataLock}
          />
        </div>
        {camp.memberStructure ===
        "nong->highSchool,pee->1year,peto->2upYear" ? (
          <div className="flex flex-row items-center my-5">
            <label className="w-2/5 text-2xl text-white">
              ล็อกข้อมูลปีโตหรือไม่
            </label>
            <Checkbox
              sx={{
                "&.Mui-checked": {
                  color: "#FFFFFF", // Custom color when checked
                },
              }}
              onChange={setBoolean(setPetoDataLock)}
              checked={petoDataLock}
            />
          </div>
        ) : null}
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            เปิดให้{nongCall}ลงทะเบียนหรือไม่
          </label>
          <Checkbox
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            onChange={setBoolean(setOpen)}
            checked={open}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            เปิดให้พี่{groupName}ลงทะเบียนหรือไม่
          </label>
          <Checkbox
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            onChange={setBoolean(setPeeLock)}
            checked={peeLock}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">มีเสื้อแจกหรือไม่</label>
          <Checkbox
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            onChange={setBoolean(setHaveCloth)}
            checked={haveCloth}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            เปิดเฉลยและคะแนนหรือไม่
          </label>
          <Checkbox
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            onChange={setBoolean(setShowCorrectAnswerAndScore)}
            checked={showCorrectAnswerAndScore}
          />
        </div>
        <div className="flex flex-row justify-end"></div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            ล็อกข้อมูลการรับเสื้อของพี่บ้านหรือไม่
          </label>
          <Checkbox
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            onChange={(_e, state) => {
              setLockChangePickup(state);
            }}
            checked={lockChangePickup}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            เปิดให้ตอบคำถามหรือไม่
          </label>
          <Checkbox
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            onChange={setBoolean(setCanAnswerTheQuestion)}
            checked={canAnswerTheQuestion}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            ล็อกการเปลี่ยนโจทย์หรือไม่
          </label>
          <Checkbox
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            onChange={setBoolean(setLockChangeQuestion)}
            checked={lockChangeQuestion}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">ค่ายเสร็จหรือยัง</label>
          <Checkbox
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            onChange={setBoolean(setAllDone)}
            checked={allDone}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            อนุญาติให้ดูเวลาใน mirror
          </label>
          <Checkbox
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            onChange={setBoolean(setCanReadTimeOnMirror)}
            checked={canReadTimeOnMirror}
          />
        </div>
        <AllInOneLock token={token} bypass={camp.canNongAccessDataWithRoleNong}>
          <div className="flex flex-row items-center my-5">
            <label className="w-2/5 text-2xl text-white">
              อนุญาติให้{nongCall}ดูคำตอบทั้งหมดหรือไม่
            </label>
            <Checkbox
              sx={{
                "&.Mui-checked": {
                  color: "#FFFFFF", // Custom color when checked
                },
              }}
              onChange={setBoolean(setCanNongSeeAllAnswer)}
              checked={canAnswerTheQuestion}
            />
          </div>
          <div className="flex flex-row items-center my-5">
            <label className="w-2/5 text-2xl text-white">
              อนุญาติให้{nongCall}ดู action plan ทั้งหมดหรือไม่
            </label>
            <Checkbox
              sx={{
                "&.Mui-checked": {
                  color: "#FFFFFF", // Custom color when checked
                },
              }}
              onChange={setBoolean(setCanNongSeeAllActionPlan)}
              checked={canNongSeeAllActionPlan}
            />
          </div>
          <div className="flex flex-row items-center my-5">
            <label className="w-2/5 text-2xl text-white">
              อนุญาติให้{nongCall}ดู tracking sheet ทั้งหมดหรือไม่
            </label>
            <Checkbox
              sx={{
                "&.Mui-checked": {
                  color: "#FFFFFF", // Custom color when checked
                },
              }}
              onChange={setBoolean(setCanNongSeeAllTrackingSheet)}
              checked={canNongSeeAllTrackingSheet}
            />
          </div>
          {isHaveNongInGeneralRoleNong ? (
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-white">
                อนุญาติให้{nongCall}
                ดูข้อมูลค่ายเบื้องหลังโดยบทบาททั่วไปยังเป็นน้องหรือไม่
              </label>
              <Checkbox
                sx={{
                  "&.Mui-checked": {
                    color: "#FFFFFF", // Custom color when checked
                  },
                }}
                onChange={setBoolean((c) => {
                  setCanNongAccessDataWithRoleNong(
                    c && (canNongSeeAllActionPlan || canNongSeeAllTrackingSheet)
                  );
                })}
                checked={canNongAccessDataWithRoleNong}
              />
            </div>
          ) : null}
        </AllInOneLock>
        <div className=" rounded-lg ">
          <div
            style={{
              color: "white",
            }}
          >
            วันเริ่มค่าย
          </div>
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
        <div className=" rounded-lg ">
          <div
            style={{
              color: "white",
            }}
          >
            วันจบค่าย
          </div>
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
        <table>
          <tr>
            <th>ฝ่าย/ประเภท</th>
            {authTypes.map((authType, i) => (
              <th key={i}>{authType}</th>
            ))}
          </tr>
          {parts.map((part, i) => (
            <tr key={i}>
              <td>{part.partName}</td>
              {authTypes.map((authType, j) => (
                <td key={j}>
                  <Checkbox
                    onChange={setBoolean((check) => {
                      realTimeAuthPartSocket.trigger({ i, j, check }, room);
                    })}
                    checked={arrayOfAuthPartList[i][j]}
                  />
                </td>
              ))}
            </tr>
          ))}
        </table>
        <div className="flex flex-row justify-end">
          <button
            className="bg-white p-3 font-bold rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
            style={{
              color: "#961A1D",
            }}
            onClick={async () => {
              if (dateStart && dateEnd && dateStart.isBefore(dateEnd)) {
                try {
                  await updateCamp(
                    {
                      link,
                      lockChangePickup,
                      logoUrl,
                      peeLock: !peeLock,
                      nongDataLock,
                      dateEnd: dateEnd.toDate(),
                      dateStart: dateStart.toDate(),
                      pictureUrls: pictureUrls[0].filter(notEmpty),
                      open,
                      allDone,
                      registerSheetLink,
                      groupName,
                      peeDataLock,
                      petoDataLock,
                      haveCloth,
                      showCorrectAnswerAndScore,
                      canAnswerTheQuestion,
                      canNongSeeAllAnswer,
                      canNongSeeAllActionPlan,
                      canNongSeeAllTrackingSheet,
                      canNongAccessDataWithRoleNong,
                      lockChangeQuestion,
                      updatePart: arrayOfAuthPartList.map((authParts, i) => ({
                        id: parts[i]._id,
                        auths: authParts
                          .map((authPart, j) =>
                            authPart ? authTypes[j] : null
                          )
                          .filter(notEmpty),
                      })),
                      canReadTimeOnMirror,
                      nongCall,
                    },
                    camp._id,
                    token,
                    updateCampSocket,
                    room
                  );
                } catch (error) {
                  console.log(error);
                }
              } else {
                alert("Please type in all the details!");
              }
            }}
          >
            update all
          </button>
          <FinishButton
            text="delete"
            onClick={() => saveDeleteCamp(camp._id, token)}
          />
        </div>
      </div>
    </div>
  );
}
