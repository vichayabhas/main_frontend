"use client";

import { useRef, useState } from "react";
import { GetMenuSongs, Id } from "../../interface";
import { useDownloadExcel } from "react-export-table-to-excel";
import { useRouter } from "next/navigation";
import React from "react";
import { Checkbox, MenuItem, Select, TextField } from "@mui/material";
import { downloadText, setSwop, setTextToInt, setTextToString } from "./setup";
import FinishButton from "./FinishButton";
import StringToHtml from "./StringToHtml";
import createSong from "@/libs/randomthing/createSong";
import { useSession } from "next-auth/react";
import addSongList from "@/libs/randomthing/addSongList";

export default function SongClient({ data }: { data: GetMenuSongs }) {
  const ref = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: ref.current,
    filename: "รายชื่อเพลงทั้งหมด",
  });
  const router = useRouter();
  const [songIds, setSongIds] = useState<Id[]>([]);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [time, setTime] = useState(0);
  const [link, setLink] = useState("");
  const [mode, setMode] = useState("");
  const { data: session } = useSession();
  const auth = data.authBaans.length + data.authCamps.length > 0;
  if (!auth) {
    setMode("ownLikeSongs");
    setSongIds(data.likeSongIds);
  }
  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      {auth ? (
        <Select
          variant="standard"
          name="location"
          id="location"
          className="h-[2em] w-[200px]"
        >
          <MenuItem
            onClick={() => {
              setMode("addLikeSong");
              setSongIds(data.likeSongIds);
            }}
            value={"เพลงทีชอบส่วนตัว"}
          >
            เพลงทีชอบส่วนตัว
          </MenuItem>
          {data.authBaans.map((baan, i) => {
            return (
              <MenuItem
                onClick={() => {
                  setSongIds(baan.data.songIds);
                  setMode(`addBaanSong/params/${baan.data._id}`);
                }}
                key={i}
                value={baan.showName}
              >
                {baan.showName}
              </MenuItem>
            );
          })}
          {data.authCamps.map((camp, i) => {
            return (
              <MenuItem
                onClick={() => {
                  setSongIds(camp.songIds);
                  setMode(`addCampSong/params/${camp._id}`);
                }}
                key={i}
                value={camp.campName}
              >
                {camp.campName}
              </MenuItem>
            );
          })}
        </Select>
      ) : null}
      <table ref={ref}>
        <tr>
          <th>ชื่อ</th>
          <th>เวลา</th>
          <th>คนร้อง</th>
          <th>คนชอบ</th>
          <th>link</th>
          <th>เพลงนี้ใช้ในค่าย</th>
          <th>เพลงนี้ใช้ในบ้าน</th>
          <th>ชอบหรือไม่</th>
          <th>ไปหน้าเพลง</th>
        </tr>
        {data.songs.map((song, i) => (
          <tr key={i}>
            <td>{song.name}</td>
            <td>{song.time}</td>
            <td>{song.author}</td>
            <td>{song.like}</td>
            <td>
              <StringToHtml input={song.link} />
            </td>
            <td>{song.campRelates.map((v) => ` ${v} `)}</td>
            <td>{song.baanRelates.map((v) => ` ${v} `)}</td>
            <td>
              <Checkbox
                onChange={setSwop(song._id, setSongIds)}
                checked={songIds.includes(song._id)}
              />
            </td>
            <td>
              <FinishButton
                text="ไป"
                onClick={() => router.push(`/song/${song._id}`)}
              />
            </td>
          </tr>
        ))}
      </table>
      <FinishButton text={downloadText} onClick={onDownload} />
      <form className="w-[30%] items-center bg-slate-600 p-10 rounded-3xl shadow-[25px_25px_40px_-10px_rgba(0,0,0,0.7)]">
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200"> ชื่อเพลง</label>
          <TextField
            name="Email"
            id="Email"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={setTextToString(setName)}
            value={name}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">คนร้อง</label>
          <TextField
            name="Tel"
            id="Tel"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={setTextToString(setAuthor, true)}
            value={author}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">เวลา</label>
          <TextField
            name="Tel"
            id="Tel"
            type="number"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={setTextToInt(setTime)}
            value={time.toString()}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">link</label>
          <TextField
            name="Tel"
            id="Tel"
            type="url"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={setTextToString(setLink)}
            value={link}
          />
        </div>
        <FinishButton
          text="create"
          onClick={() => {
            if (session) {
              createSong({ time, author, name, link }, session.user.token);
            }
          }}
        />
      </form>
      <FinishButton
        text="add"
        onClick={() => {
          if (session) {
            addSongList(songIds, mode, session.user.token);
          }
        }}
      />
    </div>
  );
}
/**export interface ShowSong {
  name: string;
  campNames: string[];
  baanNames: string[];
  author: string;
  time: number;
  link: string;
  like: number;
  _id: Id;
  baanRelates: string[];
  campRelates: string[];
  //private
} */
