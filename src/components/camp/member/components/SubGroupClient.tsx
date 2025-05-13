"use client";

import {
  GetGroupContainer,
  BasicCamp,
  BasicBaan,
  InterCampMemberCard,
  Id,
  BasicUser,
  InterSubGroup,
  Mode,
} from "../../../../../interface";
import React from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import FinishButton from "@/components/utility/FinishButton";
import {
  downloadText,
  getBackendUrl,
  peeLookupNong,
  setBoolean,
  setTextToInt,
  setTextToString,
  SocketReady,
} from "@/components/utility/setup";
import { io } from "socket.io-client";
import { Checkbox, MenuItem, Select, TextField } from "@mui/material";
import UserNameTable from "@/components/utility/UserNameTable";
import registerGroup from "@/libs/camp/registerGroup";
import createSubGroupByAnyone from "@/libs/camp/createSubGroupByAnyone";
import updateSubGroupByAnyone from "@/libs/camp/updateSubGroupByAnyone";

function getSubGroupValid(
  subGroup: InterSubGroup,
  user: BasicUser,
  campMemberCard: InterCampMemberCard,
  subGroupIds: Id[]
) {
  const maleValid =
    user.gender == "Male" && subGroup.genderType != "หญิงเท่านั้น";
  const femaleValid =
    user.gender == "Female" && subGroup.genderType != "ชายเท่านั้น";
  const nongValid =
    campMemberCard.role == "nong" && subGroup.roleType != "พี่เท่านั้น";
  const peeValid =
    campMemberCard.role == "pee" && subGroup.roleType != "น้องเท่านั้น";
  const limitValid =
    subGroup.campMemberCardIds.length < subGroup.limit ||
    subGroupIds.includes(subGroup._id);
  return (maleValid || femaleValid) && (nongValid || peeValid) && limitValid;
}

const socket = io(getBackendUrl());

