"use client";

import React from "react";
import {
  BasicBaan,
  BasicCamp,
  BasicUser,
  GetMirrorBaan,
  GetMirrorPack,
  GetMirrorUser,
  Id,
  ShowMember,
  UpdateTimeOffsetRaw,
} from "../../../../../interface";
import { useDownloadExcel } from "react-export-table-to-excel";
import {
  downloadText,
  getBackendUrl,
  peeLookupNong,
  setTextToString,
  SocketReady,
} from "@/components/utility/setup";
import FinishButton from "@/components/utility/FinishButton";
import { MenuItem, Select, TextField } from "@mui/material";
import GetTimeHtml from "@/components/utility/GetTimeHtml";
import { io } from "socket.io-client";
import createMirrorBaan from "@/libs/camp/createMirrorBaan";
import createMirrorUser from "@/libs/camp/createMirrorUser";
import deleteMirrorBaan from "@/libs/camp/deleteMirrorBaan";
import deleteMirrorUser from "@/libs/camp/deleteMirrorUser";
import updateMirrorBaan from "@/libs/camp/updateMirrorBaan";
import updateMirrorUser from "@/libs/camp/updateMirrorUser";

const socket = io(getBackendUrl());
export default function MirrorClient({
  mirrorData,
  baan,
  camp,
  token,
  user,
  pees,
  nongs,
  campMemberCardId,
  timeOffset,
}: {
  mirrorData: GetMirrorPack;
  baan: BasicBaan;
  camp: BasicCamp;
  token: string;
  user: BasicUser;
  pees: ShowMember[];
  nongs: ShowMember[];
  campMemberCardId: Id;
  timeOffset: UpdateTimeOffsetRaw;
}) {
  type MirrorType = "user" | "baan";
  const users = peeLookupNong(pees, nongs);
  const userRecieverRef = React.useRef(null);
  const userSenderRef = React.useRef(null);
  const baanReciverRef = React.useRef(null);
  const baanSenderRef = React.useRef(null);
  const userRecieverDownload = useDownloadExcel({
    currentTableRef: userRecieverRef.current,
    filename: `mirror ฝั่งรับของ${user.nickname} ${user.name} ${user.lastname}`,
  });
  const userSenderDownload = useDownloadExcel({
    currentTableRef: userSenderRef.current,
    filename: `mirror ฝั่งส่งของ${user.nickname} ${user.name} ${user.lastname}`,
  });
  const baanReciverDownload = useDownloadExcel({
    currentTableRef: baanReciverRef.current,
    filename: `mirror ฝั่งรับของ${camp.groupName}${baan.name}`,
  });
  const baanSenderDownload = useDownloadExcel({
    currentTableRef: baanSenderRef.current,
    filename: `mirror ฝั่งส่งของ${camp.groupName}${baan.name}`,
  });
  const [reciver, setReciver] = React.useState<ShowMember | null>(null);
  const [message, setMessage] = React.useState<string>("");
  const [types, setTypes] = React.useState<MirrorType>("user");
  const [_id, set_id] = React.useState<Id | null>(null);
  const [userRecivers, setUserRecivers] = React.useState(
    mirrorData.userRecivers
  );
  const [userSenders, setUserSenders] = React.useState(mirrorData.userSenders);
  const [baanRecivers, setBaanRecivers] = React.useState(
    mirrorData.baanRecivers
  );
  const [baanSenders, setBaanSenders] = React.useState(mirrorData.baanSenders);
  const userReciverSocket = new SocketReady<GetMirrorUser[]>(
    socket,
    "reciveMirrorUser"
  );
  const userSenderSocket = new SocketReady<GetMirrorUser[]>(
    socket,
    "sendMirrorUser"
  );
  const baanReciverSocket = new SocketReady<GetMirrorBaan[]>(
    socket,
    "reciveMorrorBaan"
  );
  const baanSenderSocket = new SocketReady<GetMirrorBaan[]>(
    socket,
    "sendMirrorBaan"
  );
  React.useEffect(() => {
    const room = campMemberCardId.toString();
    userReciverSocket.listen(room, setUserRecivers);
    userSenderSocket.listen(room, setUserSenders);
    baanReciverSocket.listen(baan._id.toString(), setBaanRecivers);
    baanSenderSocket.listen(room, setBaanSenders);
    return () => {
      userReciverSocket.disconnect();
      userSenderSocket.disconnect();
      baanReciverSocket.disconnect();
      baanSenderSocket.disconnect();
    };
  });
  return (
    <div>
      {baan.canReadMirror ? (
        <div>
          <table ref={userRecieverRef}>
            <tr>
              <th>ชื่อเล่น</th>
              <th>ชื่อจริง</th>
              <th>นามสกุล</th>
              <th>ข้อความ</th>
              {camp.canReadTimeOnMirror ? <th>เวลา</th> : null}
            </tr>
            {userRecivers.map((mirror, i) => (
              <tr key={i}>
                <td>{mirror.sender.nickname}</td>
                <td>{mirror.sender.name}</td>
                <td>{mirror.sender.lastname}</td>
                <td>{mirror.message}</td>
                {camp.canReadTimeOnMirror ? (
                  <td>
                    <GetTimeHtml input={mirror.time} offset={timeOffset} />
                  </td>
                ) : null}
              </tr>
            ))}
          </table>
          <FinishButton
            text={downloadText}
            onClick={userRecieverDownload.onDownload}
          />
        </div>
      ) : null}
      {baan.canReadMirror || baan.canWhriteMirror ? (
        <div>
          <table ref={userSenderRef}>
            <tr>
              <th>ชื่อเล่น</th>
              <th>ชื่อจริง</th>
              <th>นามสกุล</th>
              <th>select</th>
              <th>ข้อความ</th>
              {camp.canReadTimeOnMirror ? <th>เวลา</th> : null}
              {baan.canWhriteMirror ? <th>action</th> : null}
            </tr>
            {userSenders.map((mirror, i) => {
              if (types == "user" && _id?.toString() == mirror._id.toString()) {
                return (
                  <tr key={i}>
                    <td>{mirror.reciver.nickname}</td>
                    <td>{mirror.reciver.name}</td>
                    <td>{mirror.reciver.lastname}</td>
                    <td></td>
                    <td>
                      <TextField
                        onChange={setTextToString(setMessage, true)}
                        value={message}
                      />
                    </td>
                    {camp.canReadTimeOnMirror ? (
                      <td>
                        <GetTimeHtml input={mirror.time} offset={timeOffset} />
                      </td>
                    ) : null}
                    {baan.canWhriteMirror ? (
                      <td>
                        <FinishButton
                          text="update"
                          onClick={() => {
                            updateMirrorUser(
                              { _id, message },
                              token,
                              userSenderSocket,
                              userReciverSocket
                            );
                          }}
                        />
                        <FinishButton
                          text="delete"
                          onClick={() => {
                            deleteMirrorUser(
                              _id,
                              token,
                              userSenderSocket,
                              userReciverSocket
                            );
                          }}
                        />
                      </td>
                    ) : null}
                  </tr>
                );
              } else {
                return (
                  <tr key={i}>
                    <td>{mirror.reciver.nickname}</td>
                    <td>{mirror.reciver.name}</td>
                    <td>{mirror.reciver.lastname}</td>
                    <td></td>
                    <td>{mirror.message}</td>
                    {camp.canReadTimeOnMirror ? (
                      <td>
                        <GetTimeHtml input={mirror.time} offset={timeOffset} />
                      </td>
                    ) : null}
                    {baan.canWhriteMirror ? (
                      <td>
                        <FinishButton
                          text="select"
                          onClick={() => {
                            set_id(mirror._id);
                            setTypes("user");
                            setMessage(mirror.message);
                          }}
                        />
                      </td>
                    ) : null}
                  </tr>
                );
              }
            })}
            {baan.canWhriteMirror ? (
              types == "user" && !_id ? (
                <tr>
                  <td>{reciver?.nickname}</td>
                  <td>{reciver?.name}</td>
                  <td>{reciver?.lastname}</td>
                  <td>
                    <Select>
                      {users.map((v, i) => (
                        <MenuItem key={i} onClick={() => setReciver(v)}>
                          {v.nickname} {v.name} {v.lastname}
                        </MenuItem>
                      ))}
                    </Select>
                  </td>
                  <td>
                    <TextField
                      onChange={setTextToString(setMessage, true)}
                      value={message}
                    />
                  </td>
                  <td></td>
                  <td>
                    <FinishButton
                      text="create"
                      onClick={() => {
                        if (reciver) {
                          createMirrorUser(
                            {
                              senderCampMemberCardId: campMemberCardId,
                              reciverId: reciver.campMemberCardId,
                              types: "user",
                              message,
                            },
                            token,
                            userSenderSocket,
                            userReciverSocket
                          );
                        } else {
                          alert("โปรดระบุผู้รับ");
                        }
                      }}
                    />
                  </td>
                </tr>
              ) : (
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <FinishButton
                      text="select"
                      onClick={() => {
                        setTypes("user");
                        set_id(null);
                      }}
                    />
                  </td>
                </tr>
              )
            ) : null}
          </table>
          <FinishButton
            text={downloadText}
            onClick={userSenderDownload.onDownload}
          />
        </div>
      ) : null}
      {baan.canReadMirror ? (
        <div>
          <table ref={baanReciverRef}>
            <tr>
              <th>ชื่อเล่น</th>
              <th>ชื่อจริง</th>
              <th>นามสกุล</th>
              <th>{camp.groupName}</th>
              <th>ข้อความ</th>
              {camp.canReadTimeOnMirror ? <th>เวลา</th> : null}
            </tr>
            {baanRecivers.map((mirror, i) => (
              <tr key={i}>
                <td>{mirror.sender.nickname}</td>
                <td>{mirror.sender.name}</td>
                <td>{mirror.sender.lastname}</td>
                <td>{mirror.reciver.name}</td>
                <td>{mirror.message}</td>
                {camp.canReadTimeOnMirror ? (
                  <td>
                    <GetTimeHtml input={mirror.time} offset={timeOffset} />
                  </td>
                ) : null}
              </tr>
            ))}
          </table>
          <FinishButton
            text={downloadText}
            onClick={baanReciverDownload.onDownload}
          />
        </div>
      ) : null}
      {baan.canReadMirror || baan.canWhriteMirror ? (
        <div>
          <table ref={baanSenderRef}>
            <tr>
              <th>{camp.groupName}</th>
              <th>ข้อความ</th>
              {camp.canReadTimeOnMirror ? <th>เวลา</th> : null}
              {baan.canWhriteMirror ? <th>action</th> : null}
            </tr>
            {baanSenders.map((mirror, i) => {
              if (types == "baan" && _id?.toString() == mirror._id.toString()) {
                return (
                  <tr key={i}>
                    <td>{mirror.reciver.name}</td>
                    <td>
                      <TextField
                        onChange={setTextToString(setMessage, true)}
                        value={message}
                      />
                    </td>
                    {camp.canReadTimeOnMirror ? (
                      <td>
                        <GetTimeHtml input={mirror.time} offset={timeOffset} />
                      </td>
                    ) : null}
                    {baan.canWhriteMirror ? (
                      <td>
                        <FinishButton
                          text="update"
                          onClick={() => {
                            updateMirrorBaan(
                              { _id, message },
                              token,
                              baanSenderSocket,
                              baanReciverSocket
                            );
                          }}
                        />
                        <FinishButton
                          text="delete"
                          onClick={() => {
                            deleteMirrorBaan(
                              _id,
                              token,
                              baanSenderSocket,
                              baanReciverSocket
                            );
                          }}
                        />
                      </td>
                    ) : null}
                  </tr>
                );
              } else {
                return (
                  <tr key={i}>
                    <td>{mirror.reciver.name}</td>
                    <td>{mirror.message}</td>
                    {camp.canReadTimeOnMirror ? (
                      <td>
                        <GetTimeHtml input={mirror.time} offset={timeOffset} />
                      </td>
                    ) : null}
                    {baan.canWhriteMirror ? (
                      <td>
                        <FinishButton
                          text="select"
                          onClick={() => {
                            set_id(mirror._id);
                            setTypes("baan");
                            setMessage(mirror.message);
                          }}
                        />
                      </td>
                    ) : null}
                  </tr>
                );
              }
            })}
            {baan.canWhriteMirror ? (
              types == "baan" && !_id ? (
                <tr>
                  <td>{baan.name}</td>
                  <td>
                    <TextField
                      onChange={setTextToString(setMessage, true)}
                      value={message}
                    />
                  </td>
                  <td></td>
                  <td>
                    <FinishButton
                      text="create"
                      onClick={() => {
                        createMirrorBaan(
                          {
                            senderCampMemberCardId: campMemberCardId,
                            reciverId: baan._id,
                            types: "baan",
                            message,
                          },
                          token,
                          baanSenderSocket,
                          baanReciverSocket
                        );
                      }}
                    />
                  </td>
                </tr>
              ) : (
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <FinishButton
                      text="select"
                      onClick={() => {
                        setTypes("baan");
                        set_id(null);
                      }}
                    />
                  </td>
                </tr>
              )
            ) : null}
          </table>
          <FinishButton
            text={downloadText}
            onClick={baanSenderDownload.onDownload}
          />
        </div>
      ) : null}
    </div>
  );
}
