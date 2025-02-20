"use client";

import { useDownloadExcel } from "react-export-table-to-excel";

import updateSongPage from "@/libs/randomthing/updateSongPage";
import { useRouter } from "next/navigation";
import FinishButton from "@/components/utility/FinishButton";
import {
  setSwop,
  setSwop2DimensionArray,
  downloadText,
} from "@/components/utility/setup";
import StringToHtml from "@/components/utility/StringToHtml";
import { Checkbox } from "@mui/material";
import React from "react";
import { AuthSongsCamp } from "../../../../interface";

export default function PrStudioClient({
  authSong: { userLikeSongIds, baans, camp, authCamp, songs },
  token,
  partIdString,
}: {
  authSong: AuthSongsCamp;
  token: string;
  partIdString: string;
}) {
  const ref = React.useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: ref.current,
    filename: `เพลงทั้งหมด`,
  });
  const [campSongIds, setCampSongIds] = React.useState(camp.songIds);
  const [arrayOfBaanSongLists, setArrayOfBaanSongLists] = React.useState(
    baans.map(({ songIds }) => songIds)
  );
  const router = useRouter();
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
          <th>จำนวนพี่{camp.groupName}ที่ชอบ</th>
          <th>จำนวนพี่ปีโตที่ชอบ</th>
          {authCamp ? <th>ค่าย {camp.campName}</th> : null}
          {baans.map(({ name }, i) => (
            <th key={i}>
              {camp.groupName}
              {name}
            </th>
          ))}
        </tr>
        {songs.map((song, songIndex) => {
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
              <td>{song.petoLike}</td>
              {authCamp ? (
                <td>
                  <Checkbox
                    onChange={setSwop(song._id, setCampSongIds)}
                    checked={campSongIds.includes(song._id)}
                  />
                </td>
              ) : null}
              {baans.map((skip, baanIndex) => {
                return (
                  <td key={baanIndex}>
                    <Checkbox
                      onChange={setSwop2DimensionArray(
                        song._id,
                        baanIndex,
                        setArrayOfBaanSongLists
                      )}
                      checked={arrayOfBaanSongLists[baanIndex].includes(
                        song._id
                      )}
                    />
                  </td>
                );
              })}
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
              baans: baans.map(({ _id }, i) => ({
                _id,
                songIds: arrayOfBaanSongLists[i],
              })),
              camps: [
                {
                  _id: camp._id,
                  songIds: campSongIds,
                },
              ],
              userLikeSongIds,
            },
            token
          );
        }}
      />
      {baans.map((baan, i) => (
        <div
          key={i}
          onClick={() => {
            router.push(`/authPart/${partIdString}/song/${baan._id}`);
          }}
        >
          {baan.name}
        </div>
      ))}
    </div>
  );
}
