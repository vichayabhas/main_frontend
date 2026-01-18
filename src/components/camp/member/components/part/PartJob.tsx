"use client";
import React from "react";

import createJob from "@/libs/camp/createJob";
import updateJobAssign from "@/libs/camp/updateJobAssign";
import registerJob from "@/libs/camp/registerJob";
import deletePartJob from "@/libs/camp/deletePartJob";
import AllInOneLock from "@/components/utility/AllInOneLock";
import FinishButton from "@/components/utility/FinishButton";
import { useDownloadExcel } from "react-export-table-to-excel";
import { io } from "socket.io-client";
import {
  getBackendUrl,
  AddRemoveHigh,
  setTextToString,
  setTextToInt,
  downloadText,
} from "@/components/utility/setup";
import UserNameTable from "@/components/utility/UserNameTable";
import { TextField, Select, MenuItem, Checkbox } from "@mui/material";
import { Id } from "../../../../../../configTypes";
import {
  GetJob,
  BasicPart,
  BasicUser,
  JobGenderRequire,
  jobGenderRequires,
} from "../../../../../../interface";
import { RealTimePartJob, getFillTimeRegisterId } from "../general/setup";
const socket = io(getBackendUrl());
export default function PartJob({
  token,
  partJobs: PartJobIn,
  part,
  user,
  campMemberCardId,
}: {
  token: string;
  partJobs: GetJob[];
  part: BasicPart;
  user: BasicUser;
  campMemberCardId: Id;
}) {
  const [name, setName] = React.useState("");
  const [reqType, setReqType] = React.useState<JobGenderRequire>("ไม่กำหนด");
  const [male, setMale] = React.useState(0);
  const [female, setFemale] = React.useState(0);
  const [sum, setSum] = React.useState(0);
  const [jobId, setJobId] = React.useState<Id | null>(null);
  const [removeTimeRegisterIds, setRemoveTimeRegisterIds] = React.useState<
    Id[]
  >([]);
  const [addJobIds, setAddJobIds] = React.useState<Id[]>([]);
  const [partJobs, setPartJobs] = React.useState(PartJobIn);
  const realTimePartJob = new RealTimePartJob(part._id, socket);
  React.useEffect(() => {
    realTimePartJob.listen((data) =>
      setPartJobs(getFillTimeRegisterId(data, campMemberCardId))
    );
    return () => {
      realTimePartJob.disconnect();
    };
  });
  const ref = React.useRef(null);
  const download = useDownloadExcel({
    currentTableRef: ref.current,
    filename: `หน้าที่ของฝ่าย${part.partName}`,
  });
  const manageJobId = new AddRemoveHigh(
    addJobIds,
    setAddJobIds,
    removeTimeRegisterIds,
    setRemoveTimeRegisterIds
  );
  return (
    <AllInOneLock lock={user.mode == "nong"}>
      <div
        className="w-[100%] items-center p-10 rounded-3xl "
        style={{
          backgroundColor: "#961A1D",
          width: "70%",
          marginTop: "20px",
        }}
      >
        <table ref={ref}>
          <tr>
            <th>ชื่องาน</th>
            <th>จำนวนผู้ชาย</th>
            <th>จำนวนผู้หญิง</th>
            <th>จำนวนรวม</th>
            <th>รูปแบบการรับ</th>
            <th>select</th>
            <th>ผู้ชายที่ผ่าน</th>
            <th>ผู้หญิงที่ผ่าน</th>
            <th>action</th>
            <th>ผู้ชายไม่ที่ผ่าน</th>
            <th>ผู้หญิงไม่ที่ผ่าน</th>
          </tr>
          {partJobs.map((partJob, i) => {
            if (partJob._id.toString() == jobId?.toString()) {
              return (
                <tr key={i}>
                  <td>
                    <TextField
                      name="Email"
                      id="Email"
                      className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
                      onChange={setTextToString(setName)}
                      value={name}
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
                    <Checkbox
                      onChange={manageJobId.set(
                        partJob._id,
                        partJob.timeRegisterId
                      )}
                      checked={manageJobId.get(
                        partJob._id,
                        partJob.timeRegisterId
                      )}
                    />
                  </td>
                  <td>
                    <UserNameTable inputs={partJob.passMales} />
                  </td>
                  <td>
                    <UserNameTable inputs={partJob.passFemales} />
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
                            name: name,
                            types: "part",
                          },
                          token,
                          socket
                        );
                      }}
                    />
                    <FinishButton
                      text="delete"
                      onClick={() => {
                        deletePartJob(partJob._id, token, socket);
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
                            name: name,
                            types: "part",
                            refId: part._id,
                          },
                          token,
                          socket
                        );
                      }}
                    />
                  </td>
                  <td>
                    <UserNameTable inputs={partJob.failMales} />
                  </td>
                  <td>
                    <UserNameTable inputs={partJob.failFemales} />
                  </td>
                </tr>
              );
            } else {
              return (
                <tr key={i}>
                  <td>{partJob.name}</td>
                  <td>{partJob.male}</td>
                  <td>{partJob.female}</td>
                  <td>{partJob.sum}</td>
                  <td>{partJob.reqType}</td>
                  <td>
                    <Checkbox
                      onChange={manageJobId.set(
                        partJob._id,
                        partJob.timeRegisterId
                      )}
                      checked={manageJobId.get(
                        partJob._id,
                        partJob.timeRegisterId
                      )}
                    />
                  </td>
                  <td>
                    <UserNameTable inputs={partJob.passMales} />
                  </td>
                  <td>
                    <UserNameTable inputs={partJob.passFemales} />
                  </td>
                  <td>
                    <FinishButton
                      text="select"
                      onClick={() => {
                        setJobId(partJob._id);
                        setMale(partJob.male);
                        setFemale(partJob.female);
                        setSum(partJob.sum);
                        setName(partJob.name);
                        setReqType(partJob.reqType);
                      }}
                    />
                  </td>
                  <td>
                    <UserNameTable inputs={partJob.failMales} />
                  </td>
                  <td>
                    <UserNameTable inputs={partJob.failFemales} />
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
                  onChange={setTextToString(setName)}
                  value={name}
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
                        name,
                        types: "part",
                        refId: part._id,
                      },
                      token,
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
        <FinishButton text={downloadText} onClick={download.onDownload} />
        <FinishButton
          text="register"
          onClick={() =>
            registerJob(
              {
                addJobIds,
                removeTimeRegisterIds,
                campMemberCardId,
                types: "part",
                fromId: part._id,
              },
              token,
              socket
            )
          }
        />
      </div>
    </AllInOneLock>
  );
}
