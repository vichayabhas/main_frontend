"use client";

import { useRouter } from "next/navigation";
import { useDownloadExcel } from "react-export-table-to-excel";
import FinishButton from "@/components/utility/FinishButton";
import SelectTemplate from "@/components/utility/SelectTemplate";
import {
  setTextToString,
  setSwop,
  downloadText,
  getBackendUrl,
  SocketReady,
  getIndexArray,
  setBoolean,
  setMap,
  modifyElementInUseStateArray,
  notEmpty,
} from "@/components/utility/setup";
import StringToHtml from "@/components/utility/StringToHtml";
import Waiting from "@/components/utility/Waiting";
import addMemberToBaan from "@/libs/camp/addMemberToBaan";
import admission from "@/libs/camp/admission";
import changeBaan from "@/libs/camp/changeBaan";
import changePart from "@/libs/camp/changePart";
import { TextField, Checkbox } from "@mui/material";
import React from "react";
import {
  ShowRegisterNong,
  Id,
  RegisterData,
  MyMap,
  RegisPart,
  ShowMember,
  TriggerNotification,
  BasicPart,
} from "../../../../interface";
import { io } from "socket.io-client";
import { RealTimeCamp } from "./UpdateCampClient";
import addStaffToCamp from "@/libs/camp/addStaffToCamp";
import AllInOneLock from "@/components/utility/AllInOneLock";
const socket = io(getBackendUrl());
function filterOut(inputs: ShowRegisterNong[]): (previous: Id[]) => Id[] {
  const ids = inputs.map((e) => e.user._id);
  return (previous) => previous.filter((o) => ids.includes(o));
}
export default function RegisterPartClient({
  data,
  token,
  isBoard,
}: {
  data: RegisterData;
  token: string;
  isBoard: boolean;
}) {
  const limit = 600;
  const updateSocket = new SocketReady<RegisterData>(
    socket,
    "registerUpdate",
    data.camp._id,
  );
  const router = useRouter();
  const [nongPendingIds, setNongPendingIds] = React.useState<Id[]>([]);
  const [nongInterviewIds, setNongInterviewIds] = React.useState<Id[]>([]);
  const [nongPaidIds, setNongPaidIds] = React.useState<Id[]>([]);
  const [nongSureIds, setNongSureIds] = React.useState<Id[]>([]);
  const [peePassIds, setPeePassIds] = React.useState<Id[]>([]);
  const [members, setMembers] = React.useState<Id[]>([]);
  const [userIds, setUserIds] = React.useState<Id[]>([]);
  const [timeOut, setTimeOut] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");
  const [nickname, setNickname] = React.useState<string>("");
  const [lastname, setLastname] = React.useState<string>("");
  const [
    {
      regisBaans,
      regisParts,
      peeRegisters,
      partMap,
      nongRegister,
      partBoardIdString,
      peeRegister,
      petoRegister,
    },
    setData,
  ] = React.useState(data);
  const [peeParts, setPeeParts] = React.useState<(BasicPart | null)[]>(
    peeRegister.map(() => null),
  );
  const [peeOverrides, setPeeOverrides] = React.useState<boolean[]>(
    peeRegister.map(() => false),
  );
  const [petoParts, setPetoParts] = React.useState<(BasicPart | null)[]>(
    petoRegister.map(() => null),
  );
  const [petoOverrides, setPetoOverrides] = React.useState<boolean[]>(
    petoRegister.map(() => false),
  );
  const [camp, setCamp] = React.useState(data.camp);
  const [countDowns, setCountDowns] = React.useState<number[]>(
    regisBaans.map((baan) => {
      if (baan.baan.nongIds.length > 0 && baan.baan.peeIds.length == 0) {
        return limit;
      } else {
        return -1;
      }
    }),
  );
  const realTimeCamp = new RealTimeCamp(camp._id, socket);
  const mapIn: MyMap[] = regisBaans.map((regisBaan) => ({
    key: regisBaan.baan._id,
    value: regisBaan.baan.name,
  }));
  function partToMyMap(inputs: RegisPart): MyMap {
    return { key: inputs.part._id, value: inputs.part.partName };
  }

  const regisRaw = regisParts.filter(
    (e) =>
      e.part._id.toString() !== partBoardIdString &&
      e.part.auths.includes("ทะเบียน"),
  );
  const regis = regisRaw.map(partToMyMap);

  async function waiting(update: () => Promise<void>) {
    setTimeOut(true);
    await update();
    setTimeOut(false);
  }
  function filterNong(input: ShowRegisterNong): boolean {
    return (
      input.user.name.search(name) == 0 &&
      input.user.nickname.search(nickname) == 0 &&
      input.user.lastname.search(lastname) == 0
    );
  }
  function filterUser(input: ShowMember): boolean {
    return (
      input.name.search(name) == 0 &&
      input.nickname.search(nickname) == 0 &&
      input.lastname.search(lastname) == 0
    );
  }
  const pendingRef = React.useRef(null);
  const interviewRef = React.useRef(null);
  const passRef = React.useRef(null);
  const paidRef = React.useRef(null);
  const sureRef = React.useRef(null);
  const peePassRef = React.useRef(null);
  const peeRegisterRef = React.useRef(null);
  const petoRegisterRef = React.useRef(null);
  const pendingDownload = useDownloadExcel({
    currentTableRef: pendingRef.current,
    filename: "น้องที่สมัครเข้ามา",
  });
  const interviewDownload = useDownloadExcel({
    currentTableRef: interviewRef.current,
    filename: "น้องที่ผ่านสัมภาษณ์",
  });
  const passDownload = useDownloadExcel({
    currentTableRef: passRef.current,
    filename: "น้องที่ผ่านเข้าค่าย",
  });
  const paidDownload = useDownloadExcel({
    currentTableRef: paidRef.current,
    filename: "น้องที่จ่ายตังแล้ว",
  });
  const sureDownload = useDownloadExcel({
    currentTableRef: sureRef.current,
    filename: "น้องที่ยืนยันแล้ว",
  });
  const peePassDownload = useDownloadExcel({
    currentTableRef: peePassRef.current,
    filename: `พี่${camp.groupName} รอหา${camp.groupName}`,
  });
  const peeRegisterDownload = useDownloadExcel({
    currentTableRef: peeRegisterRef.current,
    filename: `พี่${camp.groupName} ลงทะเบียน`,
  });
  const petoRegisterDownload = useDownloadExcel({
    currentTableRef: petoRegisterRef.current,
    filename: `พี่ปีโต ลงทะเบียน`,
  });
  React.useEffect(() => {
    updateSocket.listen((data2: RegisterData) => {
      interface BackupStaffRegister {
        override: boolean;
        part: BasicPart;
        id: Id;
      }
      const peeRegisterUserIds = data2.peeRegister.map((v) => v.user._id);
      const petoRegisterUserIds = data2.petoRegister.map((v) => v.user._id);
      const backupPeeRegisters: BackupStaffRegister[] = peeRegister
        .map((v, i) => ({
          override: peeOverrides[i],
          part: peeParts[i] ?? data.partPeeBaan,
          id: v.user._id,
        }))
        .filter((v) => peeRegisterUserIds.includes(v.id));
      const backupPetoRegisters: BackupStaffRegister[] = petoRegister
        .map((v, i) => ({
          override: petoOverrides[i],
          part: petoParts[i] ?? data.partPeeBaan,
          id: v.user._id,
        }))
        .filter((v) => petoRegisterUserIds.includes(v.id));
      setPeeParts(backupPeeRegisters.map((v) => v.part));
      setPeeOverrides(backupPeeRegisters.map((v) => v.override));
      setPetoParts(backupPetoRegisters.map((v) => v.part));
      setPetoOverrides(backupPetoRegisters.map((v) => v.override));
      setData(data2);
      setNongPendingIds(filterOut(data2.nongRegister.pendings));
      setNongInterviewIds(filterOut(data2.nongRegister.interviews));
      setNongPaidIds(filterOut(data2.nongRegister.paids));
      setNongSureIds(filterOut(data2.nongRegister.sures));
      const ids = data2.peeRegisters.map((e) => e.userId);
      setPeePassIds((previous) => previous.filter((o) => ids.includes(o)));
      data2.regisBaans.forEach((baan) => {
        if (baan.baan.nongIds.length > 0 && baan.baan.peeIds.length == 0) {
          SocketReady.trigger<TriggerNotification>(
            {
              countDown: 600,
              message: `${camp.groupName}${baan.baan.name} มี${camp.nongCall} โดยไม่มีพี่${camp.groupName} จากค่าย${camp.campName}`,
              types: "เตือนมีน้องอยู่โดยไม่มีพี่",
            },
            "updateNotification",
            baan.baan._id.toString(),
            socket,
          );
        } else {
          return -1;
        }
      });
      setCountDowns((counts) =>
        data2.regisBaans.map((baan, i) => {
          if (baan.baan.nongIds.length > 0 && baan.baan.peeIds.length == 0) {
            if (counts[i] > 0) {
              return counts[i];
            } else {
              return limit;
            }
          } else {
            return -1;
          }
        }),
      );
    });
    realTimeCamp.listen(setCamp);
    const interval = setInterval(() => {
      setCountDowns((counts) =>
        counts.map((count) => {
          if (count > 0) {
            return count - 1;
          } else if (count == 0) {
            return limit;
          } else {
            return -1;
          }
        }),
      );
    }, 1000);
    return () => {
      updateSocket.disconnect();
      realTimeCamp.disconnect();
      clearInterval(interval);
    };
  });
  function updateNotification(newData: RegisterData) {
    newData.regisBaans.forEach((baan) => {
      if (baan.baan.nongIds.length > 0 && baan.baan.peeIds.length == 0) {
        SocketReady.trigger<TriggerNotification>(
          {
            countDown: 600,
            message: `${camp.groupName}${baan.baan.name} มี${camp.nongCall} โดยไม่มีพี่${camp.groupName} จากค่าย${camp.campName}`,
            types: "เตือนมีน้องอยู่โดยไม่มีพี่",
          },
          "updateNotification",
          baan.baan._id.toString(),
          socket,
        );
      } else {
        return -1;
      }
    });
  }
  const maxPartIndexes = getIndexArray(camp.maxRegister);
  return (
    <div
      style={{
        marginLeft: "5%",
      }}
    >
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
      {timeOut ? (
        <Waiting />
      ) : (
        <>
          <div
            style={{
              color: "#961A1D",
              fontWeight: "bold",
              marginTop: "30px",
            }}
          >
            พี่{camp.groupName}ที่สมัครเข้ามา
          </div>
          <table
            className="table-auto border border-x-black border-separate"
            ref={peeRegisterRef}
          >
            <tr>
              <th>ชื่อจริง</th>
              <th>นามสกุล</th>
              <th>ชือเล่น</th>
              {maxPartIndexes.map((i) => (
                <>
                  <th>ฝ่ายที่{i + 1}</th>
                  <th>link</th>
                  <th>select</th>
                </>
              ))}
              <th>ฝ่ายพี่บ้าน</th>
              <AllInOneLock
                bypass={
                  camp.memberStructure ==
                  "nong->highSchool,pee->1year,peto->2upYear"
                }
                lock
              >
                <th>override</th>
              </AllInOneLock>
            </tr>
            {peeRegister.map((v, i) => (
              <tr key={i}>
                <td>{v.user.name}</td>
                <td>{v.user.lastname}</td>
                <td>{v.user.nickname}</td>
                {maxPartIndexes.map((j) =>
                  j < peeRegister[i].parts.length ? (
                    <>
                      <td>{peeRegister[i].parts[j].part.partName}</td>
                      <td>
                        <StringToHtml input={peeRegister[i].parts[j].link} />
                      </td>
                      <td>
                        <Checkbox
                          onChange={setBoolean((check) => {
                            if (check) {
                              setMap(
                                setPeeParts,
                                modifyElementInUseStateArray(i),
                              )(peeRegister[i].parts[j].part);
                            } else {
                              setMap(
                                setPeeParts,
                                modifyElementInUseStateArray(i),
                              )(null);
                            }
                          })}
                          checked={
                            peeRegister[i].parts[j].part._id.toString() ==
                            peeParts[i]?._id.toString()
                          }
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td></td>
                      <td></td>
                      <td></td>
                    </>
                  ),
                )}
                <td>
                  <Checkbox
                    checked={
                      peeParts[i]?._id.toString() ==
                      data.partPeeBaan._id.toString()
                    }
                    onChange={setBoolean((check) => {
                      if (check) {
                        setMap(
                          setPeeParts,
                          modifyElementInUseStateArray(i),
                        )(data.partPeeBaan);
                      } else {
                        setMap(
                          setPeeParts,
                          modifyElementInUseStateArray(i),
                        )(null);
                      }
                    })}
                  />
                </td>
                <AllInOneLock
                  bypass={
                    camp.memberStructure ==
                    "nong->highSchool,pee->1year,peto->2upYear"
                  }
                  lock
                >
                  <td>
                    <Checkbox
                      checked={peeOverrides[i]}
                      onChange={setBoolean(
                        setMap(
                          setPeeOverrides,
                          modifyElementInUseStateArray(i),
                        ),
                      )}
                    />
                  </td>
                </AllInOneLock>
              </tr>
            ))}
          </table>
          <FinishButton
            text={downloadText}
            onClick={peeRegisterDownload.onDownload}
          />
          <AllInOneLock
            bypass={
              camp.memberStructure ==
              "nong->highSchool,pee->1year,peto->2upYear"
            }
            lock
          >
            <div
              style={{
                color: "#961A1D",
                fontWeight: "bold",
                marginTop: "30px",
              }}
            >
              พี่ปีโตที่สมัครเข้ามา
            </div>
            <table
              className="table-auto border border-x-black border-separate"
              ref={petoRegisterRef}
            >
              <tr>
                <th>ชื่อจริง</th>
                <th>นามสกุล</th>
                <th>ชือเล่น</th>
                {maxPartIndexes.map((i) => (
                  <>
                    <th>ฝ่ายที่{i + 1}</th>
                    <th>link</th>
                    <th>select</th>
                  </>
                ))}
                <th>ฝ่ายพี่บ้าน</th>
                <th>override</th>
              </tr>
              {petoRegister.map((v, i) => (
                <tr key={i}>
                  <td>{v.user.name}</td>
                  <td>{v.user.lastname}</td>
                  <td>{v.user.nickname}</td>
                  {maxPartIndexes.map((j) =>
                    j < petoRegister[i].parts.length ? (
                      <>
                        <td>{petoRegister[i].parts[j].part.partName}</td>
                        <td>
                          <StringToHtml input={petoRegister[i].parts[j].link} />
                        </td>
                        <td>
                          <Checkbox
                            onChange={setBoolean((check) => {
                              if (check) {
                                setMap(
                                  setPetoParts,
                                  modifyElementInUseStateArray(i),
                                )(petoRegister[i].parts[j].part);
                              } else {
                                setMap(
                                  setPetoParts,
                                  modifyElementInUseStateArray(i),
                                )(null);
                              }
                            })}
                            checked={
                              petoRegister[i].parts[j].part._id.toString() ==
                              petoParts[i]?._id.toString()
                            }
                          />
                        </td>
                      </>
                    ) : (
                      <>
                        <td></td>
                        <td></td>
                        <td></td>
                      </>
                    ),
                  )}
                  <td>
                    <Checkbox
                      checked={
                        petoParts[i]?._id.toString() ==
                        data.partPeeBaan._id.toString()
                      }
                      onChange={setBoolean((check) => {
                        if (check) {
                          setMap(
                            setPetoParts,
                            modifyElementInUseStateArray(i),
                          )(data.partPeeBaan);
                        } else {
                          setMap(
                            setPetoParts,
                            modifyElementInUseStateArray(i),
                          )(null);
                        }
                      })}
                    />
                  </td>
                  <td>
                    <Checkbox
                      checked={petoOverrides[i]}
                      onChange={setBoolean(
                        setMap(
                          setPetoOverrides,
                          modifyElementInUseStateArray(i),
                        ),
                      )}
                    />
                  </td>
                </tr>
              ))}
            </table>
            <FinishButton
              text={downloadText}
              onClick={petoRegisterDownload.onDownload}
            />
          </AllInOneLock>
          <FinishButton
            text="add staff"
            onClick={() => {
              addStaffToCamp(
                {
                  peePartRegisters: peeRegister
                    .map((v, i) => {
                      const peePart = peeParts[i];
                      if (!peePart || peeOverrides[i]) {
                        return null;
                      } else {
                        return { partId: peePart._id, userId: v.user._id };
                      }
                    })
                    .concat(
                      petoRegister.map((v, i) => {
                        const petoPart = petoParts[i];
                        if (!petoPart || !petoOverrides[i]) {
                          return null;
                        } else {
                          return { partId: petoPart._id, userId: v.user._id };
                        }
                      }),
                    )
                    .filter(notEmpty),
                  petoPartRegisters: petoRegister
                    .map((v, i) => {
                      const petoPart = petoParts[i];
                      if (!petoPart || petoOverrides[i]) {
                        return null;
                      } else {
                        return { partId: petoPart._id, userId: v.user._id };
                      }
                    })
                    .concat(
                      peeRegister.map((v, i) => {
                        const peePart = peeParts[i];
                        if (!peePart || !peeOverrides[i]) {
                          return null;
                        } else {
                          return { partId: peePart._id, userId: v.user._id };
                        }
                      }),
                    )
                    .filter(notEmpty),
                  campId: data.camp._id,
                },
                token,
                updateSocket,
              );
            }}
          />
          <div
            style={{
              color: "#961A1D",
              fontWeight: "bold",
              marginTop: "30px",
            }}
          >
            น้องที่สมัครเข้ามา
          </div>
          <table
            ref={pendingRef}
            className="table-auto border border-x-black border-separate"
          >
            <th className=" border border-x-black">รหัส</th>
            <th className=" border border-x-black">ชือเล่น</th>
            <th className=" border border-x-black">ชื่อจริง</th>
            <th className=" border border-x-black">นามสกุล</th>
            <th className=" border border-x-black">เพศ</th>
            <th className=" border border-x-black">link</th>
            <th className=" border border-x-black">select</th>
            {nongRegister.pendings.filter(filterNong).map((v, i) => (
              <tr key={i}>
                <td
                  className=" border border-x-black"
                  onClick={() => {
                    router.push(`/userProfile/${v.user._id}`);
                  }}
                >
                  {v.localId}
                </td>
                <td>{v.user.nickname}</td>
                <td>{v.user.name}</td>
                <td>{v.user.lastname}</td>
                <td>{v.user.gender}</td>
                <td className=" border border-x-black">
                  <StringToHtml input={v.link} />
                </td>
                <td className=" border border-x-black">
                  <Checkbox
                    onChange={setSwop(v.user._id, setNongPendingIds)}
                    checked={nongPendingIds.includes(v.user._id)}
                  />
                </td>
              </tr>
            ))}
          </table>
          <FinishButton
            text={downloadText}
            onClick={pendingDownload.onDownload}
          />
          {camp.registerModel === "all" ? (
            <>
              <div
                style={{
                  backgroundColor: "#961A1D",
                  display: "inline-block",
                  padding: "10px",
                  borderRadius: "15px",
                  marginTop: "5px",
                }}
              >
                <FinishButton
                  text="ผ่านรอบเอกสาร"
                  onClick={() => {
                    waiting(async () => {
                      await admission(
                        { members: nongPendingIds, campId: camp._id },
                        "interview",
                        token,
                        updateSocket,
                      );
                      setNongPendingIds([]);
                    });
                  }}
                />
                <FinishButton
                  text="ตกรอบเอกสาร"
                  onClick={() => {
                    waiting(async () => {
                      await admission(
                        { members: nongPendingIds, campId: camp._id },
                        "kick/nong",
                        token,
                        updateSocket,
                      );
                      setNongPendingIds([]);
                    });
                  }}
                />
              </div>
              <div
                style={{
                  color: "#961A1D",
                  fontWeight: "bold",
                  marginTop: "30px",
                }}
              >
                ผ่านการสัมภาษณ์
              </div>
              <table
                ref={interviewRef}
                className="table-auto border border-x-black border-separate"
              >
                <th className=" border border-x-black">รหัส</th>
                <th className=" border border-x-black">ชือเล่น</th>
                <th className=" border border-x-black">ชื่อจริง</th>
                <th className=" border border-x-black">นามสกุล</th>
                <th className=" border border-x-black">เพศ</th>
                <th className=" border border-x-black">link</th>
                <th className=" border border-x-black">select</th>
                {nongRegister.interviews.filter(filterNong).map((v, i) => (
                  <tr key={i}>
                    <td
                      className=" border border-x-black"
                      onClick={() => {
                        router.push(`/userProfile/${v.user._id}`);
                      }}
                    >
                      {v.localId}
                    </td>
                    <td>{v.user.nickname}</td>
                    <td>{v.user.name}</td>
                    <td>{v.user.lastname}</td>
                    <td>{v.user.gender}</td>
                    <td className=" border border-x-black">
                      <StringToHtml input={v.link} />
                    </td>
                    <td className=" border border-x-black">
                      <Checkbox
                        onChange={setSwop(v.user._id, setNongInterviewIds)}
                        checked={nongInterviewIds.includes(v.user._id)}
                      />
                    </td>
                  </tr>
                ))}
              </table>
              <FinishButton
                text={downloadText}
                onClick={interviewDownload.onDownload}
              />
              <div
                style={{
                  backgroundColor: "#961A1D",
                  display: "inline-block",
                  padding: "10px",
                  borderRadius: "15px",
                  marginTop: "5px",
                }}
              >
                <FinishButton
                  text="ผ่านการสัมภาษณ์"
                  onClick={() => {
                    waiting(async () => {
                      await admission(
                        { members: nongInterviewIds, campId: camp._id },
                        "pass",
                        token,
                        updateSocket,
                      );
                      setNongInterviewIds([]);
                    });
                  }}
                />
                <FinishButton
                  text="ตกรอบสัมภาษณ์"
                  onClick={() => {
                    waiting(async () => {
                      await admission(
                        { members: nongInterviewIds, campId: camp._id },
                        "kick/nong",
                        token,
                        updateSocket,
                      );
                      setNongInterviewIds([]);
                    });
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  backgroundColor: "#961A1D",
                  display: "inline-block",
                  padding: "10px",
                  borderRadius: "15px",
                  marginTop: "5px",
                }}
              >
                <FinishButton
                  text="ผ่านการคัดเลือก"
                  onClick={() => {
                    waiting(async () => {
                      await admission(
                        { members: nongPendingIds, campId: camp._id },
                        "pass",
                        token,
                        updateSocket,
                      );
                      setNongPendingIds([]);
                    });
                  }}
                />
                <FinishButton
                  text="ไม่ผ่านการคัดเลือก"
                  onClick={() => {
                    waiting(async () => {
                      await admission(
                        { members: nongPendingIds, campId: camp._id },
                        "kick/nong",
                        token,
                        updateSocket,
                      );
                      setNongPendingIds([]);
                    });
                  }}
                />
              </div>
            </>
          )}
          <div
            style={{
              color: "#961A1D",
              fontWeight: "bold",
              marginTop: "30px",
            }}
          >
            {camp.registerModel === "all" ? (
              <>น้องที่ผ่านการสัมภาษณ์</>
            ) : (
              <>น้องที่ผ่านการคัดเลือก</>
            )}
          </div>
          <table
            ref={passRef}
            className="table-auto border border-x-black border-separate"
          >
            <th className=" border border-x-black">รหัส</th>
            <th className=" border border-x-black">ชือเล่น</th>
            <th className=" border border-x-black">ชื่อจริง</th>
            <th className=" border border-x-black">นามสกุล</th>
            <th className=" border border-x-black">เพศ</th>
            <th className=" border border-x-black">link</th>
            {nongRegister.passs.filter(filterNong).map((v, i) => (
              <tr key={i}>
                <td
                  className=" border border-x-black"
                  onClick={() => {
                    router.push(`/userProfile/${v.user._id}`);
                  }}
                >
                  {v.localId}
                </td>
                <td>{v.user.nickname}</td>
                <td>{v.user.name}</td>
                <td>{v.user.lastname}</td>
                <td>{v.user.gender}</td>
                <td className=" border border-x-black">
                  <StringToHtml input={v.link} />
                </td>
              </tr>
            ))}
          </table>
          <FinishButton text={downloadText} onClick={passDownload.onDownload} />
          {camp.registerModel !== "noPaid" ? (
            <>
              <div
                style={{
                  color: "#961A1D",
                  fontWeight: "bold",
                  marginTop: "30px",
                }}
              >
                น้องที่จ่ายเงินแล้ว
              </div>
              <table
                ref={paidRef}
                className="table-auto border border-x-black border-separate"
              >
                <th className=" border border-x-black">รหัส</th>
                <th className=" border border-x-black">ชือเล่น</th>
                <th className=" border border-x-black">ชื่อจริง</th>
                <th className=" border border-x-black">นามสกุล</th>
                <th className=" border border-x-black">เพศ</th>
                <th className=" border border-x-black">link</th>
                <th className=" border border-x-black">select</th>
                {nongRegister.paids.filter(filterNong).map((v, i) => (
                  <tr key={i}>
                    <td
                      className=" border border-x-black"
                      onClick={() => {
                        router.push(`/userProfile/${v.user._id}`);
                      }}
                    >
                      {v.localId}
                    </td>
                    <td>{v.user.nickname}</td>
                    <td>{v.user.name}</td>
                    <td>{v.user.lastname}</td>
                    <td>{v.user.gender}</td>
                    <td className=" border border-x-black">
                      <StringToHtml input={v.link} />
                    </td>
                    <td className=" border border-x-black">
                      <Checkbox
                        onChange={setSwop(v.user._id, setNongPaidIds)}
                      />
                    </td>
                  </tr>
                ))}
              </table>
              <FinishButton
                text={downloadText}
                onClick={paidDownload.onDownload}
              />
              <div
                style={{
                  backgroundColor: "#961A1D",
                  display: "inline-block",
                  padding: "10px",
                  borderRadius: "15px",
                  marginTop: "5px",
                }}
              >
                <FinishButton
                  text="ยืนยันการจ่ายเงิน"
                  onClick={() => {
                    waiting(async () => {
                      await admission(
                        { members: nongPaidIds, campId: camp._id },
                        "sure",
                        token,
                        updateSocket,
                      );
                      setNongPaidIds([]);
                    });
                  }}
                />
                <FinishButton
                  text="ไม่ยืนยันการจ่ายเงิน"
                  onClick={() => {
                    waiting(async () => {
                      await admission(
                        { members: nongPaidIds, campId: camp._id },
                        "kick/nong",
                        token,
                        updateSocket,
                      );
                      setNongPendingIds([]);
                    });
                  }}
                />
              </div>
            </>
          ) : null}
          <div
            style={{
              color: "#961A1D",
              fontWeight: "bold",
              marginTop: "30px",
            }}
          >
            น้องที่มั่นใจว่าเข้าค่ายแน่นอน
          </div>
          <table
            ref={sureRef}
            className="table-auto border border-x-black border-separate"
          >
            <th className=" border border-x-black">รหัส</th>
            <th className=" border border-x-black">ชือเล่น</th>
            <th className=" border border-x-black">ชื่อจริง</th>
            <th className=" border border-x-black">นามสกุล</th>
            <th className=" border border-x-black">เพศ</th>
            <th className=" border border-x-black">link</th>
            <th className=" border border-x-black">select</th>
            {nongRegister.sures.filter(filterNong).map((v, i) => (
              <tr key={i}>
                <td
                  className=" border border-x-black"
                  onClick={() => {
                    router.push(`/userProfile/${v.user._id}`);
                  }}
                >
                  {v.localId}
                </td>
                <td>{v.user.nickname}</td>
                <td>{v.user.name}</td>
                <td>{v.user.lastname}</td>
                <td>{v.user.gender}</td>
                <td className=" border border-x-black">
                  <StringToHtml input={v.link} />
                </td>
                <td className=" border border-x-black">
                  <Checkbox onChange={setSwop(v.user._id, setNongSureIds)} />
                </td>
              </tr>
            ))}
          </table>
          <FinishButton text={downloadText} onClick={sureDownload.onDownload} />
          <div
            style={{
              color: "#961A1D",
              fontWeight: "bold",
              marginTop: "30px",
            }}
          >
            พี่{camp.groupName}รอหา{camp.groupName}
          </div>
          <table
            ref={peePassRef}
            className="table-auto border border-x-black border-separate"
          >
            <th className=" border border-x-black">รหัส</th>
            <th className=" border border-x-black">ชือเล่น</th>
            <th className=" border border-x-black">ชื่อจริง</th>
            <th className=" border border-x-black">นามสกุล</th>
            <th className=" border border-x-black">ฝ่าย</th>
            <th className=" border border-x-black">select</th>
            {peeRegisters.map((v, i) => (
              <tr key={i}>
                <td
                  className=" border border-x-black"
                  onClick={() => {
                    router.push(`/userProfile/${v.userId}`);
                  }}
                >
                  {v.userId.toString()}
                </td>
                <td>{v.nickname}</td>
                <td>{v.name}</td>
                <td>{v.lastname}</td>
                <td className=" border border-x-black">{v.partName}</td>
                <td className=" border border-x-black">
                  <Checkbox
                    onChange={setSwop(v.userId, setPeePassIds)}
                    checked={peePassIds.includes(v.userId)}
                  />
                </td>
              </tr>
            ))}
          </table>
          <FinishButton
            text={downloadText}
            onClick={peePassDownload.onDownload}
          />
        </>
      )}
      <SelectTemplate
        mapIn={mapIn}
        select={(baanId) => {
          waiting(async () => {
            await addMemberToBaan(
              { baanId, members: nongSureIds },
              "nong",
              token,
              "add",
            );
            await addMemberToBaan(
              { baanId, members: peePassIds },
              "pee",
              token,
              "add",
            );
            const newData = await changeBaan(
              { userIds: members, baanId },
              token,
              updateSocket,
            );
            updateNotification(newData);
            setNongSureIds([]);
            setPeePassIds([]);
            setMembers([]);
          });
        }}
        buttonText={"จัดบ้าน"}
      />
      {regisBaans.map((regisBaan, i) => {
        const nongRef = React.useRef(null);
        const peeRef = React.useRef(null);
        const nongDownload = useDownloadExcel({
          currentTableRef: nongRef.current,
          filename: `รายชื่อน้อง${camp.groupName}${regisBaan.baan.fullName}`,
        });
        const peeDownload = useDownloadExcel({
          currentTableRef: peeRef.current,
          filename: `รายชื่อพี่$${camp.groupName}${regisBaan.baan.fullName}`,
        });
        return (
          <>
            <div>
              <div
                style={{
                  color: "#961A1D",
                  fontWeight: "bold",
                  marginTop: "30px",
                }}
              >
                รายชื่อน้อง{camp.groupName}
                {regisBaan.baan.fullName}
                {countDowns[i] > -1 ? countDowns[i] : null}
              </div>
              <table
                ref={nongRef}
                className="table-auto border border-x-black border-separate"
              >
                <tr>
                  <th className=" border border-x-black">ชือเล่น</th>
                  <th className=" border border-x-black">ชื่อจริง</th>
                  <th className=" border border-x-black">นามสกุล</th>
                  <th className=" border border-x-black">เพศ</th>
                  <th className=" border border-x-black">ค้างคืนหรือไม่</th>
                  <th className=" border border-x-black">id</th>
                  <th className=" border border-x-black">รหัสประจำตัวนิสิต</th>
                  <th className=" border border-x-black">เบอร์โทรศัพท์</th>
                  <th className=" border border-x-black">email</th>
                  <th className=" border border-x-black">มีกระติกน้ำหรือไม่</th>
                  <th className=" border border-x-black">ขนาดเสื้อ</th>
                  <th className=" border border-x-black">กรุ๊ปของนิสิต</th>
                  <th className=" border border-x-black">ปัญหาสุขภาพ</th>
                  <th className=" border border-x-black">select</th>
                </tr>
                {regisBaan.nongs
                  .filter(filterUser)
                  .map((user: ShowMember, i) => (
                    <tr key={i}>
                      <td className=" border border-x-black">
                        {user.nickname}
                      </td>
                      <td className=" border border-x-black">{user.name}</td>
                      <td className=" border border-x-black">
                        {user.lastname}
                      </td>
                      <td className=" border border-x-black">{user.gender}</td>
                      <td className=" border border-x-black">
                        {user.sleep ? <>ค้างคืน</> : <>ไม่ค้างคืน</>}
                      </td>
                      <td
                        className=" border border-x-black"
                        onClick={() => {
                          alert(user._id);
                        }}
                      >
                        {user.id}
                      </td>
                      <td className=" border border-x-black">
                        {user.studentId}
                      </td>
                      <td className=" border border-x-black">{user.tel}</td>
                      <td className=" border border-x-black">{user.email}</td>
                      <td className=" border border-x-black">
                        {user.haveBottle.toString()}
                      </td>
                      <td className=" border border-x-black">
                        {user.shirtSize}
                      </td>
                      <td className=" border border-x-black">{user.group}</td>
                      {user.healthIssueId ? (
                        <td
                          className=" border border-x-black"
                          onClick={() => {
                            router.push(
                              `/healthIssue/${user.healthIssueId?.toString()}`,
                            );
                          }}
                        >
                          {user.healthIssueId.toString()}
                        </td>
                      ) : (
                        <td className=" border border-x-black">-</td>
                      )}
                      <td className=" border border-x-black">
                        <Checkbox
                          onChange={setSwop(user._id, setMembers)}
                          checked={members.includes(user._id)}
                        />
                      </td>
                    </tr>
                  ))}
              </table>
              <FinishButton
                text={downloadText}
                onClick={nongDownload.onDownload}
              />
            </div>
            <div>
              <div
                style={{
                  color: "#961A1D",
                  fontWeight: "bold",
                  marginTop: "30px",
                }}
              >
                รายชื่อพี่{camp.groupName}
                {regisBaan.baan.fullName}
              </div>
              <table
                ref={peeRef}
                className="table-auto border border-x-black border-separate"
              >
                <tr>
                  <th className=" border border-x-black">ชือเล่น</th>
                  <th className=" border border-x-black">ชื่อจริง</th>
                  <th className=" border border-x-black">นามสกุล</th>
                  <th className=" border border-x-black">เพศ</th>
                  <th className=" border border-x-black">ค้างคืนหรือไม่</th>
                  <th className=" border border-x-black">id</th>
                  <th className=" border border-x-black">รหัสประจำตัวนิสิต</th>
                  <th className=" border border-x-black">เบอร์โทรศัพท์</th>
                  <th className=" border border-x-black">email</th>
                  <th className=" border border-x-black">มีกระติกน้ำหรือไม่</th>
                  <th className=" border border-x-black">ขนาดเสื้อ</th>
                  <th className=" border border-x-black">กรุ๊ปของนิสิต</th>
                  <th className=" border border-x-black">ปัญหาสุขภาพ</th>
                  <th className=" border border-x-black">select</th>
                </tr>
                {regisBaan.pees
                  .filter(filterUser)
                  .map((user: ShowMember, i) => (
                    <tr key={i}>
                      <td className=" border border-x-black">
                        {user.nickname}
                      </td>
                      <td className=" border border-x-black">{user.name}</td>
                      <td className=" border border-x-black">
                        {user.lastname}
                      </td>
                      <td className=" border border-x-black">{user.gender}</td>
                      <td className=" border border-x-black">
                        {user.sleep ? <>ค้างคืน</> : <>ไม่ค้างคืน</>}
                      </td>
                      <td
                        className=" border border-x-black"
                        onClick={() => {
                          alert(user._id);
                        }}
                      >
                        {user.id}
                      </td>
                      <td className=" border border-x-black">
                        {user.studentId}
                      </td>
                      <td className=" border border-x-black">{user.tel}</td>
                      <td className=" border border-x-black">{user.email}</td>
                      <td className=" border border-x-black">
                        {user.haveBottle.toString()}
                      </td>
                      <td className=" border border-x-black">
                        {user.shirtSize}
                      </td>
                      <td className=" border border-x-black">{user.group}</td>
                      {user.healthIssueId ? (
                        <td
                          className=" border border-x-black"
                          onClick={() => {
                            router.push(
                              `/healthIssue/${user.healthIssueId?.toString()}`,
                            );
                          }}
                        >
                          {user.healthIssueId.toString()}
                        </td>
                      ) : (
                        <td className=" border border-x-black">-</td>
                      )}
                      <td className=" border border-x-black">
                        <Checkbox
                          onChange={setSwop(user._id, setMembers)}
                          checked={members.includes(user._id)}
                        />
                      </td>
                    </tr>
                  ))}
              </table>
              <FinishButton
                text={downloadText}
                onClick={peeDownload.onDownload}
              />
            </div>
          </>
        );
      })}
      {regisParts.map((regisPart) => {
        const have =
          isBoard ||
          (regisPart.part._id.toString() !== partBoardIdString &&
            regisPart.part.auths.includes("ทะเบียน"));
        const peeRef = React.useRef(null);
        const petoRef = React.useRef(null);
        const peeDownload = useDownloadExcel({
          currentTableRef: peeRef.current,
          filename: `รายชื่อพี่${camp.groupName}${regisPart.part.partName}`,
        });
        const petoDownload = useDownloadExcel({
          currentTableRef: petoRef.current,
          filename: `รายชื่อปีโตฝ่าย${regisPart.part.partName}`,
        });
        return (
          <>
            <div>
              <div
                style={{
                  color: "#961A1D",
                  fontWeight: "bold",
                  marginTop: "30px",
                }}
              >
                รายชื่อปีโตฝ่าย{regisPart.part.partName}
              </div>
              <table
                ref={petoRef}
                className="table-auto border border-x-black border-separate"
              >
                <tr>
                  <th className=" border border-x-black">ชือเล่น</th>
                  <th className=" border border-x-black">ชื่อจริง</th>
                  <th className=" border border-x-black">นามสกุล</th>
                  <th className=" border border-x-black">เพศ</th>
                  <th className=" border border-x-black">ค้างคืนหรือไม่</th>
                  <th className=" border border-x-black">id</th>
                  <th className=" border border-x-black">รหัสประจำตัวนิสิต</th>
                  <th className=" border border-x-black">เบอร์โทรศัพท์</th>
                  <th className=" border border-x-black">email</th>
                  <th className=" border border-x-black">มีกระติกน้ำหรือไม่</th>
                  <th className=" border border-x-black">ขนาดเสื้อ</th>
                  <th className=" border border-x-black">กรุ๊ปของนิสิต</th>
                  <th className=" border border-x-black">ปัญหาสุขภาพ</th>
                  <th className=" border border-x-black">select</th>
                </tr>
                {regisPart.petos
                  .filter(filterUser)
                  .map((user: ShowMember, i) => (
                    <tr key={i}>
                      <td className=" border border-x-black">
                        {user.nickname}
                      </td>
                      <td className=" border border-x-black">{user.name}</td>
                      <td className=" border border-x-black">
                        {user.lastname}
                      </td>
                      <td className=" border border-x-black">{user.gender}</td>
                      <td className=" border border-x-black">
                        {user.sleep ? <>ค้างคืน</> : <>ไม่ค้างคืน</>}
                      </td>
                      <td
                        className=" border border-x-black"
                        onClick={() => {
                          alert(user._id);
                        }}
                      >
                        {user.id}
                      </td>
                      <td className=" border border-x-black">
                        {user.studentId}
                      </td>
                      <td className=" border border-x-black">{user.tel}</td>
                      <td className=" border border-x-black">{user.email}</td>
                      <td className=" border border-x-black">
                        {user.haveBottle.toString()}
                      </td>
                      <td className=" border border-x-black">
                        {user.shirtSize}
                      </td>
                      <td className=" border border-x-black">{user.group}</td>
                      {user.healthIssueId ? (
                        <td
                          className=" border border-x-black"
                          onClick={() => {
                            router.push(
                              `/healthIssue/${user.healthIssueId?.toString()}`,
                            );
                          }}
                        >
                          {user.healthIssueId.toString()}
                        </td>
                      ) : (
                        <td className=" border border-x-black">-</td>
                      )}
                      {have ? (
                        <Checkbox
                          onChange={setSwop(user._id, setUserIds)}
                          checked={userIds.includes(user._id)}
                        />
                      ) : null}
                    </tr>
                  ))}
              </table>
              <FinishButton
                text={downloadText}
                onClick={petoDownload.onDownload}
              />
            </div>
            <div>
              <div
                style={{
                  color: "#961A1D",
                  fontWeight: "bold",
                  marginTop: "30px",
                }}
              >
                รายชื่อพี่{camp.groupName}
                {regisPart.part.partName}
              </div>
              <table
                ref={peeRef}
                className="table-auto border border-x-black border-separate"
              >
                <tr>
                  <th className=" border border-x-black">ชือเล่น</th>
                  <th className=" border border-x-black">ชื่อจริง</th>
                  <th className=" border border-x-black">นามสกุล</th>
                  <th className=" border border-x-black">เพศ</th>
                  <th className=" border border-x-black">ค้างคืนหรือไม่</th>
                  <th className=" border border-x-black">id</th>
                  <th className=" border border-x-black">รหัสประจำตัวนิสิต</th>
                  <th className=" border border-x-black">เบอร์โทรศัพท์</th>
                  <th className=" border border-x-black">email</th>
                  <th className=" border border-x-black">มีกระติกน้ำหรือไม่</th>
                  <th className=" border border-x-black">ขนาดเสื้อ</th>
                  <th className=" border border-x-black">กรุ๊ปของนิสิต</th>
                  <th className=" border border-x-black">ปัญหาสุขภาพ</th>
                  <th className=" border border-x-black">select</th>
                </tr>
                {regisPart.pees
                  .filter(filterUser)
                  .map((user: ShowMember, i) => (
                    <tr key={i}>
                      <td className=" border border-x-black">
                        {user.nickname}
                      </td>
                      <td className=" border border-x-black">{user.name}</td>
                      <td className=" border border-x-black">
                        {user.lastname}
                      </td>
                      <td className=" border border-x-black">{user.gender}</td>
                      <td className=" border border-x-black">
                        {user.sleep ? <>ค้างคืน</> : <>ไม่ค้างคืน</>}
                      </td>
                      <td
                        className=" border border-x-black"
                        onClick={() => {
                          alert(user._id);
                        }}
                      >
                        {user.id}
                      </td>
                      <td className=" border border-x-black">
                        {user.studentId}
                      </td>
                      <td className=" border border-x-black">{user.tel}</td>
                      <td className=" border border-x-black">{user.email}</td>
                      <td className=" border border-x-black">
                        {user.haveBottle.toString()}
                      </td>
                      <td className=" border border-x-black">
                        {user.shirtSize}
                      </td>
                      <td className=" border border-x-black">{user.group}</td>
                      {user.healthIssueId ? (
                        <td
                          className=" border border-x-black"
                          onClick={() => {
                            router.push(
                              `/healthIssue/${user.healthIssueId?.toString()}`,
                            );
                          }}
                        >
                          {user.healthIssueId.toString()}
                        </td>
                      ) : (
                        <td className=" border border-x-black">-</td>
                      )}
                      {have ? (
                        <Checkbox
                          onChange={setSwop(user._id, setUserIds)}
                          checked={userIds.includes(user._id)}
                        />
                      ) : null}
                    </tr>
                  ))}
              </table>
              <FinishButton
                text={downloadText}
                onClick={peeDownload.onDownload}
              />
            </div>
          </>
        );
      })}
      {isBoard ? (
        <SelectTemplate
          mapIn={partMap}
          select={(partId) => {
            changePart({ userIds, partId }, token, updateSocket);
          }}
          buttonText={"ย้ายฝ่าย"}
        />
      ) : (
        <SelectTemplate
          mapIn={regis}
          select={(partId) => {
            changePart({ userIds, partId }, token, updateSocket);
          }}
          buttonText={"ย้ายฝ่าย"}
        />
      )}
    </div>
  );
}
