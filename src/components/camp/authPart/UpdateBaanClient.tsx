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
} from "@/components/utility/setup";
import updateBaan from "@/libs/admin/updateBaan";
import { TextField, Checkbox, Select, MenuItem } from "@mui/material";
import { useSession } from "next-auth/react";
import { useDownloadExcel } from "react-export-table-to-excel";
import {
  GetCoopData,
  AllPlaceData,
  InterPlace,
  JobGenderRequie,
  Id,
  jobGenderRequies,
} from "../../../../interface";
import BaanMembers from "../member/BaanMembers";
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
  const [reqType, setReqType] = React.useState<JobGenderRequie>("ไม่กำหนด");
  const [male, setMale] = React.useState(0);
  const [female, setFemale] = React.useState(0);
  const [sum, setSum] = React.useState(0);
  const [jobId, setJobId] = React.useState<Id | null>(null);
  const [canReadMirror, setCanReadMirror] = React.useState(
    coopData.baan.canReadMirror
  );
  const [canWhriteMirror, setCanWhriteMirror] = React.useState(
    coopData.baan.canWhriteMirror
  );
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
              checked={nongSendMessage}
            />
          </div>
          <div className="flex flex-row items-center my-5">
            <label className="w-2/5 text-2xl text-white">
              อนุญาตให้เขียน mirror หรือไม่
            </label>
            <Checkbox
              onChange={setBoolean(setCanWhriteMirror)}
              sx={{
                "&.Mui-checked": {
                  color: "#FFFFFF", // Custom color when checked
                },
              }}
              checked={canWhriteMirror}
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
                      canWhriteMirror,
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
                <td>{coopData.camp.nongCall}</td>
                <td>{health.heathIssue.extra}</td>
                <td>{health.heathIssue.chronicDisease}</td>
                {highMode ? (
                  <td>{health.heathIssue.isWearing ? "ใส่" : "ไม่ใส่"}</td>
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
            {coopData.baanJobs.map((baanJob, i) => {
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
                        {jobGenderRequies.map((v, i) => (
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
                            session.user.token
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
                            session.user.token
                          );
                        }}
                      />
                      <FinishButton
                        text="delete"
                        onClick={() => {
                          deleteBaanJob(baanJob._id, session.user.token);
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
                    {jobGenderRequies.map((v, i) => (
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
                        session.user.token
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
      />
    </>
  );
}
