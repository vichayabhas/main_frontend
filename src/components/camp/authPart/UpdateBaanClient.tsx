"use client";
import React from "react";
import UserNameTable from "../../utility/UserNameTable";
import updateJobAssign from "@/libs/camp/updateJobAssign";
import createJob from "@/libs/camp/createJob";
import deleteBaanJob from "@/libs/camp/deleteBaanJob";
import PlaceSelect from "@/components/randomthing/PlaceSelect";
import BackToHome from "@/components/utility/BackToHome";
import FinishButton from "@/components/utility/FinishButton";
import {
  setTextToString,
  setBoolean,
  peeLookupNong,
  downloadText,
  setTextToInt,
  getBackendUrl,
  SocketReady,
  SetUpMiddleDownPack,
} from "@/components/utility/setup";
import updateBaan from "@/libs/admin/updateBaan";
import { TextField, Checkbox, Select, MenuItem } from "@mui/material";
import { useSession } from "next-auth/react";
import { useDownloadExcel } from "react-export-table-to-excel";
import {
  GetCoopData,
  AllPlaceData,
  InterPlace,
  JobGenderRequire,
  Id,
  jobGenderRequires,
  UpdateBaanOut,
  BasicBaan,
  ShowPlace,
  BasicUser,
  HealthIssueBody,
} from "../../../../interface";
import BaanMembers from "../member/components/baan/BaanMembers";
import { io, Socket } from "socket.io-client";
import { getShowPlaceFromInterPlace } from "@/components/randomthing/placeSetUp";
import { RealTimeBaanJob } from "../member/components/general/setup";
const socket = io(getBackendUrl());

