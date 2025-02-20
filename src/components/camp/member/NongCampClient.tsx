"use client";

import { GetNongData } from "../../../../interface";

import ImagesFromUrl from "../../utility/ImagesFromUrl";
import ShowOwnCampData from "../ShowOwnCampData";
import chatStyle from '../../chat/chat.module.css';
import React from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { downloadText } from "../../utility/setup";
import TopMenuItem from "../../randomthing/TopMenuItem";
import styles from '../../randomthing/topmenu.module.css';
import AllInOneLock from "@/components/utility/AllInOneLock";
import FinishButton from "@/components/utility/FinishButton";
import BaanMembers from "./BaanMembers";

export default function NongCampClient({
  data: {
    user,
    camp,
    campMemberCard,
    baan,
    normal,
    boy,
    girl,
    pees,
    nongs,
    meals,
    healthIssue,
    displayOffset,
  },
  token,
}: {
  token: string;
  data: GetNongData;
}) {
  const ref = React.useRef(null);
  const download = useDownloadExcel({
    currentTableRef: ref.current,
    filename: `ห้อง${camp.groupName} ${
      campMemberCard.sleepAtCamp ? "และห้องนอน" : ""
    }`,
  });
  return (
    <>
      <div className={styles.menucontainerCamp}>
        <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
          <AllInOneLock
            lock={
              !(
                camp.canNongSeeAllActionPlan &&
                (user.role != "nong" || camp.canNongAccessDataWithRoleNong)
              )
            }
          >
            <TopMenuItem
              title="action plan"
              pageRef={`/camp/${camp._id}/actionPlan`}
            />
          </AllInOneLock>
          <AllInOneLock
            lock={
              !(
                camp.canNongSeeAllTrackingSheet &&
                (user.role != "nong" || camp.canNongAccessDataWithRoleNong)
              )
            }
          >
            <TopMenuItem
              title="tracking sheet"
              pageRef={`/camp/${camp._id}/trackingSheet`}
            />
          </AllInOneLock>
          <TopMenuItem
            title="คุยส่วนตัวกับพี่"
            pageRef={`/camp/${camp._id}/allNongChat`}
          />
          <TopMenuItem
            title="คุยกันในบ้าน"
            pageRef={`/camp/${camp._id}/baan/nongChat`}
          />
          <TopMenuItem
            title="ตอบคำถาม"
            pageRef={`/camp/${camp._id}/answerTheQuestion`}
          />
          <TopMenuItem
            title="อ่านแชตทั้งหมด"
            pageRef={`/camp/${camp._id}/allChat`}
          />
        </div>
      </div>
      <div style={{ height: "80px" }}></div>
      <ImagesFromUrl urls={camp.pictureUrls} />
      <div
        style={{
          overflow: "hidden",
          borderRadius: "25px",
          padding: "20px",
          backgroundColor: "#961A1D",
          width: "80%",
          marginLeft: "10%",
        }}
      >
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
            <td className={chatStyle.cell2}>ห้อง</td>
            <th className={chatStyle.cell1}>ชั้น</th>
            <th className={chatStyle.cell2}>ตึก</th>
          </tr>
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
              ห้อง{camp.groupName}
              {baan.name}
            </td>
            <td className={chatStyle.cell2}>{normal?.room.toString()}</td>
            <td className={chatStyle.cell1}>{normal?.floor.toString()}</td>
            <td className={chatStyle.cell2}>
              {normal?.buildingName.toString()}
            </td>
          </tr>
          <AllInOneLock
            mode={user.mode}
            role={campMemberCard.role}
            bypass={campMemberCard.sleepAtCamp && user.gender == "Male"}
            lock={camp.nongSleepModel == "ไม่มีการค้างคืน"}
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
                ห้องนอน{camp.groupName}
                {baan.name}น้องผู้ชาย
              </td>
              <td className={chatStyle.cell2}>{boy?.room.toString()}</td>
              <td className={chatStyle.cell1}>{boy?.floor.toString()}</td>
              <td className={chatStyle.cell2}>
                {boy?.buildingName.toString()}
              </td>
            </tr>
          </AllInOneLock>
          <AllInOneLock
            mode={user.mode}
            role={campMemberCard.role}
            bypass={campMemberCard.sleepAtCamp && user.gender == "Female"}
            lock={camp.nongSleepModel == "ไม่มีการค้างคืน"}
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
                ห้องนอน{camp.groupName}
                {baan.name}น้องผู้หญิง
              </td>
              <td className={chatStyle.cell2}>{girl?.room.toString()}</td>
              <td className={chatStyle.cell1}>{girl?.floor.toString()}</td>
              <td className={chatStyle.cell2}>
                {girl?.buildingName.toString()}
              </td>
            </tr>
          </AllInOneLock>
        </table>
        <FinishButton onClick={download.onDownload} text={downloadText} />
      </div>
      <BaanMembers
        baan={baan}
        campRole="nong"
        pees={pees}
        nongs={nongs}
        camp={camp}
      />
      <ShowOwnCampData
        token={token}
        user={user}
        campMemberCard={campMemberCard}
        healthIssue={healthIssue}
        meals={meals}
        displayOffset={displayOffset}
      />
    </>
  );
}
