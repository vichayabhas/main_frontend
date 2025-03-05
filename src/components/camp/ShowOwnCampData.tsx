"use client";
import dayjs from "dayjs";
import React from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import {
  GetMeals,
  HeathIssueBody,
  InterCampMemberCard,
  BasicUser,
  UpdateTimeOffsetRaw,
} from "../../../interface";
import AllInOneLock from "../utility/AllInOneLock";
import FinishButton from "../utility/FinishButton";
import GetTimeHtml from "../utility/GetTimeHtml";
import { downloadText, copy } from "../utility/setup";

export default function ShowOwnCampData({
  token,
  healthIssue,
  campMemberCard,
  user,
  meals,
  displayOffset,
}: {
  token: string;
  healthIssue: HeathIssueBody;
  campMemberCard: InterCampMemberCard;
  user: BasicUser;
  meals: GetMeals[];
  displayOffset: UpdateTimeOffsetRaw;
}) {
  const ownDataRef = React.useRef(null);
  const mealRef = React.useRef(null);
  const ownDataDownload = useDownloadExcel({
    currentTableRef: ownDataRef.current,
    filename: `ข้อมูลส่วนตัวของ${user.name}`,
  });
  const mealDownload = useDownloadExcel({
    currentTableRef: mealRef.current,
    filename: `ข้อมูลอาหารของ${user.name}`,
  });
  return (
    <AllInOneLock token={token}>
      <table ref={ownDataRef}>
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
      <FinishButton text={downloadText} onClick={ownDataDownload.onDownload} />
      <table ref={mealRef}>
        <tr>
          <th>วันเวลา</th>
          <th>อาหารอะไรที่คุณกินได้</th>
          <th>อาหารอะไรที่คุณกินไม่ได้หรือเตรียมไว้สำหรับคนที่แพ้อาหาร</th>
        </tr>
        {meals
          .map(copy)
          .sort((a, b) => dayjs(a.time.toString()).diff(b.time.toString()))
          .map((meal, i) => (
            <tr key={i}>
              <td>
                <GetTimeHtml
                  offset={displayOffset}
                  input={meal.time.toString()}
                />
              </td>
              <td>{meal.whiteLists.map((food) => ` ${food.name} `)}</td>
              <td>{meal.blackLists.map((food) => ` ${food.name} `)}</td>
            </tr>
          ))}
      </table>
      <FinishButton text={downloadText} onClick={mealDownload.onDownload} />
    </AllInOneLock>
  );
}
