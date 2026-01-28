"use client";

import React from "react";
import { getBackendUrl, setBoolean, SocketReady } from "../../../utility/setup";
import TopMenuItem from "../../../randomthing/TopMenuItem";
import styles from "../../../randomthing/topMenu.module.css";
import ImageAndDescriptions from "../components/baan/ImageAndDescriptions";
import { Checkbox } from "@mui/material";
import AllInOneLock from "@/components/utility/AllInOneLock";
import {
  GetPeeData,
  AllPlaceData,
  InterCampDict,
} from "../../../../../interface";
import ImagesFromUrl from "@/components/utility/ImagesFromUrl";
import ShowOwnCampData from "../components/general/ShowOwnCampData";
import BaanMembers from "../components/baan/BaanMembers";
import { RealTimeFoodUpdate } from "../../meal/setup";
import { io } from "socket.io-client";
import { RealTimeBaan } from "../../authPart/UpdateBaanClient";
import { RealTimeCamp } from "../../authPart/UpdateCampClient";
import { RealTimePart } from "../../authPart/UpdatePartClient";
import ShowOrders from "../components/general/ShowOrders";
import ShowItems from "../components/general/ShowItems";
import {
  getFillTimeRegisterId,
  RealTimeBaanJob,
} from "../components/general/setup";
import ActionPlanAndTrackingSheetTap from "../components/general/ActionPlanAndTrackingSheetTap";
import ChatAndQuestionTap from "../components/baan/ChatAndQuestionTap";
import PartAndQuestionTap from "../components/part/PartAndQuestionTap";
import PlaceTable from "../components/general/PlaceTable";
import BaanJob from "../components/baan/BaanJob";
import MirrorClient from "../components/baan/MirrorClient";
import SubGroupClient from "../components/baan/SubGroupClient";
import PartClient from "../components/part/PartClient";
import PartJob from "../components/part/PartJob";
import CampDictClient from "../components/general/CampDictClient";

