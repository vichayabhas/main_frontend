"use client";
import React from "react";
import { getBackendUrl, SocketReady } from "../../../utility/setup";
import TopMenuItem from "../../../randomthing/TopMenuItem";
import styles from "../../../randomthing/topMenu.module.css";
import AllInOneLock from "@/components/utility/AllInOneLock";
import ImagesFromUrl from "@/components/utility/ImagesFromUrl";
import ShowOwnCampData from "../components/general/ShowOwnCampData";
import {
  GetPetoData,
  AllPlaceData,
  InterCampDict,
} from "../../../../../interface";
import { RealTimeFoodUpdate } from "../../meal/setup";
import { io } from "socket.io-client";
import { RealTimeCamp } from "../../authPart/UpdateCampClient";
import { RealTimePart } from "../../authPart/UpdatePartClient";
import ShowOrders from "../components/general/ShowOrders";
import ShowItems from "../components/general/ShowItems";
import ActionPlanAndTrackingSheetTap from "../components/general/ActionPlanAndTrackingSheetTap";
import PartAndQuestionTap from "../components/part/PartAndQuestionTap";
import PlaceTable from "../components/general/PlaceTable";
import PartClient from "../components/part/PartClient";
import PartJob from "../components/part/PartJob";
import CampDictClient from "../components/general/CampDictClient";
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
  const [meals, setMeals] = React.useState(data.meals);
  const [camp, setCamp] = React.useState(data.camp);
  const [partPlace, setPartPlace] = React.useState(data.partPlace);
  const [campDicts, setCampDicts] = React.useState(data.campDicts);
  const [partDicts, setPartDicts] = React.useState(data.partDicts);
  const socket = io(getBackendUrl());
  const realTimeFoodUpdate = new RealTimeFoodUpdate(campMemberCard._id, socket);
  const realTimeCamp = new RealTimeCamp(camp._id, socket);
  const realTimePart = new RealTimePart(part._id, socket);
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
    realTimeCamp.listen(setCamp);
    realTimePart.listen(setPartPlace, allPlaceData);
    realTimeCampDicts.listen(setCampDicts);
    realTimePartDicts.listen(setPartDicts);
    return () => {
      realTimeFoodUpdate.disconnect();
      realTimeCamp.disconnect();
      realTimePart.disconnect();
      realTimeCampDicts.disconnect();
      realTimePartDicts.disconnect();
    };
  });
  return (
    <>
      {user.mode == "nong" ? (
        <div className={styles.menuContainerCamp}>
          <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
            <ActionPlanAndTrackingSheetTap
              camp={camp}
              campRole="peto"
              userRole={user.role}
              mode={user.mode}
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
        <div className={styles.menuContainerCamp}>
          <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
            <ActionPlanAndTrackingSheetTap
              camp={camp}
              campRole="peto"
              userRole={user.role}
              mode={user.mode}
            />
            <PartAndQuestionTap campId={camp._id} />
          </div>
        </div>
      )}
      <div style={{ height: "80px" }}></div>
      <ImagesFromUrl urls={camp.pictureUrls} />
      <AllInOneLock mode={user.mode}>
        <PlaceTable user={user} partData={{ part, partPlace }} />
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
        types="campMemberCard"
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
        camp={camp}
        campDicts={campDicts}
        role="peto"
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
