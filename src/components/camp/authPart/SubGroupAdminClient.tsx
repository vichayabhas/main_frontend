"use client";

import React from "react";
import {
  GetGroupContainer,
  GetGroupContainerForAdmin,
  GroupGenderType,
  groupGenderTypes,
  GroupRoleType,
  groupRoleTypes,
  Id,
  Mode,
} from "../../../../interface";
import { io } from "socket.io-client";
import {
  getBackendUrl,
  setBoolean,
  setTextToInt,
  setTextToString,
  SocketReady,
} from "@/components/utility/setup";
import { Checkbox, MenuItem, Select, TextField } from "@mui/material";
import FinishButton from "@/components/utility/FinishButton";
import createGroupContainer from "@/libs/camp/createGroupContainer";
import updateGroupContainer from "@/libs/camp/updateGroupContainer";
import createSubGroup from "@/libs/camp/createSubGroup";
import UserNameTable from "@/components/utility/UserNameTable";
import updateSubGroup from "@/libs/camp/updateSubGroup";
import deleteSubGroup from "@/libs/camp/deleteSubGroup";
import deleteGroupContainer from "@/libs/camp/deleteGroupContainer";
import { RealTimeCamp } from "./UpdateCampClient";
import { RealTimeBasicBaan } from "./UpdateBaanClient";
const socket = io(getBackendUrl());
export default function SubGroupAdminClient({
  data,
  token,
}: {
  data: GetGroupContainerForAdmin;
  token: string;
}) {
  const updateSocket = new SocketReady<GetGroupContainer[]>(
    socket,
    "updateSubGroup"
  );
  const room = data.baan._id.toString();
  const [_id, set_id] = React.useState<Id | null>(null);
  const [containerName, setContainerName] = React.useState("");
  const [selectIndex, setSelectIndex] = React.useState<number | null>(null);
  const [isDefault, setIsDefault] = React.useState(false);
  const [subGroupName, setSubGroupName] = React.useState("");
  const [limit, setLimit] = React.useState(0);
  const [groups, setGroups] = React.useState(data.groups);
  const [genderType, setGenderType] = React.useState<GroupGenderType>("คละเพศ");
  const [roleType, setRoleType] =
    React.useState<GroupRoleType>("คละพี่และน้อง");
  const [canAnybodyCreateSubGroup, setCanAnybodyCreateSubGroup] =
    React.useState(false);
  const [isMany, setIsMany] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [start, setStart] = React.useState(0);
  const [gender, setGender] = React.useState<"male" | "female" | null>(null);
  const [role, setRole] = React.useState<Mode | null>(null);
  const [camp, setCamp] = React.useState(data.camp);
  const [baan, setBaan] = React.useState(data.baan);
  const realTimeCamp = new RealTimeCamp(camp._id, socket);
  const realTimeBaan = new RealTimeBasicBaan(baan._id, socket, setBaan);
  React.useEffect(() => {
    updateSocket.listen(room, setGroups);
    realTimeBaan.listen();
    realTimeCamp.listen(setCamp);
    return () => {
      updateSocket.disconnect();
      realTimeBaan.disconnect();
      realTimeCamp.disconnect();
    };
  });
  return (
    <div>
      <Select
        value={selectIndex != null ? groups[selectIndex].name : "สร้างใหม่"}
        renderValue={() =>
          selectIndex != null ? groups[selectIndex].name : "สร้างใหม่"
        }
      >
        <MenuItem onClick={() => setSelectIndex(null)}>สร้างใหม่</MenuItem>
        {groups.map((group, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              setSelectIndex(i);
              setCanAnybodyCreateSubGroup(group.canAnybodyCreateSubGroup);
              setContainerName(group.name);
              setIsDefault(group.isDefault);
            }}
          >
            {group.name}
          </MenuItem>
        ))}
      </Select>
      {selectIndex == null ? (
        <div>
          <div>
            ชื่อกลุ่มหลัก
            <TextField
              onChange={setTextToString(setContainerName)}
              value={containerName}
            />
          </div>
          <div>
            ทุกคนใน{camp.groupName}
            {baan.name}สามารถแก้ไขกลุ่มย่อยได้หรือไม่
            <Checkbox
              onChange={setBoolean(setCanAnybodyCreateSubGroup)}
              checked={canAnybodyCreateSubGroup}
            />
          </div>
          <div>
            รูปแบบการแยกเพศ
            <Select value={genderType} renderValue={() => genderType}>
              {groupGenderTypes.map((v, i) => (
                <MenuItem key={i} onClick={() => setGenderType(v)}>
                  {v}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div>
            รูปแบบการแยกพี่{camp.groupName}กับ{camp.nongCall}
            <Select value={roleType} renderValue={() => roleType}>
              {groupRoleTypes.map((v, i) => (
                <MenuItem key={i} onClick={() => setRoleType(v)}>
                  {v}
                </MenuItem>
              ))}
            </Select>
          </div>
          <FinishButton
            text="สร้าง"
            onClick={() =>
              createGroupContainer(
                {
                  genderType,
                  roleType,
                  name: containerName,
                  canAnybodyCreateSubGroup,
                  baanId: baan._id,
                },
                token,
                updateSocket,
                room
              )
            }
          />
        </div>
      ) : (
        <div>
          <div>
            ชื่อกลุ่มหลัก
            <TextField
              onChange={setTextToString(setContainerName)}
              value={containerName}
            />
          </div>
          <div>
            เป็นกลุ่มหลักใน{camp.groupName}
            {baan.name}หรือไม่
            <Checkbox onChange={setBoolean(setIsDefault)} checked={isDefault} />
          </div>
          <div>
            ทุกคนใน{camp.groupName}
            {baan.name}สามารถแก้ไขกลุ่มย่อยได้หรือไม่
            <Checkbox
              onChange={setBoolean(setCanAnybodyCreateSubGroup)}
              checked={canAnybodyCreateSubGroup}
            />
          </div>
          <FinishButton
            text="update"
            onClick={() =>
              updateGroupContainer(
                {
                  canAnybodyCreateSubGroup,
                  name: containerName,
                  isDefault,
                  _id: groups[selectIndex]._id,
                },
                token,
                updateSocket,
                room
              )
            }
          />
          <FinishButton
            text="delete"
            onClick={() => {
              deleteGroupContainer(
                groups[selectIndex]._id,
                token,
                updateSocket,
                room
              );
              setSelectIndex(null);
            }}
          />
          {_id ? (
            <FinishButton onClick={() => set_id(null)} text="สร้าง" />
          ) : (
            <>
              <div>
                ชื่อกลุ่มย่อย
                <TextField
                  onChange={setTextToString(setSubGroupName, true)}
                  value={subGroupName}
                />
              </div>
              <div>
                limit
                <TextField
                  onChange={setTextToInt(setLimit)}
                  value={limit.toString()}
                />
              </div>
              {groups[selectIndex].genderType == "กำหนดตอนสร้างกลุ่มย่อย" ? (
                <div>
                  เลือกเพศ
                  <Select
                    value={gender}
                    renderValue={() => {
                      switch (gender) {
                        case "female":
                          return "ผู้หญิงเท่านั้น";
                        case "male":
                          return "ผู้ชายเท่านั้น";
                        case null:
                          return "โปรดเลือกเพศ";
                      }
                    }}
                  >
                    <MenuItem onClick={() => setGender("male")}>
                      ผู้ชายเท่านั้น
                    </MenuItem>
                    <MenuItem onClick={() => setGender("female")}>
                      ผู้หญิงเท่านั้น
                    </MenuItem>
                  </Select>
                </div>
              ) : null}
              {groups[selectIndex].roleType == "กำหนดตอนสร้างกลุ่มย่อย" ? (
                <div>
                  เลือกพี่{camp.groupName}หรือ{camp.nongCall}
                  <Select
                    value={role}
                    renderValue={() => {
                      switch (role) {
                        case "nong":
                          return `${camp.nongCall}เท่านั้น`;
                        case "pee":
                          return `พี่${camp.groupName}เท่านั้น`;
                        case null:
                          return `โปรดเลือกเลือกพี่${camp.groupName}หรือ${camp.nongCall}`;
                      }
                    }}
                  >
                    <MenuItem onClick={() => setRole("nong")}>
                      {camp.nongCall}เท่านั้น
                    </MenuItem>
                    <MenuItem onClick={() => setRole("pee")}>
                      พี่{camp.groupName}เท่านั้น
                    </MenuItem>
                  </Select>
                </div>
              ) : null}
              <div>
                สร้างทีละหลายกลุ่มหรือไม่
                <Checkbox onChange={setBoolean(setIsMany)} checked={isMany} />
              </div>
              {isMany ? (
                <>
                  <div>
                    เริ่ม
                    <TextField
                      onChange={setTextToInt(setStart)}
                      value={start.toString()}
                    />
                  </div>
                  <div>
                    จำนวน
                    <TextField
                      onChange={setTextToInt(setCount)}
                      value={count.toString()}
                    />
                  </div>
                </>
              ) : null}
              <FinishButton
                text="สร้างกลุ่มย่อย"
                onClick={() =>
                  createSubGroup(
                    {
                      isMany,
                      role,
                      gender,
                      name: subGroupName,
                      count,
                      start,
                      containerId: groups[selectIndex]._id,
                      limit,
                    },
                    token,
                    updateSocket,
                    room
                  )
                }
              />
            </>
          )}
          <table>
            <tr>
              <th>ชื่อ</th>
              <th>limit</th>
              <th>เพศ</th>
              <th>บทบาท</th>
              <th>action</th>
              <th>สมาชิก</th>
            </tr>
            {groups[selectIndex].subGroups.map((subGroup, j) => {
              if (_id?.toString() == subGroup._id.toString()) {
                return (
                  <tr key={j}>
                    <td>
                      <TextField
                        onChange={setTextToString(setSubGroupName, true)}
                        value={subGroupName}
                      />
                    </td>
                    <td>
                      <TextField
                        onChange={setTextToInt(setLimit)}
                        value={limit.toString()}
                      />
                    </td>
                    <td>{subGroup.genderType}</td>
                    <td>{subGroup.roleType}</td>
                    <td>
                      <FinishButton
                        text="update"
                        onClick={() => {
                          updateSubGroup(
                            {
                              limit,
                              _id: subGroup._id,
                              name: subGroupName,
                            },
                            token,
                            updateSocket,
                            room
                          );
                        }}
                      />
                      <FinishButton
                        text="delete"
                        onClick={() => {
                          deleteSubGroup(
                            subGroup._id,
                            token,
                            updateSocket,
                            room
                          );
                          set_id(null);
                        }}
                      />
                    </td>
                    <td>
                      <UserNameTable inputs={subGroup.users} />
                    </td>
                  </tr>
                );
              } else {
                return (
                  <tr key={j}>
                    <td>{subGroup.name}</td>
                    <td>{subGroup.limit}</td>
                    <td>{subGroup.genderType}</td>
                    <td>{subGroup.roleType}</td>
                    <td>
                      <FinishButton
                        text="select"
                        onClick={() => {
                          set_id(subGroup._id);
                          setLimit(subGroup.limit);
                          setSubGroupName(subGroup.name);
                        }}
                      />
                    </td>
                    <td>
                      <UserNameTable inputs={subGroup.users} />
                    </td>
                  </tr>
                );
              }
            })}
          </table>
        </div>
      )}
    </div>
  );
}
