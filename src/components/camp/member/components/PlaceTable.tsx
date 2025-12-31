"use client";
import React from "react";
import chatStyle from "../../../chat/chat.module.css";
import {
  BasicCamp,
  BasicBaan,
  BasicUser,
  InterCampMemberCard,
  ShowPlace,
  BasicPart,
} from "../../../../../interface";
import AllInOneLock, { checkValid } from "@/components/utility/AllInOneLock";
import { useDownloadExcel } from "react-export-table-to-excel";
import { downloadText, getLastAnd, ifIsTrue } from "@/components/utility/setup";
import FinishButton from "@/components/utility/FinishButton";
export default function PlaceTable({
  baanData,
  partData,
  user,
}: {
  baanData?: {
    camp: BasicCamp;
    baan: BasicBaan;
    campMemberCard: InterCampMemberCard;
    normal: ShowPlace | null;
    boy: ShowPlace | null;
    girl: ShowPlace | null;
  };
  partData?: { partPlace: ShowPlace | null; part: BasicPart };
  user: BasicUser;
}) {
  const filenameParts: string[] = [];
  if (baanData) {
    filenameParts.push(`ห้อง${baanData.camp.groupName}${baanData.baan.name}`);
    ifIsTrue(
      checkValid({
        role: baanData.campMemberCard.role,
        mode: user.mode,
        bypass: baanData.campMemberCard.sleepAtCamp && user.gender == "Male",
        lock: baanData.camp.nongSleepModel == "ไม่มีการค้างคืน",
      }),
      `ห้องนอน${baanData.camp.nongCall}ผู้ชาย${baanData.camp.groupName}${baanData.baan.name}`,
      filenameParts
    );
    ifIsTrue(
      checkValid({
        role: baanData.campMemberCard.role,
        mode: user.mode,
        bypass: baanData.campMemberCard.sleepAtCamp && user.gender == "Female",
        lock: baanData.camp.nongSleepModel == "ไม่มีการค้างคืน",
      }),
      `ห้องนอน${baanData.camp.nongCall}ผู้หญิง${baanData.camp.groupName}${baanData.baan.name}`,
      filenameParts
    );
  }
  if (partData) {
    filenameParts.push(`ห้องฝ่าย${partData.part.partName}`);
  }
  const ref = React.useRef<HTMLTableElement>(null);
  const download = useDownloadExcel({
    currentTableRef: ref.current,
    filename: getLastAnd(filenameParts),
  });
  return (
    <>
      <table
        style={{
          width: "80%",
          marginLeft: "10%",
        }}
        ref={ref}
      >
        <tr
          style={{
            border: "solid",
            borderColor: "white",
          }}
        >
          <th
            style={{
              textAlign: "left",
            }}
            className={chatStyle.cell1}
          >
            สถานที่
          </th>
          <th className={chatStyle.cell2}>ห้อง</th>
          <th className={chatStyle.cell1}>ชั้น</th>
          <th className={chatStyle.cell2}>ตึก</th>
        </tr>
        {baanData ? (
          <>
            <tr
              style={{
                border: "solid",
                borderColor: "white",
              }}
            >
              <td
                style={{
                  textAlign: "left",
                }}
                className={chatStyle.cell1}
              >
                ห้อง{baanData.camp.groupName}
                {baanData.baan.name}
              </td>
              <td className={chatStyle.cell2}>
                {baanData.normal?.room.toString()}
              </td>
              <td className={chatStyle.cell1}>
                {baanData.normal?.floor.toString()}
              </td>
              <td className={chatStyle.cell2}>
                {baanData.normal?.buildingName.toString()}
              </td>
            </tr>
            <AllInOneLock
              mode={user.mode}
              role={baanData.campMemberCard.role}
              bypass={
                baanData.campMemberCard.sleepAtCamp && user.gender == "Male"
              }
              lock={baanData.camp.nongSleepModel == "ไม่มีการค้างคืน"}
            >
              <tr
                style={{
                  border: "solid",
                  borderColor: "white",
                }}
              >
                <td
                  style={{
                    textAlign: "left",
                  }}
                  className={chatStyle.cell1}
                >
                  ห้องนอน{baanData.camp.groupName}
                  {baanData.baan.name}น้องผู้ชาย
                </td>
                <td className={chatStyle.cell2}>
                  {baanData.boy?.room.toString()}
                </td>
                <td className={chatStyle.cell1}>
                  {baanData.boy?.floor.toString()}
                </td>
                <td className={chatStyle.cell2}>
                  {baanData.boy?.buildingName.toString()}
                </td>
              </tr>
            </AllInOneLock>
            <AllInOneLock
              mode={user.mode}
              role={baanData.campMemberCard.role}
              bypass={
                baanData.campMemberCard.sleepAtCamp && user.gender == "Female"
              }
              lock={baanData.camp.nongSleepModel == "ไม่มีการค้างคืน"}
            >
              <tr
                style={{
                  border: "solid",
                  borderColor: "white",
                }}
              >
                <td
                  style={{
                    textAlign: "left",
                  }}
                  className={chatStyle.cell1}
                >
                  ห้องนอน{baanData.camp.groupName}
                  {baanData.baan.name}น้องผู้หญิง
                </td>
                <td className={chatStyle.cell2}>
                  {baanData.girl?.room.toString()}
                </td>
                <td className={chatStyle.cell1}>
                  {baanData.girl?.floor.toString()}
                </td>
                <td className={chatStyle.cell2}>
                  {baanData.girl?.buildingName.toString()}
                </td>
              </tr>
            </AllInOneLock>
          </>
        ) : null}
        {partData ? (
          <AllInOneLock mode={user.mode}>
            <tr
              style={{
                border: "solid",
                borderColor: "white",
              }}
            >
              <td
                style={{
                  textAlign: "left",
                }}
                className={chatStyle.cell1}
              >
                ห้องฝ่าย{partData.part.partName}
              </td>
              <td className={chatStyle.cell2}>
                {partData.partPlace?.room.toString()}
              </td>
              <td className={chatStyle.cell1}>
                {partData.partPlace?.floor.toString()}
              </td>
              <td className={chatStyle.cell2}>
                {partData.partPlace?.buildingName.toString()}
              </td>
            </tr>
          </AllInOneLock>
        ) : null}
      </table>
      <FinishButton text={downloadText} onClick={download.onDownload} />
    </>
  );
}
