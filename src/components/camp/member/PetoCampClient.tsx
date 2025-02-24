"use client";
import chatStyle from "../../chat/chat.module.css";
import React from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { downloadText } from "../../utility/setup";
import TopMenuItem from "../../randomthing/TopMenuItem";
import styles from "../../randomthing/topmenu.module.css";
import AllInOneLock from "@/components/utility/AllInOneLock";
import FinishButton from "@/components/utility/FinishButton";
import ImagesFromUrl from "@/components/utility/ImagesFromUrl";
import PartClient from "../PartClient";
import ShowOwnCampData from "../ShowOwnCampData";
import { GetPetoData, AllPlaceData } from "../../../../interface";
import PartJob from "../PartJob";
export default function PetoCampClient({
  data: {
    user,
    camp,
    campMemberCard,
    meals,
    healthIssue,
    displayOffset,
    selectOffset,
    partPlace,
    part,
    petos,
    pees,
    partJobs,
  },
  token,
  allPlaceData,
}: {
  data: GetPetoData;
  token: string;
  allPlaceData: AllPlaceData;
}) {
  const ref = React.useRef(null);
  const download = useDownloadExcel({
    currentTableRef: ref.current,
    filename: "ห้องฝ่าย",
  });
  return (
    <>
      {user.mode == "nong" ? (
        <div className={styles.menucontainerCamp}>
          <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
            <AllInOneLock
              lock={
                !camp.canNongSeeAllActionPlan ||
                !camp.canNongAccessDataWithRoleNong
              }
            >
              <TopMenuItem
                title="action plan"
                pageRef={`/camp/${camp._id}/actionPlan`}
              />
            </AllInOneLock>
            <AllInOneLock
              lock={
                !camp.canNongSeeAllTrackingSheet ||
                !camp.canNongAccessDataWithRoleNong
              }
            >
              <TopMenuItem
                title="tracking sheet"
                pageRef={`/camp/${camp._id}/trackingSheet`}
              />
            </AllInOneLock>
            <TopMenuItem
              title="พี่บ้านคุยกัน"
              pageRef={`/camp/${camp._id}/peebaanChat`}
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
      ) : (
        <div className={styles.menucontainerCamp}>
          <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
            <TopMenuItem
              title="action plan"
              pageRef={`/camp/${camp._id}/actionPlan`}
            />
            <TopMenuItem
              title="tracking sheet"
              pageRef={`/camp/${camp._id}/trackingSheet`}
            />
            <TopMenuItem
              title="พี่บ้านคุยกัน"
              pageRef={`/camp/${camp._id}/peebaanChat`}
            />
            <TopMenuItem
              title="คุยกันในฝ่าย"
              pageRef={`/camp/${camp._id}/part`}
            />
            <TopMenuItem
              title="รวมคำถามและคำตอบ"
              pageRef={`/camp/${camp._id}/allAnswerAndQuestion`}
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
      )}
      <div style={{ height: "80px" }}></div>
      <ImagesFromUrl urls={camp.pictureUrls} />
      <AllInOneLock mode={user.mode}>
        <table
          style={{
            width: "100%",
          }}
          ref={ref}
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
              สถานที่
            </td>
            <td className={chatStyle.cell2}>ห้อง</td>
            <td className={chatStyle.cell1}>ชั้น</td>
            <td className={chatStyle.cell2}>ตึก</td>
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
              ห้องฝ่าย{part.partName}
            </td>
            <td className={chatStyle.cell2}>{partPlace?.room.toString()}</td>
            <td className={chatStyle.cell1}>{partPlace?.floor.toString()}</td>
            <td className={chatStyle.cell2}>
              {partPlace?.buildingName.toString()}
            </td>
          </tr>
        </table>
        <FinishButton text={downloadText} onClick={download.onDownload} />
      </AllInOneLock>
      <PartClient
        pees={pees}
        petos={petos}
        part={part}
        user={user}
        allPlaceData={allPlaceData}
        selectOffset={selectOffset}
        camp={camp}
      />
      <PartJob
        partJobs={partJobs}
        part={part}
        user={user}
        token={token}
        campMemberCardId={campMemberCard._id}
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
