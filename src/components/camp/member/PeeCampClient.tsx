"use client";

import chatStyle from "../../chat/chat.module.css";
import React from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { AddRemoveHigh, downloadText, setBoolean } from "../../utility/setup";
import TopMenuItem from "../../randomthing/TopMenuItem";
import styles from "../../randomthing/topmenu.module.css";
import ImageAndDescriptions from "../ImageAndDescriptions";
import UserNameTable from "../../utility/UserNameTable";
import { Checkbox } from "@mui/material";
import PartJob from "../PartJob";
import registerJob from "@/libs/camp/registerJob";
import AllInOneLock from "@/components/utility/AllInOneLock";
import FinishButton from "@/components/utility/FinishButton";
import { GetPeeData, AllPlaceData, Id } from "../../../../interface";
import BaanMembers from "./BaanMembers";
import ImagesFromUrl from "@/components/utility/ImagesFromUrl";
import PartClient from "../PartClient";
import ShowOwnCampData from "../ShowOwnCampData";
import MirrorClient from "./MirrorClient";
import SubGroupClient from "./SubGroupClient";

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
    partJobs,
    baanJobs,
    mirrorData,
    defaultGroup,
    groups,
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
  const baanRef = React.useRef(null);
  const baanDownload = useDownloadExcel({
    currentTableRef: baanRef.current,
    filename: `หน้าที่ของ${camp.groupName}${baan.name}`,
  });
  const [removeTimeRegisterIds, setRemoveTimeRegisterIds] = React.useState<
    Id[]
  >([]);
  const [addJobIds, setaddJobIds] = React.useState<Id[]>([]);

  const manageJobId = new AddRemoveHigh(
    addJobIds,
    setaddJobIds,
    removeTimeRegisterIds,
    setRemoveTimeRegisterIds
  );
  const [showAllGroups, setShowAllGroups] = React.useState(false);

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
                },
                token
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
