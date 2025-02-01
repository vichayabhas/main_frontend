"use client";

import { useDownloadExcel } from "react-export-table-to-excel";
import { AllPlaceData, GetPeeData } from "../../interface";
import AllInOneLock from "./AllInOneLock";
import BaanMembers from "./BaanMembers";
import FinishButton from "./FinishButton";
import ImagesFromUrl from "./ImagesFromUrl";
import PartClient from "./PartClient";
import ShowOwnCampData from "./ShowOwnCampData";
import React from "react";
import chatStyle from "@/components/chat.module.css";
import { downloadText } from "./setup";
import TopMenuItem from "./TopMenuItem";
import styles from "./topmenu.module.css";
import ImageAndDescriptions from "./ImageAndDescriptions";

export default function PeeCampClient({
  data: {
    user,
    camp,
    campMemberCard,
    baan,
    normal,
    boy,
    girl,
    peeBaans,
    nongBaans,
    meals,
    healthIssue,
    displayOffset,
    selectOffset,
    partPlace,
    part,
    petoParts,
    peeParts,
    imageAndDescriptions,
  },
  token,
  allPlaceData,
}: {
  data: GetPeeData;
  token: string;
  allPlaceData: AllPlaceData;
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
      {user.mode == "nong" ? (
        <div className={styles.menucontainerCamp}>
          <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
            <AllInOneLock
              bypass={
                camp.canNongSeeAllActionPlan &&
                camp.canNongAccessDataWithRoleNong
              }
              mode={user.mode}
            >
              <TopMenuItem
                title="action plan"
                pageRef={`/camp/${camp._id}/actionPlan`}
              />
            </AllInOneLock>
            <AllInOneLock
              bypass={
                camp.canNongSeeAllTrackingSheet &&
                camp.canNongAccessDataWithRoleNong
              }
              mode={user.mode}
            >
              <TopMenuItem
                title="tracking sheet"
                pageRef={`/camp/${camp._id}/trackingSheet`}
              />
            </AllInOneLock>
            <TopMenuItem
              title="คุยส่วนตัวกับน้อง"
              pageRef={`/camp/${camp._id}/allNongChat`}
            />
            <TopMenuItem
              title="คุยกันในบ้าน"
              pageRef={`/camp/${camp._id}/baan/nongChat`}
            />
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
              title="คุยส่วนตัวกับน้อง"
              pageRef={`/camp/${camp._id}/allNongChat`}
            />
            <TopMenuItem
              title="คุยกันในบ้าน+น้อง"
              pageRef={`/camp/${camp._id}/baan/nongChat`}
            />
            <TopMenuItem
              title="คุยกันในบ้าน+พี่บ้าน"
              pageRef={`/camp/${camp._id}/baan/nongChat`}
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
                ห้องฝ่าย{part.partName}
              </td>
              <td className={chatStyle.cell2}>{partPlace?.room.toString()}</td>
              <td className={chatStyle.cell1}>{partPlace?.floor.toString()}</td>
              <td className={chatStyle.cell2}>
                {partPlace?.buildingName.toString()}
              </td>
            </tr>
          </AllInOneLock>
        </table>
        <FinishButton onClick={download.onDownload} text={downloadText} />
      </div>
      <BaanMembers
        baan={baan}
        campRole={user.mode}
        pees={peeBaans}
        nongs={nongBaans}
        camp={camp}
      />
      <PartClient
        pees={peeParts}
        petos={petoParts}
        part={part}
        user={user}
        allPlaceData={allPlaceData}
        selectOffset={selectOffset}
        camp={camp}
      />
      <ImageAndDescriptions
        imageAndDescriptionsContainers={imageAndDescriptions}
        mode={user.mode}
        token={token}
        gender={user.gender}
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
