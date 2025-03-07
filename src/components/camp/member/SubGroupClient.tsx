"use client";

import {
  GetGroupContainer,
  BasicCamp,
  BasicBaan,
  InterCampMemberCard,
  Id,
  BasicUser,
  InterSubGroup,
} from "../../../../interface";
import React from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import FinishButton from "@/components/utility/FinishButton";
import {
  downloadText,
  getBackendUrl,
  setBoolean,
  SocketReady,
} from "@/components/utility/setup";
import { io } from "socket.io-client";
import { Checkbox } from "@mui/material";
import UserNameTable from "@/components/utility/UserNameTable";
import registerGroup from "@/libs/camp/registerGroup";

function getSubGroupValid(
  subGroup: InterSubGroup,
  user: BasicUser,
  campMemberCard: InterCampMemberCard,
  subGroupIds: Id[]
) {
  const maleValid =
    user.gender == "Male" && subGroup.genderType != "หญิงเท่านั้น";
  const felaleValid =
    user.gender == "Female" && subGroup.genderType != "ชายเท่านั้น";
  const nongValid =
    campMemberCard.role == "nong" && subGroup.roleType != "พี่เท่านั้น";
  const peeValid =
    campMemberCard.role == "pee" && subGroup.roleType != "น้องเท่านั้น";
  const limitValid =
    subGroup.campMemberCardIds.length < subGroup.limit ||
    subGroupIds.includes(subGroup._id);
  return (maleValid || felaleValid) && (nongValid || peeValid) && limitValid;
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
    "registerSubGroup"
  );
  const ref = React.useRef(null);
  const download = useDownloadExcel({
    filename: `กลุ่มทั้งหมดของ${camp.groupName}${baan.name}`,
    currentTableRef: ref.current,
  });
  const room = data._id.toString();
  const [container, setGroup] = React.useState(data);
  const [removeId, setRemoveId] = React.useState(removeIdTem);
  React.useEffect(() => {
    groupSocket.listen(room, (e) => {
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
      groupSocket.disconect();
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
          <th>สมาชิก</th>
        </tr>
        {container.subGroups.map((subGroup, i) => {
          return (
            <tr key={i}>
              <td>{subGroup.name}</td>
              <td>{subGroup.genderType}</td>
              <td>{subGroup.roleType}</td>
              <td>{subGroup.limit}</td>
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
              <td>
                <UserNameTable inputs={subGroup.users} />
              </td>
            </tr>
          );
        })}
      </table>
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
            room,
            setSubGroupIds
          );
        }}
      />
    </div>
  );
}
