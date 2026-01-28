"use client";

import React from "react";
import { GetBaanDictForUpdate, Id, InterCampDict } from "../../../../interface";
import { io } from "socket.io-client";
import {
  getBackendUrl,
  setBoolean,
  setTextToString,
  SetUpDownPack,
  SocketReady,
} from "@/components/utility/setup";
import { RealTimeCamp } from "./UpdateCampClient";
import { Checkbox, TextField } from "@mui/material";
import FinishButton from "@/components/utility/FinishButton";
import updateCampDict from "@/libs/camp/updateCampDict";
import deleteCampDict from "@/libs/camp/deleteCampDict";
import { RealTimeBasicBaan } from "./UpdateBaanClient";
import createCampDict from "@/libs/camp/createCampDict";

const socket = io(getBackendUrl());
export default function UpdateBaanDictClient({
  data,
  token,
}: {
  data: GetBaanDictForUpdate;
  token: string;
}) {
  const [campDicts, setCampDicts] = React.useState(data.campDicts);
  const [camp, setCamp] = React.useState(data.camp);
  const [baan, setBaan] = React.useState(data.baan);
  const [key, setKey] = React.useState("");
  const [value, setValue] = React.useState("");
  const [id, setId] = React.useState<Id | null>(null);
  const {
    up: canNongAccidentallySee,
    setUp: setCanNongAccidentallySee,
    down: canNongSee,
    setDown: setCanNongSee,
  } = new SetUpDownPack(React.useState(SetUpDownPack.init(false, false)));
  const realtimeCamp = new RealTimeCamp(data.camp._id, socket);
  const realtimeBaan = new RealTimeBasicBaan(data.baan._id, socket, setBaan);
  const dictSocket = new SocketReady<InterCampDict[]>(
    socket,
    "baanUpdateDict",
    data.baan._id,
  );
  React.useEffect(() => {
    realtimeCamp.listen(setCamp);
    dictSocket.listen(setCampDicts);
    realtimeBaan.listen();
    return () => {
      realtimeBaan.disconnect();
      dictSocket.disconnect();
      realtimeCamp.disconnect();
    };
  });
  return (
    <div>
      {camp.groupName}
      {baan.name} dict
      <table>
        <tr>
          <th>key</th>
          <th>ความหมาย</th>
          <th>{camp.nongCall}เห็นโดยไม่ได้ตั้งใจหรือไม่</th>
          <th>{camp.nongCall}เห็นได้หรือไม่</th>
          <th>action</th>
        </tr>
        {campDicts.map((campDict, i) => {
          if (campDict._id.toString() === id) {
            return (
              <tr key={i}>
                <td>
                  <TextField onChange={setTextToString(setKey)} value={key} />
                </td>
                <td>
                  <TextField
                    onChange={setTextToString(setValue)}
                    value={value}
                  />
                </td>
                <td>
                  <Checkbox
                    checked={canNongAccidentallySee}
                    onChange={setBoolean(setCanNongAccidentallySee)}
                  />
                </td>
                <td>
                  <Checkbox
                    checked={canNongSee}
                    onChange={setBoolean(setCanNongSee)}
                  />
                </td>
                <td>
                  <FinishButton
                    text="update"
                    onClick={() => {
                      updateCampDict(
                        {
                          _id: campDict._id,
                          key,
                          value,
                          canNongAccidentallySee,
                          canNongSee,
                        },
                        token,
                        dictSocket,
                      );
                    }}
                  />
                  <FinishButton
                    text="delete"
                    onClick={() => {
                      deleteCampDict(campDict._id, token, dictSocket);
                    }}
                  />
                </td>
              </tr>
            );
          } else {
            return (
              <tr key={i}>
                <td>{campDict.key}</td>
                <td>{campDict.value}</td>
                <td>
                  <Checkbox
                    checked={campDict.canNongAccidentallySee}
                    readOnly
                  />
                </td>
                <td>
                  <Checkbox checked={campDict.canNongSee} readOnly />
                </td>
                <td>
                  <FinishButton
                    onClick={() => {
                      setKey(campDict.key);
                      setValue(campDict.value);
                      setId(campDict._id);
                      setCanNongAccidentallySee(
                        campDict.canNongAccidentallySee,
                      );
                      setCanNongSee(campDict.canNongSee);
                    }}
                    text="edit"
                  />
                </td>
              </tr>
            );
          }
        })}
        {id ? (
          <tr>
            <FinishButton
              text="new"
              onClick={() => {
                setId(null);
              }}
            />
            <FinishButton
              text="new and clear"
              onClick={() => {
                setId(null);
                setKey("");
                setValue("");
                setCanNongAccidentallySee(false);
                setCanNongSee(false);
              }}
            />
          </tr>
        ) : (
          <tr>
            <td>
              <TextField onChange={setTextToString(setKey)} value={key} />
            </td>
            <td>
              <TextField onChange={setTextToString(setValue)} value={value} />
            </td>
            <td>
              <Checkbox
                checked={canNongAccidentallySee}
                onChange={setBoolean(setCanNongAccidentallySee)}
              />
            </td>
            <td>
              <Checkbox
                checked={canNongSee}
                onChange={setBoolean(setCanNongSee)}
              />
            </td>
            <td>
              <FinishButton
                text="create"
                onClick={() => {
                  createCampDict(
                    {
                      key,
                      value,
                      canNongAccidentallySee,
                      canNongSee,
                      types: "baan",
                      parentId: baan._id,
                    },
                    token,
                    dictSocket,
                  );
                }}
              />
            </td>
          </tr>
        )}
      </table>
    </div>
  );
}
