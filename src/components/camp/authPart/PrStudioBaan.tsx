"use client";

import { useDownloadExcel } from "react-export-table-to-excel";
import { ShowCampSongReady } from "../../../../interface";
import updateSongPage from "@/libs/randomthing/updateSongPage";
import FinishButton from "@/components/utility/FinishButton";
import {
  setSwop,
  downloadText,
  getBackendUrl,
} from "@/components/utility/setup";
import StringToHtml from "@/components/utility/StringToHtml";
import { Checkbox } from "@mui/material";
import React from "react";
import { io } from "socket.io-client";
import { RealTimeBasicBaan } from "./UpdateBaanClient";
import { RealTimeCamp } from "./UpdateCampClient";

const socket = io(getBackendUrl());
export default function PrStudioBaan({
  token,
  data,
}: {
  token: string;
  data: ShowCampSongReady;
}) {
  const ref = React.useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: ref.current,
    filename: `เพลงทั้งหมด`,
  });
  const [songIds, setSongIds] = React.useState(data.songIds);
  const [camp, setCamp] = React.useState(data.camp);
  const [baan, setBaan] = React.useState(data.baan);
  const realTimeBaan = new RealTimeBasicBaan(baan._id, socket, setBaan);
  const realTimeCamp = new RealTimeCamp(camp._id, socket);
  React.useEffect(() => {
    realTimeBaan.listen();
    realTimeCamp.listen(setCamp);
    return () => {
      realTimeBaan.disconect();
      realTimeCamp.disconect();
    };
  });
  return (
    <div>
      <table ref={ref}>
        <tr>
          <th>ชื่อ</th>
          <th>เวลา</th>
          <th>คนร้อง</th>
          <th>คนชอบ</th>
          <th>link</th>
          <th>เพลงนี้ใช้ในค่าย</th>
          <th>เพลงนี้ใช้ในบ้าน</th>
          <th>จำนวนน้องที่ชอบ</th>
          <th>จำนวนพี่{camp.campName}ที่ชอบ</th>
          <th>{baan.name}</th>
        </tr>
        {data.showCampSongs.map((song, songIndex) => {
          return (
            <tr key={songIndex}>
              <td>{song.name}</td>
              <td>{song.time}</td>
              <td>{song.author}</td>
              <td>{song.like}</td>
              <td>
                <StringToHtml input={song.link} />
              </td>
              <td>{song.campNames.map((v) => ` ${v} `)}</td>
              <td>{song.baanNames.map((v) => ` ${v} `)}</td>
              <td>{song.nongLike}</td>
              <td>{song.peeLike}</td>
              <td>
                <Checkbox
                  onChange={setSwop(song._id, setSongIds)}
                  checked={songIds.includes(song._id)}
                />
              </td>
            </tr>
          );
        })}
      </table>
      <FinishButton text={downloadText} onClick={onDownload} />
      <FinishButton
        text="update"
        onClick={() => {
          updateSongPage(
            {
              baans: [{ _id: data._id, songIds }],
              camps: [],
              userLikeSongIds: data.userLikeSongIds,
            },
            token
          );
        }}
      />
    </div>
  );
}
