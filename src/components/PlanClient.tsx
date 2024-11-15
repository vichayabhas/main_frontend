"use client";

import { useState } from "react";
import {
  AllPlaceData,
  GetAllPlanData,
  InterPlace,
  InterUser,
} from "../../interface";
import AllInOneLock from "./AllInOneLock";
import PlaceSelect from "./PlaceSelect";
import FinishButton from "./FinishButton";
import planUpdateCamp from "@/libs/camp/planUpdateCamp";
import { getId, modifyElementInUseStateArray, peeLookupNong } from "./setup";
import CampNumberTable from "./CampNumberTable";
import React from "react";
interface BundleRoleAndUser {
  role: "พี่" | "น้อง" | "ปีโต";
  user: InterUser;
}
export default function PlanClient({
  data,
  token,
  allPlaceData,
}: {
  data: GetAllPlanData;
  token: string;
  allPlaceData: AllPlaceData;
}) {
  const [boys, setBoys] = useState<(InterPlace | null)[]>(
    data.baanDatas.map((baan) => baan.boy)
  );
  const [girls, setGirls] = useState<(InterPlace | null)[]>(
    data.baanDatas.map((baan) => baan.girl)
  );
  const [normals, setNormals] = useState<(InterPlace | null)[]>(
    data.baanDatas.map((baan) => baan.normal)
  );
  const [partPlaces, setPartPlaces] = useState<(InterPlace | null)[]>(
    data.partDatas.map((part) => part.place)
  );
  function peeToBundle(user: InterUser): BundleRoleAndUser {
    return { user, role: "พี่" };
  }
  function nongToBundle(user: InterUser): BundleRoleAndUser {
    return { user, role: "น้อง" };
  }
  function petoToBundle(user: InterUser): BundleRoleAndUser {
    return { user, role: "ปีโต" };
  }
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
      <table>
        <tr>
          <th>{data.groupName}ทั้งหมด</th>
          <th>ห้อง{data.groupName}ปกติ</th>
          {data.isOverNightCamp ? (
            <>
              <th>ห้องนอนน้องผู้ชาย</th>
              <th>ห้องนอนน้องผู้หญิง</th>
            </>
          ) : null}
        </tr>
        {data.baanDatas.map((baan, i) => (
          <tr key={i}>
            <td>{baan.name}</td>
            <td>
              <PlaceSelect
                allPlaceData={allPlaceData}
                buildingText="ตึก"
                place={normals[i]}
                placeText="ชั้นและตึก"
                onClick={(out) => {
                  setNormals(normals.map(modifyElementInUseStateArray(out,i)));
                }}
              />
            </td>
            {data.isOverNightCamp ? (
              <>
                <td>
                  <PlaceSelect
                    allPlaceData={allPlaceData}
                    buildingText="ตึก"
                    place={boys[i]}
                    placeText="ชั้นและตึก"
                    onClick={(out) => {
                      setBoys(boys.map(modifyElementInUseStateArray(out,i)));
                    }}
                  />
                </td>
                <td>
                  <PlaceSelect
                    allPlaceData={allPlaceData}
                    buildingText="ตึก"
                    place={girls[i]}
                    placeText="ชั้นและตึก"
                    onClick={(out) => {
                      setGirls(girls.map(modifyElementInUseStateArray(out,i)));
                    }}
                  />
                </td>
              </>
            ) : null}
          </tr>
        ))}
      </table>
      <table>
        <tr>
          <th>ฝ่ายทั้งหมด</th>
          <th>ห้องฝ่าย</th>
        </tr>
        {data.partDatas.map((part, i) => (
          <tr key={i}>
            <td>{part.name}</td>
            <td>
              <PlaceSelect
                allPlaceData={allPlaceData}
                buildingText="ตึก"
                place={partPlaces[i]}
                placeText="ชั้นและตึก"
                onClick={(out) => {
                  setPartPlaces(partPlaces.map(modifyElementInUseStateArray(out,i)));
                }}
              />
            </td>
          </tr>
        ))}
      </table>
      <FinishButton
        text="update สถานที่"
        onClick={() =>
          planUpdateCamp(
            {
              baanDatas: data.baanDatas.map((baan, i) => ({
                _id: baan._id,
                boyId: getId(boys[i]),
                girlId: getId(girls[i]),
                normalId: getId(normals[i]),
              })),
              partDatas: data.partDatas.map((part, i) => ({
                _id: part._id,
                placeId: getId(partPlaces[i]),
              })),
              _id: data._id,
            },
            token
          )
        }
      />
      <AllInOneLock lock={!data.isOverNightCamp}>
        จำนวนสมาชิกชายที่ค้างคืน
        <CampNumberTable
          isHavePeto={data.isHavePeto}
          main={data.boySleepNumber}
          baanNumbers={data.baanBoySleeps}
          partNumbers={data.partBoySleeps}
          groupName={data.groupName}
        />
        จำนวนสมาชิกหญิงที่ค้างคืน
        <CampNumberTable
          isHavePeto={data.isHavePeto}
          main={data.girlSleepNumber}
          baanNumbers={data.baanGirlSleeps}
          partNumbers={data.partGirlSleeps}
          groupName={data.groupName}
        />
        {data.baanSleepDatas.map((baan,i) => (
          <div key={i}>
            รายชื่อ{data.groupName}
            {baan.name}ผู้ชายที่นอนค้างคืน
            <table>
              <tr>
                <th>ชือเล่น</th>
                <th>ชื่อจริง</th>
                <th>นามสกุล</th>
                <th>พี่หรือน้อง</th>
              </tr>
              {peeLookupNong(
                baan.peeBoys.map(peeToBundle),
                baan.nongBoys.map(nongToBundle)
              ).map((user,i) => (
                <tr key={i}>
                  <td>{user.user.nickname}</td>
                  <td>{user.user.name}</td>
                  <td>{user.user.lastname}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </table>
            รายชื่อ{data.groupName}
            {baan.name}ผู้หญิงที่นอนค้างคืน
            <table>
              <tr>
                <th>ชือเล่น</th>
                <th>ชื่อจริง</th>
                <th>นามสกุล</th>
                <th>พี่หรือน้อง</th>
              </tr>
              {peeLookupNong(
                baan.peeGirls.map(peeToBundle),
                baan.nongGirls.map(nongToBundle)
              ).map((user,i) => (
                <tr key={i}>
                  <td>{user.user.nickname}</td>
                  <td>{user.user.name}</td>
                  <td>{user.user.lastname}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </table>
          </div>
        ))}
        {data.partSleepDatas.map((part,i) => (
          <div key={i}>
            รายชื่อฝ่าย{part.name}ผู้ชายที่นอนค้างคืน
            <table>
              <tr>
                <th>ชือเล่น</th>
                <th>ชื่อจริง</th>
                <th>นามสกุล</th>
                <th>พี่หรือน้อง</th>
              </tr>
              {part.peeBoys
                .map(peeToBundle)
                .concat(part.petoBoys.map(petoToBundle))
                .map((user,i) => (
                  <tr key={i}>
                    <td>{user.user.nickname}</td>
                    <td>{user.user.name}</td>
                    <td>{user.user.lastname}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
            </table>
            รายชื่อฝ่าย{part.name}ผู้หญิงที่นอนค้างคืน
            <table>
              <tr>
                <th>ชือเล่น</th>
                <th>ชื่อจริง</th>
                <th>นามสกุล</th>
                <th>พี่หรือน้อง</th>
              </tr>
              {part.peeGirls
                .map(peeToBundle)
                .concat(part.petoGirls.map(petoToBundle))
                .map((user,i) => (
                  <tr key={i}>
                    <td>{user.user.nickname}</td>
                    <td>{user.user.name}</td>
                    <td>{user.user.lastname}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
            </table>
          </div>
        ))}
      </AllInOneLock>
    </div>
  );
}
