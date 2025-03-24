"use client";

import { AllPlaceData, GetNongData } from "../../../../interface";

import ImagesFromUrl from "../../utility/ImagesFromUrl";
import ShowOwnCampData from "./components/ShowOwnCampData";
import chatStyle from "../../chat/chat.module.css";
import React from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { downloadText, getBackendUrl, setBoolean } from "../../utility/setup";
import TopMenuItem from "../../randomthing/TopMenuItem";
import styles from "../../randomthing/topmenu.module.css";
import AllInOneLock from "@/components/utility/AllInOneLock";
import FinishButton from "@/components/utility/FinishButton";
import MirrorClient from "./components/MirrorClient";
import { Checkbox } from "@mui/material";
import SubGroupClient from "./components/SubGroupClient";
import BaanMembers from "./components/BaanMembers";
import { RealTimeFoodUpdate } from "../meal/setup";
import { io } from "socket.io-client";
import { RealTimeBaan } from "../authPart/UpdateBaanClient";
import { RealTimeCamp } from "../authPart/UpdateCampClient";
import ShowItems from "./components/ShowItems";
import ShowOrders from "./components/ShowOrders";

export default function NongCampClient({
  data,
  token,
  allPlaceData,
}: {
  token: string;
  data: GetNongData;
  allPlaceData: AllPlaceData;
}) {
  const {
    user,
    campMemberCard,
    pees,
    nongs,
    healthIssue,
    displayOffset,
    mirrorData,
    defaultGroup,
    groups,
    items,
    campMemberCardOrders,
    baanOrders,
  } = data;
  const ref = React.useRef(null);
  const [meals, setMeals] = React.useState(data.meals);
  const [baan, setBaan] = React.useState(data.baan);
  const [boy, setBoy] = React.useState(data.boy);
  const [girl, setGirl] = React.useState(data.girl);
  const [normal, setNormal] = React.useState(data.normal);
  const [camp, setCamp] = React.useState(data.camp);
  const socket = io(getBackendUrl());
  const realTimeFoodUpdate = new RealTimeFoodUpdate(campMemberCard._id, socket);
  const realTimeBaan = new RealTimeBaan(
    baan._id,
    socket,
    setBoy,
    setGirl,
    setNormal,
    setBaan,
    allPlaceData
  );
  const realTimeCamp = new RealTimeCamp(camp._id, socket);
  React.useEffect(() => {
    realTimeFoodUpdate.listen(setMeals);
    realTimeBaan.listen();
    realTimeCamp.listen(setCamp);
    return () => {
      realTimeFoodUpdate.disconnect();
      realTimeBaan.disconnect();
      realTimeCamp.disconnect();
    };
  });
  const download = useDownloadExcel({
    currentTableRef: ref.current,
    filename: `ห้อง${camp.groupName} ${
      campMemberCard.sleepAtCamp ? "และห้องนอน" : ""
    }`,
  });
  const [showAllGroups, setShowAllGroups] = React.useState(false);
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
      <div>
        แสดงกลุ่มทั้งหมดหรือไม่
        <Checkbox
          onChange={setBoolean(setShowAllGroups)}
          checked={showAllGroups}
        />
      </div>
      {showAllGroups ? (
        groups.map((group, i) => (
          <SubGroupClient
            key={i}
            data={group}
            baan={baan}
            camp={camp}
            campMemberCard={campMemberCard}
            token={token}
            user={user}
          />
        ))
      ) : defaultGroup ? (
        <SubGroupClient
          data={defaultGroup}
          baan={baan}
          camp={camp}
          campMemberCard={campMemberCard}
          token={token}
          user={user}
        />
      ) : null}
      <MirrorClient
        user={user}
        token={token}
        camp={camp}
        campMemberCardId={campMemberCard._id}
        mirrorData={mirrorData}
        nongs={nongs}
        pees={pees}
        baan={baan}
        timeOffset={displayOffset}
      />
      <ShowItems
        from={{ baanId: baan._id }}
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
        role="nong"
        roomId={campMemberCard._id}
        types='campMemberCard'
      />
      <AllInOneLock lock={!camp.canNongSeeBaanOrder}>
        <ShowOrders
          mode={user.mode}
          orders={baanOrders}
          filename={`orderใน${camp.groupName}${baan.name}`}
          displayOffset={displayOffset}
          role="nong"
          roomId={baan._id}
          types='baan'
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