export default function SubGroupClient({
  data,
  token,
  camp,
  baan,
  campMemberCard,
  user,
}: {
  data: GetGroupContainer;
  token: string;
  camp: BasicCamp;
  baan: BasicBaan;
  campMemberCard: InterCampMemberCard;
  user: BasicUser;
}) {
  let i = 0;
  let selectSubGroupIndexTem: number | null = null;
  let removeIdTem: Id | null = null;
  while (i < data.subGroups.length) {
    if (campMemberCard.subGroupIds.includes(data.subGroups[i++]._id)) {
      selectSubGroupIndexTem = i - 1;
      removeIdTem = data.subGroups[selectSubGroupIndexTem]._id;
    }
  }
  const [subGroupIds, setSubGroupIds] = React.useState(
    campMemberCard.subGroupIds
  );
  const groupSocket = new SocketReady<GetGroupContainer>(
    socket,
    "registerSubGroup",data._id
  );
  const ref = React.useRef(null);
  const download = useDownloadExcel({
    filename: `กลุ่มทั้งหมดของ${camp.groupName}${baan.name}`,
    currentTableRef: ref.current,
  });
  const [container, setGroup] = React.useState(data);
  const [removeId, setRemoveId] = React.useState(removeIdTem);
  const [selectIndexAction, setSelectIndexAction] = React.useState<
    number | null
  >(null);
  const [subGroupName, setSubGroupName] = React.useState("");
  const [limit, setLimit] = React.useState(0);
  const [gender, setGender] = React.useState<"male" | "female" | null>(null);
  const [role, setRole] = React.useState<Mode | null>(null);
  React.useEffect(() => {
    groupSocket.listen( (e) => {
      setGroup(e);
      let i = 0;
      let selectSubGroupIndexTem: number | null = null;
      let removeId: Id | null = null;
      while (i < e.subGroups.length) {
        if (subGroupIds.includes(e.subGroups[i++]._id)) {
          selectSubGroupIndexTem = i - 1;
          removeId = e.subGroups[selectSubGroupIndexTem]._id;
        }
      }
      setSelectIndex(selectSubGroupIndexTem);
      setRemoveId(removeId);
    });
    return () => {
      groupSocket.disconnect();
    };
  });
  const [selectIndex, setSelectIndex] = React.useState(selectSubGroupIndexTem);
  return (
    <div>
      <table>
        <tr>
          <th>ชื่อ</th>
          <th>ประเภทการรับเพศ</th>
          <th>ประเภทการรับบทบาท</th>
        </tr>
        <tr>
          <td>{container.name}</td>
          <td>{container.genderType}</td>
          <td>{container.roleType}</td>
        </tr>
      </table>
      <table ref={ref}>
        <tr>
          <th>ชื่อ</th>
          <th>ประเภทการรับเพศ</th>
          <th>ประเภทการรับบทบาท</th>
          <th>limit</th>
          <th>check</th>
          {container.canAnybodyCreateSubGroup ? <th>action</th> : null}
          <th>สมาชิก</th>
          <th>เพิ่มเติม</th>
        </tr>
        {container.subGroups.map((subGroup, i) => {
          const selectValid =
            container.canAnybodyCreateSubGroup && selectIndexAction == i;
          return (
            <tr key={i}>
              <td>
                {selectValid ? (
                  <TextField
                    onChange={setTextToString(setSubGroupName, true)}
                    value={subGroupName}
                  />
                ) : (
                  subGroup.name
                )}
              </td>
              <td>{subGroup.genderType}</td>
              <td>{subGroup.roleType}</td>
              <td>
                {selectValid ? (
                  <TextField
                    onChange={setTextToInt(setLimit)}
                    value={limit.toString()}
                  />
                ) : (
                  subGroup.limit
                )}
              </td>
              <td>
                {getSubGroupValid(
                  subGroup,
                  user,
                  campMemberCard,
                  subGroupIds
                ) ? (
                  <Checkbox
                    checked={selectIndex == i}
                    onChange={setBoolean((c) => {
                      if (c) {
                        setSelectIndex(i);
                      } else {
                        setSelectIndex(null);
                      }
                    })}
                  />
                ) : null}
              </td>
              {container.canAnybodyCreateSubGroup ? (
                <td>
                  {selectValid ? (
                    <FinishButton
                      text="update"
                      onClick={() => {
                        updateSubGroupByAnyone(
                          { limit, name: subGroupName, _id: subGroup._id },
                          token,
                          groupSocket,
                        );
                      }}
                    />
                  ) : (
                    <FinishButton
                      onClick={() => {
                        setSelectIndexAction(i);
                        setSubGroupName(subGroup.name);
                        setLimit(subGroup.limit);
                      }}
                      text="select"
                    />
                  )}
                </td>
              ) : null}
              <td>
                <UserNameTable inputs={subGroup.users} />
              </td>
              <td>
                {subGroup.campMemberCardIds.includes(campMemberCard._id) ? (
                  <>
                    {subGroup.isWearing ? <div>ใส่แพมเพิสทั้งหมด</div> : null}
                    {subGroup.spicy ? <div>กินเผ็ดไม่ได้ทั้งหมด</div> : null}
                  </>
                ) : null}
              </td>
            </tr>
          );
        })}
      </table>
      <div>
        คนที่ยังไม่มีกลุ่ม
        <UserNameTable
          inputs={peeLookupNong(
            container.peesThatNotInGroup,
            container.nongsThatNotInGroup
          )}
        />
      </div>
      {selectIndexAction == null ? null : (
        <FinishButton
          text="สร้างใหม่"
          onClick={() => {
            setSelectIndexAction(null);
          }}
        />
      )}
      {container.canAnybodyCreateSubGroup && selectIndexAction == null ? (
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
          {container.genderType == "กำหนดตอนสร้างกลุ่มย่อย" ? (
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
          {container.roleType == "กำหนดตอนสร้างกลุ่มย่อย" ? (
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
                  พี่${camp.groupName}เท่านั้น
                </MenuItem>
              </Select>
            </div>
          ) : null}
          <FinishButton
            text="สร้างกลุ่มย่อย"
            onClick={() =>
              createSubGroupByAnyone(
                {
                  role,
                  gender,
                  name: subGroupName,
                  containerId: container._id,
                  limit,
                },
                token,
                groupSocket,
              )
            }
          />
        </>
      ) : null}
      <FinishButton text={downloadText} onClick={download.onDownload} />
      <FinishButton
        text="register"
        onClick={() => {
          registerGroup(
            {
              campMemberCardId: campMemberCard._id,
              removeId,
              addId:
                selectIndex == null
                  ? null
                  : container.subGroups[selectIndex]._id,
              containerId: container._id,
            },
            token,
            groupSocket,
            setSubGroupIds
          );
        }}
      />
    </div>
  );
}
