"use client";
import chatStyle from "../../chat/chat.module.css";
import React from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { downloadText, getBackendUrl } from "../../utility/setup";
import TopMenuItem from "../../randomthing/TopMenuItem";
import styles from "../../randomthing/topmenu.module.css";
import AllInOneLock from "@/components/utility/AllInOneLock";
import FinishButton from "@/components/utility/FinishButton";
import ImagesFromUrl from "@/components/utility/ImagesFromUrl";
import ShowOwnCampData from "./components/ShowOwnCampData";
import { GetPetoData, AllPlaceData } from "../../../../interface";
import PartJob from "./components/PartJob";
import PartClient from "./components/PartClient";
import { RealTimeFoodUpdate } from "../meal/setup";
import { io } from "socket.io-client";
import { RealTimeCamp } from "../authPart/UpdateCampClient";
import { RealTimePart } from "../authPart/UpdatePartClient";
import ShowOrders from "./components/ShowOrders";
import ShowItems from "./components/ShowItems";
export default function PetoCampClient({
  data,
  token,
  allPlaceData,
}: {
  data: GetPetoData;
  token: string;
  allPlaceData: AllPlaceData;
}) {
  const {
    user,
    campMemberCard,
    healthIssue,
    displayOffset,
    selectOffset,
    part,
    petos,
    pees,
    partJobs,
    partOrders,
    campMemberCardOrders,
    items,
  } = data;
  const ref = React.useRef(null);
  const download = useDownloadExcel({
    currentTableRef: ref.current,
    filename: "ห้องฝ่าย",
  });
  const [meals, setMeals] = React.useState(data.meals);
  const [camp, setCamp] = React.useState(data.camp);
  const [partPlace, setPartPlace] = React.useState(data.partPlace);
  const socket = io(getBackendUrl());
  const realTimeFoodUpdate = new RealTimeFoodUpdate(campMemberCard._id, socket);
  const realTimeCamp = new RealTimeCamp(camp._id, socket);
  const realTimePart = new RealTimePart(part._id, socket);
  React.useEffect(() => {
    realTimeFoodUpdate.listen(setMeals);
    realTimeCamp.listen(setCamp);
    realTimePart.listen(setPartPlace, allPlaceData);
    return () => {
      realTimeFoodUpdate.disconect();
      realTimeCamp.disconect();
      realTimePart.disconect();
    };
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
      <ShowItems
        from={{ partId: part._id }}
        items={items}
        camp={camp}
        campMemberCardId={campMemberCard._id}
        token={token}
        mode={user.mode}
        allPlaceData={allPlaceData}
      />
      <ShowOrders
        mode={user.mode}
        orders={campMemberCardOrders}
        filename={`orderที่ ${user.nickname} ${user.name} ${user.lastname} สั่ง`}
        displayOffset={displayOffset}
        role="pee"
        roomId={campMemberCard._id}
        types='campMemberCard'
      />
      <AllInOneLock mode={user.mode}>
        <ShowOrders
          mode={user.mode}
          orders={partOrders}
          filename={`orderในฝ่าย${part.partName}`}
          displayOffset={displayOffset}
          role="pee"
          roomId={part._id}
          types='part'
        />
      </AllInOneLock>
      <AllInOneLock token={token}>
        <ShowOwnCampData
          user={user}
          campMemberCard={campMemberCard}
          healthIssue={healthIssue}
          meals={meals}
          displayOffset={displayOffset}
        />
      </AllInOneLock>
    </>
  );
}
