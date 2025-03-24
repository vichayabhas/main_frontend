"use client";

import planUpdateCamp from "@/libs/camp/planUpdateCamp";
import {
  downloadText,
  getBackendUrl,
  getId,
  modifyElementInUseStateArray,
  peeLookupNong,
  setMap,
  SocketReady,
  waiting,
} from "../../utility/setup";
import CampNumberTable from "../../utility/CampNumberTable";
import React from "react";
import Waiting from "../../utility/Waiting";
import { useDownloadExcel } from "react-export-table-to-excel";
import PlaceSelect from "@/components/randomthing/PlaceSelect";
import AllInOneLock from "@/components/utility/AllInOneLock";
import FinishButton from "@/components/utility/FinishButton";
import {
  BasicUser,
  GetAllPlanData,
  AllPlaceData,
  InterPlace,
  boyZoneLadyZoneStates,
  PlanTrigger,
} from "../../../../interface";
import SetIndexButton from "@/components/utility/SetIndexButton";
import { io } from "socket.io-client";
import { RealTimeCamp } from "./UpdateCampClient";
interface BundleRoleAndUser {
  role: "พี่" | "น้อง" | "ปีโต";
  user: BasicUser;
}
const socket = io(getBackendUrl());
export default function PlanClient({
  data,
  token,
  allPlaceData,
}: {
  data: GetAllPlanData;
  token: string;
  allPlaceData: AllPlaceData;
}) {
  const [camp, setCamp] = React.useState(data.camp);
  const [baanDatas, setBaanDatas] = React.useState(data.baanDatas);
  const [partDatas, setPartDatas] = React.useState(data.partDatas);
  const [boys, setBoys] = React.useState<(InterPlace | null)[]>(
    baanDatas.map((baan) => baan.boy)
  );
  const [girls, setGirls] = React.useState<(InterPlace | null)[]>(
    baanDatas.map((baan) => baan.girl)
  );
  const [normals, setNormals] = React.useState<(InterPlace | null)[]>(
    baanDatas.map((baan) => baan.normal)
  );
  const [partPlaces, setPartPlaces] = React.useState<(InterPlace | null)[]>(
    partDatas.map((part) => part.place)
  );
  const [index, setIndex] = React.useState(
    boyZoneLadyZoneStates.findIndex((v) => v == camp.boyZoneLadyZoneState)
  );
  const realTimeCamp = new RealTimeCamp(camp._id, socket);

  const planSocket = new SocketReady<PlanTrigger>(socket, "updatePlanData");
  const room = camp._id.toString();
  React.useEffect(() => {
    planSocket.listen(room, (newData) => {
      setBaanDatas(newData.baanDatas);
      setPartDatas(newData.partDatas);
      setBoys(newData.baanDatas.map((baan) => baan.boy));
      setGirls(newData.baanDatas.map((baan) => baan.girl));
      setNormals(newData.baanDatas.map((baan) => baan.normal));
      setPartPlaces(newData.partDatas.map((part) => part.place));
      setIndex(
        boyZoneLadyZoneStates.findIndex(
          (v) => v == newData.boyZoneLadyZoneState
        )
      );
    });
    realTimeCamp.listen(setCamp);

    return () => {
      planSocket.disconnect();
      realTimeCamp.disconnect();
    };
  });
  function peeToBundle(user: BasicUser): BundleRoleAndUser {
    return { user, role: "พี่" };
  }
  function nongToBundle(user: BasicUser): BundleRoleAndUser {
    return { user, role: "น้อง" };
  }
  function petoToBundle(user: BasicUser): BundleRoleAndUser {
    return { user, role: "ปีโต" };
  }
  const [timeOut, setTimeOut] = React.useState<boolean>(false);
  const baanRef = React.useRef(null);
  const partRef = React.useRef(null);
  const baanDownload = useDownloadExcel({
    currentTableRef: baanRef.current,
    filename: `สถานที่ใช้เป็นห้อง${data.camp.groupName}ทั้งหมด`,
  });
  const partDownload = useDownloadExcel({
    currentTableRef: partRef.current,
    filename: "สถานที่ใช้เป็นห้องฝ่ายทั้งหมด",
  });
  return (
    <div
      style={{
        color: "white",
        backgroundColor: "gray",
        width: "80%",
        marginLeft: "10%",
        padding: "20px",
        borderRadius: "30px",
      }}
    >
      {timeOut ? (
        <Waiting />
      ) : (
        <>
          {camp.nongSleepModel != "ไม่มีการค้างคืน" ? (
            <SetIndexButton
              array={boyZoneLadyZoneStates}
              index={index}
              setIndex={setIndex}
              isCycle
              nextText={
                boyZoneLadyZoneStates[
                  boyZoneLadyZoneStates.length - 1 == index ? 0 : index + 1
                ]
              }
              beforeText={
                boyZoneLadyZoneStates[
                  index == 0 ? boyZoneLadyZoneStates.length - 1 : index - 1
                ]
              }
              middleText={boyZoneLadyZoneStates[index]}
            />
          ) : null}
          <table ref={baanRef}>
            <tr>
              <th>{camp.groupName}ทั้งหมด</th>
              <th>ห้อง{camp.groupName}ปกติ</th>
              {camp.nongSleepModel != "ไม่มีการค้างคืน" ? (
                <>
                  <th>ห้องนอนน้องผู้ชาย</th>
                  <th>ห้องนอนน้องผู้หญิง</th>
                </>
              ) : null}
            </tr>
            {baanDatas.map((baan, i) => (
              <tr key={i}>
                <td>{baan.baan.name}</td>
                <td>
                  <PlaceSelect
                    allPlaceData={allPlaceData}
                    buildingText="ตึก"
                    place={normals[i]}
                    placeText="ชั้นและตึก"
                    onClick={setMap(
                      setNormals,
                      modifyElementInUseStateArray(i)
                    )}
                  />
                </td>
                {camp.nongSleepModel != "ไม่มีการค้างคืน" ? (
                  <>
                    <td>
                      <PlaceSelect
                        allPlaceData={allPlaceData}
                        buildingText="ตึก"
                        place={boys[i]}
                        placeText="ชั้นและตึก"
                        onClick={setMap(
                          setBoys,
                          modifyElementInUseStateArray(i)
                        )}
                      />
                    </td>
                    <td>
                      <PlaceSelect
                        allPlaceData={allPlaceData}
                        buildingText="ตึก"
                        place={girls[i]}
                        placeText="ชั้นและตึก"
                        onClick={setMap(
                          setGirls,
                          modifyElementInUseStateArray(i)
                        )}
                      />
                    </td>
                  </>
                ) : null}
              </tr>
            ))}
          </table>
          <FinishButton text={downloadText} onClick={baanDownload.onDownload} />
          <table ref={partRef}>
            <tr>
              <th>ฝ่ายทั้งหมด</th>
              <th>ห้องฝ่าย</th>
            </tr>
            {partDatas.map((part, i) => (
              <tr key={i}>
                <td>{part.name}</td>
                <td>
                  <PlaceSelect
                    allPlaceData={allPlaceData}
                    buildingText="ตึก"
                    place={partPlaces[i]}
                    placeText="ชั้นและตึก"
                    onClick={setMap(
                      setPartPlaces,
                      modifyElementInUseStateArray(i)
                    )}
                  />
                </td>
              </tr>
            ))}
          </table>
          <FinishButton text={downloadText} onClick={partDownload.onDownload} />
          <FinishButton
            text="update สถานที่"
            onClick={async () => {
              await waiting(async () => {
                await planUpdateCamp(
                  {
                    baanDatas: data.baanDatas.map((baan, i) => ({
                      _id: baan.baan._id,
                      boyId: getId(boys[i]),
                      girlId: getId(girls[i]),
                      normalId: getId(normals[i]),
                    })),
                    partDatas: data.partDatas.map((part, i) => ({
                      _id: part._id,
                      placeId: getId(partPlaces[i]),
                    })),
                    _id: camp._id,
                    boyZoneLadyZoneState: boyZoneLadyZoneStates[index],
                  },
                  token,
                  planSocket,
                  room
                );
              }, setTimeOut);
            }}
          />
        </>
      )}
      <AllInOneLock lock={camp.nongSleepModel == "ไม่มีการค้างคืน"}>
        จำนวนสมาชิกชายที่ค้างคืน
        <CampNumberTable
          isHavePeto={
            camp.memberStructure == "nong->highSchool,pee->1year,peto->2upYear"
          }
          main={data.boySleepNumber}
          baanNumbers={data.baanBoySleeps}
          partNumbers={data.partBoySleeps}
          groupName={camp.groupName}
          filename="สมาชิกชายที่ค้างคืน"
          nongCall={camp.nongCall}
        />
        จำนวนสมาชิกหญิงที่ค้างคืน
        <CampNumberTable
          isHavePeto={
            camp.memberStructure == "nong->highSchool,pee->1year,peto->2upYear"
          }
          main={data.girlSleepNumber}
          baanNumbers={data.baanGirlSleeps}
          partNumbers={data.partGirlSleeps}
          groupName={camp.groupName}
          filename="สมาชิกหญิงที่ค้างคืน"
          nongCall={camp.nongCall}
        />
        {data.baanSleepDatas.map((baan, i) => {
          const boyRef = React.useRef(null);
          const girlRef = React.useRef(null);
          const boyDownload = useDownloadExcel({
            currentTableRef: boyRef.current,
            filename: `รายชื่อ${camp.groupName}${baan.name}ผู้ชายที่นอนค้างคืน`,
          });
          const girlDownload = useDownloadExcel({
            currentTableRef: girlRef.current,
            filename: `รายชื่อ${camp.groupName}${baan.name}ผู้หญิงที่นอนค้างคืน`,
          });
          return (
            <div key={i}>
              รายชื่อ{camp.groupName}
              {baan.name}ผู้ชายที่นอนค้างคืน
              <table ref={boyRef}>
                <tr>
                  <th>ชือเล่น</th>
                  <th>ชื่อจริง</th>
                  <th>นามสกุล</th>
                  <th>พี่หรือน้อง</th>
                </tr>
                {peeLookupNong(
                  baan.peeBoys.map(peeToBundle),
                  baan.nongBoys.map(nongToBundle)
                ).map((user, i) => (
                  <tr key={i}>
                    <td>{user.user.nickname}</td>
                    <td>{user.user.name}</td>
                    <td>{user.user.lastname}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </table>
              <FinishButton
                text={downloadText}
                onClick={boyDownload.onDownload}
              />
              รายชื่อ{camp.groupName}
              {baan.name}ผู้หญิงที่นอนค้างคืน
              <table ref={girlRef}>
                <tr>
                  <th>ชือเล่น</th>
                  <th>ชื่อจริง</th>
                  <th>นามสกุล</th>
                  <th>พี่หรือน้อง</th>
                </tr>
                {peeLookupNong(
                  baan.peeGirls.map(peeToBundle),
                  baan.nongGirls.map(nongToBundle)
                ).map((user, i) => (
                  <tr key={i}>
                    <td>{user.user.nickname}</td>
                    <td>{user.user.name}</td>
                    <td>{user.user.lastname}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </table>
              <FinishButton
                text={downloadText}
                onClick={girlDownload.onDownload}
              />
            </div>
          );
        })}
        {data.partSleepDatas.map((part, i) => {
          const boyRef = React.useRef(null);
          const girlRef = React.useRef(null);
          const boyDownload = useDownloadExcel({
            currentTableRef: boyRef.current,
            filename: `รายชื่อฝ่าย${part.name}ผู้ชายที่นอนค้างคืน`,
          });
          const girlDownload = useDownloadExcel({
            currentTableRef: girlRef.current,
            filename: `รายชื่อฝ่าย${part.name}ผู้หญิงที่นอนค้างคืน`,
          });
          return (
            <div key={i}>
              รายชื่อฝ่าย{part.name}ผู้ชายที่นอนค้างคืน
              <table ref={boyRef}>
                <tr>
                  <th>ชือเล่น</th>
                  <th>ชื่อจริง</th>
                  <th>นามสกุล</th>
                  <th>พี่หรือน้อง</th>
                </tr>
                {part.peeBoys
                  .map(peeToBundle)
                  .concat(part.petoBoys.map(petoToBundle))
                  .map((user, i) => (
                    <tr key={i}>
                      <td>{user.user.nickname}</td>
                      <td>{user.user.name}</td>
                      <td>{user.user.lastname}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
              </table>
              <FinishButton
                text={downloadText}
                onClick={boyDownload.onDownload}
              />
              รายชื่อฝ่าย{part.name}ผู้หญิงที่นอนค้างคืน
              <table ref={girlRef}>
                <tr>
                  <th>ชือเล่น</th>
                  <th>ชื่อจริง</th>
                  <th>นามสกุล</th>
                  <th>พี่หรือน้อง</th>
                </tr>
                {part.peeGirls
                  .map(peeToBundle)
                  .concat(part.petoGirls.map(petoToBundle))
                  .map((user, i) => (
                    <tr key={i}>
                      <td>{user.user.nickname}</td>
                      <td>{user.user.name}</td>
                      <td>{user.user.lastname}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
              </table>
              <FinishButton
                text={downloadText}
                onClick={girlDownload.onDownload}
              />
            </div>
          );
        })}
      </AllInOneLock>
    </div>
  );
}
