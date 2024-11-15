"use client";

import Link from "next/link";
import { InterPartFront, InterWorkingItem, MyMap } from "../../interface";
import { MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import FinishButton from "./FinishButton";
import createWorkingItem from "@/libs/camp/createWorkingItem";
import SelectTemplate from "./SelectTemplate";
import updateWorkingItem from "@/libs/camp/updateWorkingItem";
import deleteWorkingItem from "@/libs/camp/deleteWorkingItem";
import React from "react";
export default function EditWorkingItem({
  workingItem,
  parts,
  token,
  auth,
}: {
  token: string;
  workingItem: InterWorkingItem;
  parts: InterPartFront[];
  auth: boolean;
}) {
  const partMap: MyMap[] = [];
  let i = 0;
  while (i < parts.length) {
    const part = parts[i++];

    partMap.push({ key: part._id, value: part.partName });
  }
  const [password, setPassword] = useState<string>("null");
  const [newName, setNewName] = useState<string | null>(null);
  const [newLink, setNewLink] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(workingItem.link);
  const [name, setName] = useState<string>(workingItem.name);
  const [status, setStatus] = useState<"not start" | "in process" | "done">(
    workingItem.status
  );
  return (
    <div>
      <table>
        <tr>
          <th>id</th>
          <th>งาน</th>
          <th>สถานะ</th>
          <th>link</th>
          <th>ฝ่าย</th>
          <th>จาก</th>
          <th>งานถัดไป</th>
        </tr>
        <tr>
          <td>{workingItem._id.toString()}</td>
          <td>{workingItem.name}</td>
          <td>{workingItem.status}</td>
          <td>
            {workingItem.link ? (
              <Link href={workingItem.link}>{workingItem.link}</Link>
            ) : null}
          </td>
          <td>{workingItem.partName}</td>
          <td>{workingItem.fromId?.toString()}</td>
          <td>{workingItem.linkOutIds.map((o) => o.toString()).toString()}</td>
        </tr>
      </table>
      <div className="w-[100%] items-center bg-slate-600 p-10 rounded-3xl shadow-[25px_25px_40px_-10px_rgba(0,0,0,0.7)]">
        {auth ? (
          <div className="flex flex-row items-center my-5">
            <label className="w-2/5 text-2xl text-slate-200">link</label>
            <TextField
              name="Email"
              id="Email"
              className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
              onChange={(e) => setLink(e.target.value)}
              defaultValue={link}
            />
          </div>
        ) : null}
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">ทำอะไร</label>
          <TextField
            name="Tel"
            id="Tel"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setName(e.target.value)}
            defaultValue={name}
          />
        </div>
        <Select
          variant="standard"
          name="location"
          id="location"
          className="h-[2em] w-[200px]"
          defaultValue={status}
        >
          <MenuItem onClick={() => setStatus("not start")} value="ยังไม่เริ่ม">
            ยังไม่เริ่ม
          </MenuItem>
          <MenuItem onClick={() => setStatus("in process")} value="กำลังทำอยู่">
            กำลังทำอยู่
          </MenuItem>
          <MenuItem onClick={() => setStatus("done")} value="เสร็จแล้ว">
            เสร็จแล้ว
          </MenuItem>
        </Select>
        <FinishButton
          text="Update"
          onClick={() => {
            updateWorkingItem({ name, link, status }, workingItem._id, token);
          }}
        />
        <FinishButton
          text="Delete"
          onClick={() => {
            deleteWorkingItem(workingItem._id, token);
          }}
        />
      </div>
      <div className="w-[100%] items-center bg-slate-600 p-10 rounded-3xl shadow-[25px_25px_40px_-10px_rgba(0,0,0,0.7)]">
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">ทำอะไร</label>
          <TextField
            name="Tel"
            id="Tel"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">link</label>
          <TextField
            name="Email"
            id="Email"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setNewLink(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">รหัสผ่าน</label>
          <TextField
            name="Email"
            id="Email"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setPassword(e.target.value)}
            defaultValue={password}
          />
        </div>
        <SelectTemplate
          mapIn={partMap}
          select={(partId) => {
            if (newName) {
              createWorkingItem(
                {
                  name: newName,
                  link: newLink,
                  partId,
                  fromId: workingItem._id,
                  password: password ? password : "null",
                },
                token
              );
            }
          }}
          buttonText={"สร้างการทำงาน"}
        />
      </div>
    </div>
  );
}
/**export interface InterWorkingItem {

    name: string,
    link: string|null,
    status: 'not start' | 'in process' | 'done',
    partId: mongoose.Types.ObjectId,
    linkOutIds: mongoose.Types.ObjectId[],
    fromId: mongoose.Types.ObjectId | null,
    createBy: mongoose.Types.ObjectId,
    _id: mongoose.Types.ObjectId,
    password:string
} */
