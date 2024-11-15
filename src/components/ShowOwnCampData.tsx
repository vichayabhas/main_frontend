import {
  HeathIssueBody,
  InterCampMemberCard,
  InterUser,
} from "../../interface";
import AllInOneLock from "./AllInOneLock";
import React from "react";

export default function ShowOwnCampData({
  token,
  healthIssue,
  campMemberCard,
  user,
}: {
  token: string;
  healthIssue: HeathIssueBody;
  campMemberCard: InterCampMemberCard;
  user: InterUser;
}) {
  return (
    <AllInOneLock token={token}>
      <table>
        <tr>
          <th>ชื่อเล่น</th>
          <th>ชื่อจริง</th>
          <th>นามสกุล</th>
          <th>มีกระติกน้ำหรือไม่</th>
          <th>ค้างคืนหรือไม่</th>
          <th>ขนาดเสื้อ</th>
          <th>แพ้อาหารอะไรบ้าง</th>
          <th>เน้นย้ำเรื่องอาหารอะไรบ้าง</th>
          <th>แพ้ยาอะไรบ้าง</th>
          <th>มีข้อจำกัดด้านความเชื่ออะไรบ้าง</th>
          <th>เพิ่มเติม</th>
          <th>กินเผ็ดได้หรือไม่</th>
          {healthIssue.isWearing ? <th>ใส่แพมเพิสหรือไม่</th> : null}
        </tr>
        <tr>
          <td>{user.nickname}</td>
          <td>{user.name}</td>
          <td>{user.lastname}</td>
          <td>
            {campMemberCard.haveBottle ? "มีกระติกน้ำ" : "ไม่มีกระติกน้ำ"}
          </td>
          <td>{campMemberCard.sleepAtCamp ? "นอนค้างคืน" : "ไม่นอนค้างคืน"}</td>
          <td>{campMemberCard.size}</td>
          <td>{healthIssue.food}</td>
          <td>{healthIssue.foodConcern}</td>
          <td>{healthIssue.medicine}</td>
          <td>{healthIssue.foodLimit}</td>
          <td>{healthIssue.extra}</td>
          <td>{healthIssue.spicy ? "ไม่ได้" : "ได้"}</td>
          {healthIssue.isWearing ? <td> ใส่ </td> : null}
        </tr>
      </table>
    </AllInOneLock>
  );
}
