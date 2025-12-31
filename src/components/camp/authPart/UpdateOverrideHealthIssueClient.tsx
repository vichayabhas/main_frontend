"use client";
import React from "react";
import { GetOverrideHealthIssue } from "../../../../interface";
import {
  getBackendUrl,
  modifyElementInUseStateArray,
  setMap,
  setTextToString,
  SocketReady,
} from "@/components/utility/setup";
import { io } from "socket.io-client";
import { Checkbox, TextField } from "@mui/material";
import FinishButton from "@/components/utility/FinishButton";
import updateOverrideHealthIssue from "@/libs/camp/updateOverrideHealthIssue";
const socket = io(getBackendUrl());
function getOverrideHealthIssue(
  original: string,
  replace: string | null | undefined
) {
  if (!replace) {
    return original;
  } else {
    return replace;
  }
}
export default function UpdateOverrideHealthIssueClient({
  token,
  data,
}: {
  token: string;
  data: GetOverrideHealthIssue;
}) {
  const [overrideHealthIssue, setOverrideHealthIssue] = React.useState(data);
  const [nongNongReplaceExtras, setNongNongReplaceExtras] = React.useState(
    overrideHealthIssue.nongs.map(
      (nong) => nong.campMemberCard.nongReplaceExtra
    )
  );
  const [nongPeeReplaceExtras, setNongPeeReplaceExtras] = React.useState(
    overrideHealthIssue.nongs.map((nong) => nong.campMemberCard.peeReplaceExtra)
  );
  const [peeNongReplaceExtras, setPeeNongReplaceExtras] = React.useState(
    overrideHealthIssue.pees.map((pee) => pee.campMemberCard.nongReplaceExtra)
  );
  const [peePeeReplaceExtras, setPeePeeReplaceExtras] = React.useState(
    overrideHealthIssue.pees.map((pee) => pee.campMemberCard.peeReplaceExtra)
  );
  const overrideHealthIssueSocket = new SocketReady<GetOverrideHealthIssue>(
    socket,
    "updateOverrideHealthIssue",
    data.baan._id
  );
  React.useEffect(() => {
    overrideHealthIssueSocket.listen((data) => {
      setOverrideHealthIssue(data);
      setNongNongReplaceExtras(
        data.nongs.map((user) => user.campMemberCard.nongReplaceExtra)
      );
      setNongPeeReplaceExtras(
        data.nongs.map((user) => user.campMemberCard.peeReplaceExtra)
      );
      setPeeNongReplaceExtras(
        data.pees.map((user) => user.campMemberCard.nongReplaceExtra)
      );
      setPeePeeReplaceExtras(
        data.pees.map((user) => user.campMemberCard.peeReplaceExtra)
      );
    });
    return () => {
      overrideHealthIssueSocket.disconnect();
    };
  });
  return (
    <div>
      <div>
        <div>
          <div className="text-2xl">น้อง</div>
          <table className="text-xl">
            <tr>
              <th>ชื่อจริง</th>
              <th>นามสกุล</th>
              <th>ชือเล่น</th>
              <th>แพ้อาหารอะไรบ้าง</th>
              <th>แพ้ยาอะไรบ้าง</th>
              <th>มีโรคประจำตัวอะไรบ้าง</th>
              <th>เน้นย้ำเรื่องอาหารอะไรบ้าง</th>
              <th>ค้างคืนหรือไม่</th>
              <th>กินเผ็ดไม่ได้หรือไม่</th>
              <th>ใส่แพมเพิสหรือไม่</th>
              <th>เพิ่มเติม</th>
              <th>แก้สำหรับน้อง</th>
              <th>แก้สำหรับพี่</th>
              <th>สิ่งที่น้องเห็น</th>
              <th>สิ่งที่พี่เห็น</th>
            </tr>

            {overrideHealthIssue.nongs.map((user, index) => (
              <tr key={index}>
                <td>{user.user.name}</td>
                <td>{user.user.lastname}</td>
                <td>{user.user.nickname}</td>
                <td>{user.healthIssue.food}</td>
                <td>{user.healthIssue.medicine}</td>
                <td>{user.healthIssue.chronicDisease}</td>
                <td>{user.healthIssue.foodConcern}</td>
                <td>
                  <Checkbox
                    checked={user.campMemberCard.sleepAtCamp}
                    readOnly
                  />
                </td>
                <td>
                  <Checkbox checked={user.healthIssue.spicy} readOnly />
                </td>
                <td>
                  <Checkbox checked={user.healthIssue.isWearing} readOnly />
                </td>
                <td>{user.healthIssue.extra}</td>
                <td>
                  <TextField
                    value={nongNongReplaceExtras[index]}
                    onChange={setTextToString(
                      setMap(
                        setNongNongReplaceExtras,
                        modifyElementInUseStateArray(index)
                      )
                    )}
                  />
                </td>
                <td>
                  <TextField
                    value={nongPeeReplaceExtras[index]}
                    onChange={setTextToString(
                      setMap(
                        setNongPeeReplaceExtras,
                        modifyElementInUseStateArray(index)
                      )
                    )}
                  />
                </td>
                <td>
                  {getOverrideHealthIssue(
                    user.healthIssue.extra,
                    nongNongReplaceExtras[index]
                  )}
                </td>
                <td>
                  {getOverrideHealthIssue(
                    user.healthIssue.extra,
                    nongPeeReplaceExtras[index]
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
        <div>
          <div className="text-2xl">พี่</div>
          <table className="text-xl">
            <tr>
              <th>ชื่อจริง</th>
              <th>นามสกุล</th>
              <th>ชือเล่น</th>
              <th>แพ้อาหารอะไรบ้าง</th>
              <th>แพ้ยาอะไรบ้าง</th>
              <th>มีโรคประจำตัวอะไรบ้าง</th>
              <th>เน้นย้ำเรื่องอาหารอะไรบ้าง</th>
              <th>ค้างคืนหรือไม่</th>
              <th>กินเผ็ดไม่ได้หรือไม่</th>
              <th>ใส่แพมเพิสหรือไม่</th>
              <th>เพิ่มเติม</th>
              <th>แก้สำหรับน้อง</th>
              <th>แก้สำหรับพี่</th>
              <th>สิ่งที่น้องเห็น</th>
              <th>สิ่งที่พี่เห็น</th>
            </tr>

            {overrideHealthIssue.pees.map((user, index) => (
              <tr key={index}>
                <td>{user.user.name}</td>
                <td>{user.user.lastname}</td>
                <td>{user.user.nickname}</td>
                <td>{user.healthIssue.food}</td>
                <td>{user.healthIssue.medicine}</td>
                <td>{user.healthIssue.chronicDisease}</td>
                <td>{user.healthIssue.foodConcern}</td>
                <td>
                  <Checkbox
                    checked={user.campMemberCard.sleepAtCamp}
                    readOnly
                  />
                </td>
                <td>
                  <Checkbox checked={user.healthIssue.spicy} readOnly />
                </td>
                <td>
                  <Checkbox checked={user.healthIssue.isWearing} readOnly />
                </td>
                <td>{user.healthIssue.extra}</td>
                <td>
                  <TextField
                    value={peeNongReplaceExtras[index]}
                    onChange={setTextToString(
                      setMap(
                        setPeeNongReplaceExtras,
                        modifyElementInUseStateArray(index)
                      )
                    )}
                  />
                </td>
                <td>
                  <TextField
                    value={peePeeReplaceExtras[index]}
                    onChange={setTextToString(
                      setMap(
                        setPeePeeReplaceExtras,
                        modifyElementInUseStateArray(index)
                      )
                    )}
                  />
                </td>
                <td>
                  {getOverrideHealthIssue(
                    user.healthIssue.extra,
                    peeNongReplaceExtras[index]
                  )}
                </td>
                <td>
                  {getOverrideHealthIssue(
                    user.healthIssue.extra,
                    peePeeReplaceExtras[index]
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
        <FinishButton
          text="update"
          onClick={async () => {
            console.log(
              overrideHealthIssue.pees.map((pee, index) => ({
                nongReplaceExtra: peeNongReplaceExtras[index],
                peeReplaceExtra: peePeeReplaceExtras[index],
                campMemberCardId: pee.campMemberCard._id,
              }))
            );
            const data = await updateOverrideHealthIssue(
              {
                baanId: overrideHealthIssue.baan._id,
                datas: overrideHealthIssue.nongs
                  .map((nong, index) => ({
                    nongReplaceExtra: nongNongReplaceExtras[index],
                    peeReplaceExtra: nongPeeReplaceExtras[index],
                    campMemberCardId: nong.campMemberCard._id,
                  }))
                  .concat(
                    overrideHealthIssue.pees.map((pee, index) => ({
                      nongReplaceExtra: peeNongReplaceExtras[index],
                      peeReplaceExtra: peePeeReplaceExtras[index],
                      campMemberCardId: pee.campMemberCard._id,
                    }))
                  ),
              },
              token
            );
            overrideHealthIssueSocket.trigger(data);
          }}
        />
      </div>
    </div>
  );
}