export class RealTimeBaan {
  private socket: SocketReady<UpdateBaanOut>;
  private setBoy: React.Dispatch<React.SetStateAction<ShowPlace | null>>;
  private setGirl: React.Dispatch<React.SetStateAction<ShowPlace | null>>;
  private setNormal: React.Dispatch<React.SetStateAction<ShowPlace | null>>;
  private setBaan: React.Dispatch<React.SetStateAction<BasicBaan>>;
  private allPlaceData: AllPlaceData;
  constructor(
    baanId: Id,
    socket: Socket,
    setBoy: React.Dispatch<React.SetStateAction<ShowPlace | null>>,
    setGirl: React.Dispatch<React.SetStateAction<ShowPlace | null>>,
    setNormal: React.Dispatch<React.SetStateAction<ShowPlace | null>>,
    setBaan: React.Dispatch<React.SetStateAction<BasicBaan>>,
    allPlaceData: AllPlaceData
  ) {
    this.socket = new SocketReady<UpdateBaanOut>(socket, "updateBaan", baanId);
    this.setBoy = setBoy;
    this.setGirl = setGirl;
    this.setNormal = setNormal;
    this.setBaan = setBaan;
    this.allPlaceData = allPlaceData;
  }
  public listen() {
    this.socket.listen((event) => {
      this.setBaan(event.baan);
      this.setBoy(getShowPlaceFromInterPlace(event.boy, this.allPlaceData));
      this.setGirl(getShowPlaceFromInterPlace(event.girl, this.allPlaceData));
      this.setNormal(
        getShowPlaceFromInterPlace(event.normal, this.allPlaceData)
      );
    });
  }
  public disconnect() {
    this.socket.disconnect();
  }
}
export class RealTimeBasicBaan {
  private socket: SocketReady<UpdateBaanOut>;
  private setBaan: React.Dispatch<React.SetStateAction<BasicBaan>>;
  constructor(
    baanId: Id,
    socket: Socket,
    setBaan: React.Dispatch<React.SetStateAction<BasicBaan>>
  ) {
    this.socket = new SocketReady<UpdateBaanOut>(socket, "updateBaan", baanId);
    this.setBaan = setBaan;
  }
  public listen() {
    this.socket.listen((event) => {
      this.setBaan(event.baan);
    });
  }
  public disconnect() {
    this.socket.disconnect();
  }
}
export default function UpdateBaanClient({
  coopData,
  allPlaceData,
  user,
  token,
  healthIssue,
}: {
  coopData: GetCoopData;
  allPlaceData: AllPlaceData;
  user: BasicUser;
  token: string;
  healthIssue: HealthIssueBody;
}) {
  // dispatch = useDispatch<AppDispatch>();
  //const update = useAppSelector((state) => state.bookSlice.bookItem);
  const { data: session } = useSession();
  const [boy, setBoy] = React.useState<InterPlace | null>(coopData.boy);
  const [girl, setGirl] = React.useState<InterPlace | null>(coopData.girl);
  const [normal, setNormal] = React.useState<InterPlace | null>(
    coopData.normal
  );
  const [name, setName] = React.useState<string>(coopData.baan.name);
  const [fullName, setFullName] = React.useState<string | null>(
    coopData.baan.fullName
  );
  const [link, setLink] = React.useState<string | null>(coopData.baan.link);
  const [nongSendMessage, setNongSendMessage] = React.useState<boolean>(
    coopData.baan.nongSendMessage
  );
  const [highMode, setHighMode] = React.useState(false);
  const [jobName, setJobName] = React.useState("");
  const [reqType, setReqType] = React.useState<JobGenderRequire>("ไม่กำหนด");
  const [male, setMale] = React.useState(0);
  const [female, setFemale] = React.useState(0);
  const [sum, setSum] = React.useState(0);
  const [jobId, setJobId] = React.useState<Id | null>(null);
  const [canReadMirror, setCanReadMirror] = React.useState(
    coopData.baan.canReadMirror
  );
  const [canWriteMirror, setCanWriteMirror] = React.useState(
    coopData.baan.canWriteMirror
  );
  const [baanJobs, setBaanJobs] = React.useState(coopData.baanJobs);
  const [canNongSeeJobData, setCanNongSeeJobData] = React.useState(
    coopData.baan.canNongSeeJobData
  );
  const nongPack = React.useState(
    SetUpMiddleDownPack.init(
      coopData.baan.canNongSeeNongExtra,
      coopData.baan.canPeeSeeAdvanceNongData,
      coopData.baan.canNongSeeAdvanceNongData
    )
  );
  const {
    up: canNongSeeNongExtra,
    down: canNongSeeAdvanceNongData,
    setUp: setCanNongSeeNongExtra,
    setDown: setCanNongSeeAdvanceNongData,
    middle: canPeeSeeAdvanceNongData,
    setMiddle: setCanPeeSeeAdvanceNongData,
  } = new SetUpMiddleDownPack(nongPack);
  const peePack = React.useState(
    SetUpMiddleDownPack.init(
      coopData.baan.canNongSeePeeExtra,
      coopData.baan.canPeeSeeAdvanceNongData,
      coopData.baan.canNongSeeAdvancePeeData
    )
  );
  const {
    up: canNongSeePeeExtra,
    down: canNongSeeAdvancePeeData,
    setUp: setCanNongSeePeeExtra,
    setDown: setCanNongSeeAdvancePeeData,
    middle: canPeeSeeAdvancePeeData,
    setMiddle: setCanPeeSeeAdvancePeeData,
  } = new SetUpMiddleDownPack(peePack);
  const realTimeBaanJob = new RealTimeBaanJob(coopData.baan._id, socket);
  const updateBaanSocket = new SocketReady<UpdateBaanOut>(
    socket,
    "updateBaan",
    coopData.baan._id
  );
  React.useEffect(() => {
    updateBaanSocket.listen((data) => {
      setBoy(data.boy);
      setGirl(data.girl);
      setNormal(data.normal);
      setName(data.baan.name);
      setFullName(data.baan.fullName);
      setLink(data.baan.link);
      setNongSendMessage(data.baan.nongSendMessage);
      setCanReadMirror(data.baan.canReadMirror);
      setCanWriteMirror(data.baan.canWriteMirror);
      setCanNongSeeAdvanceNongData(data.baan.canNongSeeAdvanceNongData);
      setCanNongSeeAdvancePeeData(data.baan.canNongSeeAdvancePeeData);
      setCanNongSeeJobData(data.baan.canNongSeeJobData);
      setCanNongSeeNongExtra(data.baan.canNongSeeNongExtra);
      setCanNongSeePeeExtra(data.baan.canNongSeePeeExtra);
      setCanPeeSeeAdvanceNongData(data.baan.canPeeSeeAdvanceNongData);
      setCanPeeSeeAdvancePeeData(data.baan.canPeeSeeAdvancePeeData);
    });
    realTimeBaanJob.listen(setBaanJobs);
    return () => {
      updateBaanSocket.disconnect();
      realTimeBaanJob.disconnect();
    };
  });

  if (!session) {
    return <BackToHome />;
  }
  const memberRef = React.useRef(null);
  const jobRef = React.useRef(null);
  const memberDownload = useDownloadExcel({
    currentTableRef: memberRef.current,
    filename: `รายชื่อ${coopData.camp.groupName}${coopData.baan.name}`,
  });
  const jobDownload = useDownloadExcel({
    currentTableRef: jobRef.current,
    filename: `งานทั้งหมดของ${coopData.camp.groupName}${coopData.baan.name}`,
  });
  return (
    <>
      <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
        <div className="text-4xl font-medium">Update บ้าน </div>
        <div className="w-[30%] items-center bg-slate-600 p-10 rounded-3xl shadow-[25px_25px_40px_-10px_rgba(0,0,0,0.7)]">
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
              อนุญาตให้{coopData.camp.nongCall}ส่งข้อขวามในห้องบ้านหรือไม่
            </label>
            <Checkbox
              onChange={setBoolean(setNongSendMessage)}
              sx={{
                "&.Mui-checked": {
                  color: "#FFFFFF", // Custom color when checked
                },
              }}
              checked={nongSendMessage}
            />
          </div>
          <div className="flex flex-row items-center my-5">
            <label className="w-2/5 text-2xl text-white">
              อนุญาตให้เขียน mirror หรือไม่
            </label>
            <Checkbox
              onChange={setBoolean(setCanWriteMirror)}
              sx={{
                "&.Mui-checked": {
                  color: "#FFFFFF", // Custom color when checked
                },
              }}
              checked={canWriteMirror}
            />
          </div>
          <div className="flex flex-row items-center my-5">
            <label className="w-2/5 text-2xl text-white">
              อนุญาตให้อ่าน mirror หรือไม่
            </label>
            <Checkbox
              onChange={setBoolean(setCanReadMirror)}
              sx={{
                "&.Mui-checked": {
                  color: "#FFFFFF", // Custom color when checked
                },
              }}
              checked={canReadMirror}
            />
          </div>
          <div className="flex flex-row items-center my-5">
            <label className="w-2/5 text-2xl text-white">
              อนุญาต{coopData.camp.nongCall}อ่านหมายเหตุของ
              {coopData.camp.nongCall}หรือไม่
            </label>
            <Checkbox
              onChange={setBoolean(setCanNongSeeNongExtra)}
              sx={{
                "&.Mui-checked": {
                  color: "#FFFFFF", // Custom color when checked
                },
              }}
              checked={canNongSeeNongExtra}
            />
          </div>
          <div className="flex flex-row items-center my-5">
            <label className="w-2/5 text-2xl text-white">
              อนุญาต{coopData.camp.nongCall}อ่านหมายเหตุของพี่
              {coopData.camp.groupName}หรือไม่
            </label>
            <Checkbox
              onChange={setBoolean(setCanNongSeePeeExtra)}
              sx={{
                "&.Mui-checked": {
                  color: "#FFFFFF", // Custom color when checked
                },
              }}
              checked={canNongSeePeeExtra}
            />
          </div>

          <div className="flex flex-row items-center my-5">
            <label className="w-2/5 text-2xl text-white">
              อนุญาต{coopData.camp.nongCall}อ่านข้อมูลขั้นสูงของ
              {coopData.camp.nongCall}หรือไม่
            </label>
            <Checkbox
              onChange={setBoolean(setCanNongSeeAdvanceNongData)}
              sx={{
                "&.Mui-checked": {
                  color: "#FFFFFF", // Custom color when checked
                },
              }}
              checked={canNongSeeAdvanceNongData}
            />
          </div>
          <div className="flex flex-row items-center my-5">
            <label className="w-2/5 text-2xl text-white">
              อนุญาต{coopData.camp.nongCall}อ่านข้อมูลขั้นสูงของพี่
              {coopData.camp.groupName}หรือไม่
            </label>
            <Checkbox
              onChange={setBoolean(setCanNongSeeAdvancePeeData)}
              sx={{
                "&.Mui-checked": {
                  color: "#FFFFFF", // Custom color when checked
                },
              }}
              checked={canNongSeeAdvancePeeData}
            />
          </div>

          <div className="flex flex-row items-center my-5">
            <label className="w-2/5 text-2xl text-white">
              อนุญาตพี่{coopData.camp.groupName}อ่านข้อมูลขั้นสูงของ
              {coopData.camp.nongCall}หรือไม่
            </label>
            <Checkbox
              onChange={setBoolean(setCanPeeSeeAdvanceNongData)}
              sx={{
                "&.Mui-checked": {
                  color: "#FFFFFF", // Custom color when checked
                },
              }}
              checked={canPeeSeeAdvanceNongData}
            />
          </div>
          <div className="flex flex-row items-center my-5">
            <label className="w-2/5 text-2xl text-white">
              อนุญาตพี่{coopData.camp.groupName}อ่านข้อมูลขั้นสูงของพี่
              {coopData.camp.groupName}หรือไม่
            </label>
            <Checkbox
              onChange={setBoolean(setCanPeeSeeAdvancePeeData)}
              sx={{
                "&.Mui-checked": {
                  color: "#FFFFFF", // Custom color when checked
                },
              }}
              checked={canPeeSeeAdvancePeeData}
            />
          </div>
          <div className="flex flex-row items-center my-5">
            <label className="w-2/5 text-2xl text-white">
              อนุญาต{coopData.camp.nongCall}อ่านข้อมูลงานของพี่
              {coopData.camp.groupName}หรือไม่
            </label>
            <Checkbox
              onChange={setBoolean(setCanNongSeeAdvanceNongData)}
              sx={{
                "&.Mui-checked": {
                  color: "#FFFFFF", // Custom color when checked
                },
              }}
              checked={canNongSeeAdvanceNongData}
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
                      canReadMirror,
                      canWriteMirror,
                      canNongSeeAdvanceNongData,
                      canNongSeeAdvancePeeData,
                      canNongSeeJobData,
                      canNongSeeNongExtra,
                      canNongSeePeeExtra,
                      canPeeSeeAdvanceNongData,
                      canPeeSeeAdvancePeeData,
                    },
                    session.user.token,
                    updateBaanSocket
                  );
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              update all
            </button>
          </div>
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">ดูข้อมูลขั้นสูง</label>
          <Checkbox
            onChange={setBoolean(setHighMode)}
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            checked={highMode}
          />
        </div>
        <table ref={memberRef}>
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
                <td>{health.healthIssue.extra}</td>
                <td>{health.healthIssue.chronicDisease}</td>
                {highMode ? (
                  <td>{health.healthIssue.isWearing ? "ใส่" : "ไม่ใส่"}</td>
                ) : null}
              </tr>
            )),
            coopData.nongHealths.map((health, i) => (
              <tr key={i}>
                <td>{health.user.nickname}</td>
                <td>{health.user.name}</td>
                <td>{health.user.lastname}</td>
                <td>{coopData.camp.nongCall}</td>
                <td>{health.healthIssue.extra}</td>
                <td>{health.healthIssue.chronicDisease}</td>
                {highMode ? (
                  <td>{health.healthIssue.isWearing ? "ใส่" : "ไม่ใส่"}</td>
                ) : null}
              </tr>
            ))
          )}
        </table>
        <FinishButton text={downloadText} onClick={memberDownload.onDownload} />
        <div
          className="w-[100%] items-center p-10 rounded-3xl "
          style={{
            backgroundColor: "#961A1D",
            width: "70%",
            marginTop: "20px",
          }}
        >
          <table ref={jobRef}>
            <tr>
              <th>ชื่องาน</th>
              <th>จำนวนผู้ชาย</th>
              <th>จำนวนผู้หญิง</th>
              <th>จำนวนรวม</th>
              <th>รูปแบบการรับ</th>
              <th>ผู้ชายที่ผ่าน</th>
              <th>ผู้หญิงที่ผ่าน</th>
              <th>action</th>
              <th>ผู้ชายไม่ที่ผ่าน</th>
              <th>ผู้หญิงไม่ที่ผ่าน</th>
            </tr>
            {baanJobs.map((baanJob, i) => {
              if (baanJob._id.toString() == jobId?.toString()) {
                return (
                  <tr key={i}>
                    <td>
                      <TextField
                        name="Email"
                        id="Email"
                        className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
                        onChange={setTextToString(setJobName)}
                        value={jobName}
                      />
                    </td>
                    <td>
                      <TextField
                        name="Email"
                        id="Email"
                        className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
                        onChange={setTextToInt((input) => {
                          setMale(input);
                          setSum(female + input);
                        })}
                        value={male.toString()}
                      />
                    </td>
                    <td>
                      <TextField
                        name="Email"
                        id="Email"
                        className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
                        onChange={setTextToInt((input) => {
                          setFemale(input);
                          setSum(male + input);
                        })}
                        value={female.toString()}
                      />
                    </td>
                    <td>
                      <TextField
                        name="Email"
                        id="Email"
                        className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
                        onChange={setTextToInt((input) => {
                          setMale(0);
                          setFemale(0);
                          setSum(input);
                        })}
                        value={sum.toString()}
                      />
                    </td>
                    <td>
                      <Select
                        variant="standard"
                        name="location"
                        id="location"
                        className="h-[2em] w-[200px]"
                        renderValue={() => reqType}
                        style={{
                          color: "white",
                        }}
                        value={reqType}
                      >
                        {jobGenderRequires.map((v, i) => (
                          <MenuItem key={i} onClick={() => setReqType(v)}>
                            {v}
                          </MenuItem>
                        ))}
                      </Select>
                    </td>
                    <td>
                      <UserNameTable inputs={baanJob.passMales} />
                    </td>
                    <td>
                      <UserNameTable inputs={baanJob.passFemales} />
                    </td>
                    <td>
                      <FinishButton
                        text="update"
                        onClick={() => {
                          updateJobAssign(
                            {
                              reqType,
                              _id: jobId,
                              male,
                              female,
                              sum,
                              name: jobName,
                              types: "baan",
                            },
                            session.user.token,
                            socket
                          );
                        }}
                      />
                      <FinishButton
                        text="create new"
                        onClick={() => {
                          createJob(
                            {
                              reqType,
                              male,
                              female,
                              sum,
                              name: jobName,
                              types: "baan",
                              refId: coopData.camp._id,
                            },
                            session.user.token,
                            socket
                          );
                        }}
                      />
                      <FinishButton
                        text="delete"
                        onClick={() => {
                          deleteBaanJob(
                            baanJob._id,
                            session.user.token,
                            socket
                          );
                        }}
                      />
                    </td>
                    <td>
                      <UserNameTable inputs={baanJob.failMales} />
                    </td>
                    <td>
                      <UserNameTable inputs={baanJob.failFemales} />
                    </td>
                  </tr>
                );
              } else {
                return (
                  <tr key={i}>
                    <td>{baanJob.name}</td>
                    <td>{baanJob.male}</td>
                    <td>{baanJob.female}</td>
                    <td>{baanJob.sum}</td>
                    <td>{baanJob.reqType}</td>
                    <td>
                      <UserNameTable inputs={baanJob.passMales} />
                    </td>
                    <td>
                      <UserNameTable inputs={baanJob.passFemales} />
                    </td>
                    <td>
                      <FinishButton
                        text="select"
                        onClick={() => {
                          setJobId(baanJob._id);
                          setMale(baanJob.male);
                          setFemale(baanJob.female);
                          setSum(baanJob.sum);
                          setJobName(baanJob.name);
                          setReqType(baanJob.reqType);
                        }}
                      />
                    </td>
                    <td>
                      <UserNameTable inputs={baanJob.failMales} />
                    </td>
                    <td>
                      <UserNameTable inputs={baanJob.failFemales} />
                    </td>
                  </tr>
                );
              }
            })}
            {jobId ? (
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <FinishButton text="select" onClick={() => setJobId(null)} />
                </td>
                <td></td>
                <td></td>
              </tr>
            ) : (
              <tr>
                <td>
                  <TextField
                    name="Email"
                    id="Email"
                    className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
                    onChange={setTextToString(setJobName)}
                    value={jobName}
                  />
                </td>
                <td>
                  <TextField
                    name="Email"
                    id="Email"
                    className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
                    onChange={setTextToInt((input) => {
                      setMale(input);
                      setSum(female + input);
                    })}
                    value={male.toString()}
                  />
                </td>
                <td>
                  <TextField
                    name="Email"
                    id="Email"
                    className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
                    onChange={setTextToInt((input) => {
                      setFemale(input);
                      setSum(male + input);
                    })}
                    value={female.toString()}
                  />
                </td>
                <td>
                  <TextField
                    name="Email"
                    id="Email"
                    className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
                    onChange={setTextToInt((input) => {
                      setMale(0);
                      setFemale(0);
                      setSum(input);
                    })}
                    value={sum.toString()}
                  />
                </td>
                <td>
                  <Select
                    variant="standard"
                    name="location"
                    id="location"
                    className="h-[2em] w-[200px]"
                    renderValue={() => reqType}
                    style={{
                      color: "white",
                    }}
                    value={reqType}
                  >
                    {jobGenderRequires.map((v, i) => (
                      <MenuItem key={i} onClick={() => setReqType(v)}>
                        {v}
                      </MenuItem>
                    ))}
                  </Select>
                </td>
                <td></td>
                <td></td>
                <td>
                  <FinishButton
                    text="create new"
                    onClick={() => {
                      createJob(
                        {
                          reqType,
                          male,
                          female,
                          sum,
                          name: jobName,
                          types: "baan",
                          refId: coopData.camp._id,
                        },
                        session.user.token,
                        socket
                      );
                    }}
                  />
                </td>
                <td></td>
                <td></td>
              </tr>
            )}
          </table>
          <FinishButton text={downloadText} onClick={jobDownload.onDownload} />
        </div>
      </div>
      <BaanMembers
        pees={coopData.pees}
        nongs={coopData.nongs}
        baan={coopData.baan}
        camp={coopData.camp}
        campRole="pee"
        user={user}
        token={token}
        healthIssue={healthIssue}
      />
    </>
  );
}
