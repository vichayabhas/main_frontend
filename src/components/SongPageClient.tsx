"use client";

import { Id, ShowSongPage } from "../../interface";
import React, { useState } from "react";
import { modifyElementInUseStateArray, setSwop } from "./setup";
import StringToHtml from "./StringToHtml";
import { Checkbox } from "@mui/material";
import FinishButton from "./FinishButton";
import { useSession } from "next-auth/react";
import updateSongPage from "@/libs/randomthing/updateSongPage";

export default function SongPageClient({ show }: { show: ShowSongPage }) {
  const [arrayOfCampSongLists, setArrayOfCampSongLists] = useState<Id[][]>(
    show.authCamps.map((camp) => camp.songIds)
  );
  const [arrayOfBaanSongLists, setArrayOfBaanSongLists] = useState<Id[][]>(
    show.authBaans.map((baan) => baan.data.songIds)
  );
  const [likeSong, setLikeSong] = useState(show.likeSongIds);
  const { data: session } = useSession();
  return (
    <div>
      <table>
        <tr>
          <th>ชื่อ</th>
          <th>เวลา</th>
          <th>คนร้อง</th>
          <th>คนชอบ</th>
          <th>link</th>
          <th>เพลงนี้ใช้ในค่าย</th>
          <th>เพลงนี้ใช้ในบ้าน</th>
        </tr>
        <tr>
          <td>{show.song.name}</td>
          <td>{show.song.time}</td>
          <td>{show.song.author}</td>
          <td>{show.song.like}</td>
          <td>
            <StringToHtml input={show.song.link} />
          </td>
          <td>{show.song.campRelates.map((v) => ` ${v} `)}</td>
          <td>{show.song.baanRelates.map((v) => ` ${v} `)}</td>
        </tr>
      </table>
      <table>
        <tr>
          <th>menu</th>
          <th>check</th>
        </tr>
        <tr>
          <td>ชอบส่วนตัวหรือไม่</td>
          <td>
            <Checkbox
              onChange={setSwop(show.song._id, setLikeSong)}
              checked={likeSong.includes(show.song._id)}
            />
          </td>
        </tr>
        {show.authBaans.map((baan, i) => {
          return (
            <tr key={i}>
              <td>{baan.showName}</td>
              <td>
                <Checkbox
                  onChange={setSwop(show.song._id, (c) => {
                    setArrayOfBaanSongLists((input) =>
                      modifyElementInUseStateArray<Id[]>(i)(c(input[i]), input)
                    );
                  })}
                  checked={arrayOfBaanSongLists[i].includes(show.song._id)}
                  //   onClick={()=>alert('gggg')}
                />
              </td>
            </tr>
          );
        })}
        {show.authCamps.map((camp, i) => {
          return (
            <tr key={i}>
              <td>{camp.campName}</td>
              <td>
                <Checkbox
                  onChange={setSwop(show.song._id, (c) => {
                    setArrayOfCampSongLists((input) =>
                      modifyElementInUseStateArray<Id[]>(i)(c(input[i]), input)
                    );
                  })}
                  checked={arrayOfCampSongLists[i].includes(show.song._id)}
                />
              </td>
            </tr>
          );
        })}
      </table>
      <FinishButton
        text="add"
        onClick={() => {
          if (session) {
            updateSongPage(
              {
                userLikeSongIds: likeSong,
                baans: show.authBaans.map(({ data: { _id } }, i) => ({
                  _id,
                  songIds: arrayOfBaanSongLists[i],
                })),
                camps: show.authCamps.map(({ _id }, i) => ({
                  _id,
                  songIds: arrayOfCampSongLists[i],
                })),
              },
              session.user.token
            );
          }
        }}
      />
    </div>
  );
}
