import { stringToId } from "@/components/setup";
import getHeathIssue from "@/libs/user/getHeathIssue";
import getUser from "@/libs/user/getUser";
import React from "react";
export default async function HelthIshuePage({
  params,
}: {
  params: { hid: string };
}) {
  const healthIssueId = stringToId(params.hid);
  const heathIssue = await getHeathIssue(healthIssueId);
  const user = await getUser(heathIssue.userId);
  return (
    <div className="flex flex-row h-auto">
      <div className="w-1/5 h-auto relative rounded-t-lg"></div>

      <div className="w-3/5 h-auto p-[10px]">
        <div className="text-left pl-5">
          <div className="text-3xl"></div>
          <table>
            <tr>
              <th>ชื่อเล่น</th>
              <th>ชื่อจริง</th>
              <th>นามสกุล</th>
              <th>แพ้อาหารอะไรบ้าง</th>
              <th>เน้นย้ำเรื่องอาหารอะไรบ้าง</th>
              <th>แพ้ยาอะไรบ้าง</th>
              <th>เพิ่มเติม</th>
              <th>กินเผ็ดได้หรือไม่</th>
              {heathIssue.isWearing ? <th>ใส่แพมเพิสหรือไม่</th> : null}
            </tr>
            <tr>
              <td>{user.nickname}</td>
              <td>{user.name}</td>
              <td>{user.lastname}</td>
              <td>{heathIssue.food}</td>
              <td>{heathIssue.foodConcern}</td>
              <td>{heathIssue.medicine}</td>
              <td>{heathIssue.extra}</td>
              <td>{heathIssue.spicy ? "ไม่ได้" : "ได้"}</td>
              {heathIssue.isWearing ? <td> ใส่ </td> : null}
            </tr>
          </table>
          <div className="text-2xl my-10"></div>
        </div>
      </div>
      <div className="w-1/5 h-auto bg-slate-800 rounded-xl hover:bg-slate-600"></div>
    </div>
  );
}
