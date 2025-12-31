"use client";

import { AllPlaceData, GetNongData } from "../../../../interface";
import ImagesFromUrl from "../../utility/ImagesFromUrl";
import ShowOwnCampData from "./components/ShowOwnCampData";
import React from "react";
import { getBackendUrl, setBoolean } from "../../utility/setup";
import styles from "../../randomthing/topMenu.module.css";
import AllInOneLock from "@/components/utility/AllInOneLock";
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
import ActionPlanAndTrackingSheetTap from "./components/ActionPlanAndTrackingSheetTap";
import ChatAndQuestionTap from "./components/ChatAndQuestionTap";
import PlaceTable from "./components/PlaceTable";
import { getFillTimeRegisterId, RealTimeBaanJob } from "./components/setup";
import BaanJob from "./components/BaanJob";

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
  const [meals, setMeals] = React.useState(data.meals);
  const [baan, setBaan] = React.useState(data.baan);
  const [boy, setBoy] = React.useState(data.boy);
  const [girl, setGirl] = React.useState(data.girl);
  const [normal, setNormal] = React.useState(data.normal);
  const [camp, setCamp] = React.useState(data.camp);
  const [baanJobs, setBaanJobs] = React.useState(data.baanJobs);
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
  const realTimeBaanJob = new RealTimeBaanJob(baan._id, socket);
  React.useEffect(() => {
    realTimeFoodUpdate.listen(setMeals);
    realTimeBaan.listen();
    realTimeCamp.listen(setCamp);
    realTimeBaanJob.listen((data) =>
      setBaanJobs(getFillTimeRegisterId(data, campMemberCard._id))
    );
    return () => {
      realTimeFoodUpdate.disconnect();
      realTimeBaan.disconnect();
      realTimeCamp.disconnect();
      realTimeBaanJob.disconnect();
    };
  });
  const [showAllGroups, setShowAllGroups] = React.useState(false);
  return (
    <>
      <div className={styles.menuContainerCamp}>
        <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
          <ActionPlanAndTrackingSheetTap
            camp={camp}
            campRole="nong"
            userRole={user.role}
            mode={user.mode}
          />
          <ChatAndQuestionTap campId={camp._id} role="nong" />
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
        <PlaceTable
          user={user}
          baanData={{ baan, camp, campMemberCard, boy, girl, normal }}
        />
      </div>
      <BaanMembers
        baan={baan}
        campRole="nong"
        pees={pees}
        nongs={nongs}
        camp={camp}
        user={user}
        healthIssue={healthIssue}
        token={token}
      />
      <BaanJob
        token={token}
        role="nong"
        baanJobs={baanJobs}
        baan={baan}
        camp={camp}
        campMemberCard={campMemberCard}
        user={user}
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
        types="campMemberCard"
      />
      <AllInOneLock lock={!camp.canNongSeeBaanOrder}>
        <ShowOrders
          mode={user.mode}
          orders={baanOrders}
          filename={`orderใน${camp.groupName}${baan.name}`}
          displayOffset={displayOffset}
          role="nong"
          roomId={baan._id}
          types="baan"
        />
      </AllInOneLock>
      <ShowOwnCampData
        user={user}
        campMemberCard={campMemberCard}
        healthIssue={healthIssue}
        meals={meals}
        displayOffset={displayOffset}
        token={token}
      />
    </>
  );
}
