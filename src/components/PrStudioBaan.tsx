"use client";

import { useDownloadExcel } from "react-export-table-to-excel";
import { ShowCampSongReady } from "../../interface";
import React, { useRef, useState } from "react";
import StringToHtml from "./StringToHtml";
import { Checkbox } from "@mui/material";
import { downloadText, setSwop } from "./setup";
import FinishButton from "./FinishButton";
import updateSongPage from "@/libs/randomthing/updateSongPage";

export default function PrStudioBaan({
  token,
  data,
}: {
  token: string;
  data: ShowCampSongReady;
}) {
  const ref = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: ref.current,
    filename: `เพลงทั้งหมด`,
  });
  const [songIds, setSongIds] = useState(data.songIds);
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
          <th>จำนวนพี่{data.groupName}ที่ชอบ</th>
          <th>{data.baanName}</th>
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
