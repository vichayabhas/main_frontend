"use client";

import React from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import {
  AddRemoveHigh,
  downloadText,
  getBackendUrl,
  setBoolean,
} from "../../utility/setup";
import TopMenuItem from "../../randomthing/TopMenuItem";
import styles from "../../randomthing/topMenu.module.css";
import ImageAndDescriptions from "./components/ImageAndDescriptions";
import UserNameTable from "../../utility/UserNameTable";
import { Checkbox } from "@mui/material";
import PartJob from "./components/PartJob";
import registerJob from "@/libs/camp/registerJob";
import AllInOneLock from "@/components/utility/AllInOneLock";
import FinishButton from "@/components/utility/FinishButton";
import { GetPeeData, AllPlaceData, Id } from "../../../../interface";
import ImagesFromUrl from "@/components/utility/ImagesFromUrl";
import ShowOwnCampData from "./components/ShowOwnCampData";
import MirrorClient from "./components/MirrorClient";
import SubGroupClient from "./components/SubGroupClient";
import PartClient from "./components/PartClient";
import BaanMembers from "./components/BaanMembers";
import { RealTimeFoodUpdate } from "../meal/setup";
import { io } from "socket.io-client";
import { RealTimeBaan } from "../authPart/UpdateBaanClient";
import { RealTimeCamp } from "../authPart/UpdateCampClient";
import { RealTimePart } from "../authPart/UpdatePartClient";
import ShowOrders from "./components/ShowOrders";
import ShowItems from "./components/ShowItems";
import { getFillTimeRegisterId, RealTimeBaanJob } from "./components/setup";
import ActionPlanAndTrackingSheetTap from "./components/ActionPlanAndTrackingSheetTap";
import ChatAndQuestionTap from "./components/ChatAndQuestionTap";
import PartAndQuestionTap from "./components/PartAndQuestionTap";
import PlaceTable from "./components/PlaceTable";

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
  const realTimePart = new RealTimePart(part._id, socket);
  const realTimeBaanJob = new RealTimeBaanJob(baan._id, socket);
  React.useEffect(() => {
    realTimeFoodUpdate.listen(setMeals);
    realTimeBaan.listen();
    realTimeCamp.listen(setCamp);
    realTimePart.listen(setPartPlace, allPlaceData);
    realTimeBaanJob.listen((data) =>
      setBaanJobs(getFillTimeRegisterId(data, campMemberCard._id))
    );
    return () => {
      realTimeFoodUpdate.disconnect();
      realTimeBaan.disconnect();
      realTimeCamp.disconnect();
      realTimePart.disconnect();
      realTimeBaanJob.disconnect();
    };
  });
  const baanRef = React.useRef(null);
  const baanDownload = useDownloadExcel({
    currentTableRef: baanRef.current,
    filename: `หน้าที่ของ${camp.groupName}${baan.name}`,
  });
  const [removeTimeRegisterIds, setRemoveTimeRegisterIds] = React.useState<
    Id[]
  >([]);
  const [addJobIds, setAddJobIds] = React.useState<Id[]>([]);

  const manageJobId = new AddRemoveHigh(
    addJobIds,
    setAddJobIds,
    removeTimeRegisterIds,
    setRemoveTimeRegisterIds
  );
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
        baanId={baan._id}
      />
      <AllInOneLock mode={user.mode}>
        <div
          className="w-[100%] items-center p-10 rounded-3xl "
          style={{
            backgroundColor: "#961A1D",
            width: "70%",
            marginTop: "20px",
          }}
        >
          <table ref={baanRef}>
            <tr>
              <th>ชื่องาน</th>
              <th>จำนวนผู้ชาย</th>
              <th>จำนวนผู้หญิง</th>
              <th>จำนวนรวม</th>
              <th>รูปแบบการรับ</th>
              <th>select</th>
              <th>ผู้ชายที่ผ่าน</th>
              <th>ผู้หญิงที่ผ่าน</th>
              <th>ผู้ชายไม่ที่ผ่าน</th>
              <th>ผู้หญิงไม่ที่ผ่าน</th>
            </tr>
            {baanJobs.map((baanJob, i) => {
              return (
                <tr key={i}>
                  <td>{baanJob.name}</td>
                  <td>{baanJob.male}</td>
                  <td>{baanJob.female}</td>
                  <td>{baanJob.sum}</td>
                  <td>{baanJob.reqType}</td>
                  <td>
                    <Checkbox
                      onChange={manageJobId.set(
                        baanJob._id,
                        baanJob.timeRegisterId
                      )}
                      checked={manageJobId.get(
                        baanJob._id,
                        baanJob.timeRegisterId
                      )}
                    />
                  </td>
                  <td>
                    <UserNameTable inputs={baanJob.passMales} />
                  </td>
                  <td>
                    <UserNameTable inputs={baanJob.passFemales} />
                  </td>
                  <td>
                    <UserNameTable inputs={baanJob.failMales} />
                  </td>
                  <td>
                    <UserNameTable inputs={baanJob.failFemales} />
                  </td>
                </tr>
              );
            })}
          </table>
          <FinishButton text={downloadText} onClick={baanDownload.onDownload} />
          <FinishButton
            text="register"
            onClick={() =>
              registerJob(
                {
                  addJobIds,
                  removeTimeRegisterIds,
                  campMemberCardId: campMemberCard._id,
                  types: "baan",
                  fromId: baan._id,
                },
                token,
                socket
              )
            }
          />
        </div>
      </AllInOneLock>
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
