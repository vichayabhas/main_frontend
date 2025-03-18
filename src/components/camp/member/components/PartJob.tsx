"use client";
import React from "react";
import {
  BasicPart,
  BasicUser,
  GetJob,
  Id,
  JobGenderRequie,
  jobGenderRequies,
} from "../../../../../interface";
import { Checkbox, MenuItem, Select, TextField } from "@mui/material";
import {
  AddRemoveHigh,
  downloadText,
  setTextToInt,
  setTextToString,
} from "../../../utility/setup";
import UserNameTable from "../../../utility/UserNameTable";
import createJob from "@/libs/camp/createJob";
import updateJobAssign from "@/libs/camp/updateJobAssign";
import registerJob from "@/libs/camp/registerJob";
import deletPartJob from "@/libs/camp/deletPartJob";
import AllInOneLock from "@/components/utility/AllInOneLock";
import FinishButton from "@/components/utility/FinishButton";
import { useDownloadExcel } from "react-export-table-to-excel";
export default function PartJob({
  token,
  partJobs,
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
  const [reqType, setReqType] = React.useState<JobGenderRequie>("ไม่กำหนด");
  const [male, setMale] = React.useState(0);
  const [female, setFemale] = React.useState(0);
  const [sum, setSum] = React.useState(0);
  const [jobId, setJobId] = React.useState<Id | null>(null);
  const [removeTimeRegisterIds, setRemoveTimeRegisterIds] = React.useState<
    Id[]
  >([]);
  const [addJobIds, setaddJobIds] = React.useState<Id[]>([]);
  const ref = React.useRef(null);
  const download = useDownloadExcel({
    currentTableRef: ref.current,
    filename: `หน้าที่ของฝ่าย${part.partName}`,
  });
  const manageJobId = new AddRemoveHigh(
    addJobIds,
    setaddJobIds,
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
                      {jobGenderRequies.map((v, i) => (
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
                          token
                        );
                      }}
                    />
                    <FinishButton
                      text="delete"
                      onClick={() => {
                        deletPartJob(partJob._id, token);
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
                          token
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
                        name,
                        types: "part",
                        refId: part._id,
                      },
                      token
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
              },
              token
            )
          }
        />
      </div>
    </AllInOneLock>
  );
}