export default function PeeCampClient({
  data,
  token,
  allPlaceData,
}: {
  data: GetPeeData;
  token: string;
  allPlaceData: AllPlaceData;
}) {
  const {
    user,
    campMemberCard,
    peeBaans,
    nongBaans,
    healthIssue,
    displayOffset,
    selectOffset,
    part,
    petoParts,
    peeParts,
    imageAndDescriptions,
    partJobs,
    mirrorData,
    defaultGroup,
    groups,
    items,
    baanOrders,
    campMemberCardOrders,
    partOrders,
  } = data;
  const [meals, setMeals] = React.useState(data.meals);
  const [baan, setBaan] = React.useState(data.baan);
  const [boy, setBoy] = React.useState(data.boy);
  const [girl, setGirl] = React.useState(data.girl);
  const [normal, setNormal] = React.useState(data.normal);
  const [camp, setCamp] = React.useState(data.camp);
  const [partPlace, setPartPlace] = React.useState(data.partPlace);
  const [baanJobs, setBaanJobs] = React.useState(data.baanJobs);
  const [baanDicts, setBaanDicts] = React.useState(data.baanDicts);
  const [campDicts, setCampDicts] = React.useState(data.campDicts);
  const [partDicts, setPartDicts] = React.useState(data.partDicts);
  const socket = io(getBackendUrl());
  const realTimeFoodUpdate = new RealTimeFoodUpdate(campMemberCard._id, socket);
  const realTimeBaan = new RealTimeBaan(
    baan._id,
    socket,
    setBoy,
    setGirl,
    setNormal,
    setBaan,
    allPlaceData,
  );
  const realTimeCamp = new RealTimeCamp(camp._id, socket);
  const realTimePart = new RealTimePart(part._id, socket);
  const realTimeBaanJob = new RealTimeBaanJob(baan._id, socket);
  const realTimeBaanDicts = new SocketReady<InterCampDict[]>(
    socket,
    "baanUpdateDict",
    baan._id,
  );
  const realTimeCampDicts = new SocketReady<InterCampDict[]>(
    socket,
    "campUpdateDict",
    camp._id,
  );
  const realTimePartDicts = new SocketReady<InterCampDict[]>(
    socket,
    "partUpdateDict",
    part._id,
  );
  React.useEffect(() => {
    realTimeFoodUpdate.listen(setMeals);
    realTimeBaan.listen();
    realTimeCamp.listen(setCamp);
    realTimePart.listen(setPartPlace, allPlaceData);
    realTimeBaanJob.listen((data) =>
      setBaanJobs(getFillTimeRegisterId(data, campMemberCard._id)),
    );
    realTimeBaanDicts.listen(setBaanDicts);
    realTimeCampDicts.listen(setCampDicts);
    realTimePartDicts.listen(setPartDicts);
    return () => {
      realTimeFoodUpdate.disconnect();
      realTimeBaan.disconnect();
      realTimeCamp.disconnect();
      realTimePart.disconnect();
      realTimeBaanJob.disconnect();
      realTimeBaanDicts.disconnect();
      realTimePartDicts.disconnect();
      realTimeCampDicts.disconnect();
    };
  });
  const [showAllGroups, setShowAllGroups] = React.useState(false);

  return (
    <>
      {user.mode == "nong" ? (
        <div className={styles.menuContainerCamp}>
          <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
            <ActionPlanAndTrackingSheetTap
              camp={camp}
              campRole="pee"
              userRole={user.role}
              mode={user.mode}
            />
            <TopMenuItem
              title="พี่บ้านคุยกัน"
              pageRef={`/camp/${camp._id}/peebaanChat`}
            />
            <ChatAndQuestionTap campId={camp._id} role="pee" />
          </div>
        </div>
      ) : (
        <div className={styles.menuContainerCamp}>
          <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
            <ActionPlanAndTrackingSheetTap
              camp={camp}
              campRole="pee"
              userRole={user.role}
              mode={user.mode}
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
              pageRef={`/camp/${camp._id}/baan/peeChat`}
            />
            <PartAndQuestionTap campId={camp._id} />
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
        <PlaceTable
          baanData={{ baan, camp, boy, girl, campMemberCard, normal }}
          user={user}
          partData={{ part, partPlace }}
        />
      </div>
      <BaanMembers
        baan={baan}
        campRole={"pee"}
        pees={peeBaans}
        nongs={nongBaans}
        camp={camp}
        user={user}
        token={token}
        healthIssue={healthIssue}
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
        baanId={baan._id}
        role="pee"
      />
      <BaanJob
        token={token}
        role="pee"
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
        nongs={nongBaans}
        pees={peeBaans}
        baan={baan}
        timeOffset={displayOffset}
      />
      <PartJob
        user={user}
        part={part}
        partJobs={partJobs}
        token={token}
        campMemberCardId={campMemberCard._id}
      />
      <ShowItems
        from={{ baanId: baan._id, partId: part._id }}
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
        types="campMemberCard"
      />
      <ShowOrders
        mode={user.mode}
        orders={baanOrders}
        filename={`orderใน${camp.groupName}${baan.name}`}
        displayOffset={displayOffset}
        role="pee"
        roomId={baan._id}
        types="baan"
      />
      <AllInOneLock mode={user.mode}>
        <ShowOrders
          mode={user.mode}
          orders={partOrders}
          filename={`orderในฝ่าย${part.partName}`}
          displayOffset={displayOffset}
          role="pee"
          roomId={part._id}
          types="part"
        />
      </AllInOneLock>
      <CampDictClient
        user={user}
        baanData={{ baan, baanDicts }}
        camp={camp}
        campDicts={campDicts}
        role="pee"
        partData={{ part, partDicts }}
      />
      <ShowOwnCampData
        user={user}
        campMemberCard={campMemberCard}
        healthIssue={healthIssue}
        meals={meals}
        displayOffset={displayOffset}
        token={token}
        camp={camp}
      />
    </>
  );
}
