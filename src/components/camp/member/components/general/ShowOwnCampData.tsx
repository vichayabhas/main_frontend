"use client";
import dayjs from "dayjs";
import React from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import {
  GetMeals,
  HealthIssueBody,
  InterCampMemberCard,
  BasicUser,
  UpdateTimeOffsetRaw,
  BasicCamp,
} from "../../../../../../interface";
import FinishButton from "../../../../utility/FinishButton";
import GetTimeHtml from "../../../../utility/GetTimeHtml";
import { downloadText, copy } from "../../../../utility/setup";
import AllInOneLock, {
  getDefaultLockInit,
} from "@/components/utility/AllInOneLock";

export default function ShowOwnCampData({
  healthIssue,
  campMemberCard,
  user,
  meals,
  displayOffset,
  token,
  camp,
}: {
  healthIssue: HealthIssueBody;
  campMemberCard: InterCampMemberCard;
  user: BasicUser;
  meals: GetMeals[];
  displayOffset: UpdateTimeOffsetRaw;
  token: string;
  camp: BasicCamp;
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
  const peeLink = React.useState(
    getDefaultLockInit({
      token,
      role: campMemberCard.role,
      inBaan: true,
      mode:user.mode
    })
  );
  const selfLink = React.useState(
    getDefaultLockInit({
      token,
    })
  );
  return (
    <div>
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
            <AllInOneLock role={campMemberCard.role} inBaan nongBypass>
              <th>
                note ในค่ายจาก
                {campMemberCard.role == "nong"
                  ? `พี่${camp.groupName}`
                  : user.mode == "pee"
                  ? "ฝ่ายประสาน ver. น้องเห็นได้"
                  : "เพื่อน"}
              </th>
            </AllInOneLock>
            <AllInOneLock
              role={campMemberCard.role}
              inBaan
              token={token}
              link={peeLink}
              mode={user.mode}
            >
              <th>note ในค่ายจากฝ่ายประสาน ver. น้องเห็นไม่ได้</th>
            </AllInOneLock>
            <AllInOneLock token={token} link={selfLink}>
              <th>note พิมเอง</th>
            </AllInOneLock>
            {healthIssue.isWearing ? <th>ใส่แพมเพิสหรือไม่</th> : null}
          </tr>
          <tr>
            <td>{user.nickname}</td>
            <td>{user.name}</td>
            <td>{user.lastname}</td>
            <td>
              {campMemberCard.haveBottle ? "มีกระติกน้ำ" : "ไม่มีกระติกน้ำ"}
            </td>
            <td>
              {campMemberCard.sleepAtCamp ? "นอนค้างคืน" : "ไม่นอนค้างคืน"}
            </td>
            <td>{campMemberCard.size}</td>
            <td>{healthIssue.food}</td>
            <td>{healthIssue.foodConcern}</td>
            <td>{healthIssue.medicine}</td>
            <td>{healthIssue.foodLimit}</td>
            <td>{healthIssue.extra}</td>
            <td>{healthIssue.spicy ? "ไม่ได้" : "ได้"}</td>
            <AllInOneLock role={campMemberCard.role} inBaan nongBypass>
              <td>
                {campMemberCard.nongReplaceExtra
                  ? campMemberCard.nongReplaceExtra
                  : healthIssue.extra}
              </td>
            </AllInOneLock>
            <AllInOneLock link={peeLink} alternativeChildren={<td></td>}>
              <td>
                {campMemberCard.peeReplaceExtra
                  ? campMemberCard.peeReplaceExtra
                  : healthIssue.extra}
              </td>
            </AllInOneLock>
            <AllInOneLock link={selfLink} alternativeChildren={<td></td>}>
              <td>{healthIssue.extra}</td>
            </AllInOneLock>
            {healthIssue.isWearing ? <td> ใส่ </td> : null}
          </tr>
        </table>
        <FinishButton
          text={downloadText}
          onClick={ownDataDownload.onDownload}
        />
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
    </div>
  );
}
