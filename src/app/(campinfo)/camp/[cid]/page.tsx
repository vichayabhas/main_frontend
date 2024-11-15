import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AllInOneLock from "@/components/AllInOneLock";
import BaanMembers from "@/components/BaanMembers";
import ImagesFromUrl from "@/components/ImagesFromUrl";
import LocationDateReserve from "@/components/LocationDateReserve";
import NongPendingPage from "@/components/NongPendingPage";
import NongRegisterPage from "@/components/NongRegisterPage";
import NongSureClient from "@/components/NongSureClient";
import PartClient from "@/components/PartClient";
import { getAllPlaceData } from "@/components/placeSetUp";
import PushToCamps from "@/components/PushToCamps";
import { stringToId, emptyHealthIssue, hasKey } from "@/components/setup";
import ShowOwnCampData from "@/components/ShowOwnCampData";
import TopMenuCamp from "@/components/TopMenuCamp";
import getAllQuestion from "@/libs/camp/getAllQuestion";
import getBaan from "@/libs/camp/getBaan";
import getCamp from "@/libs/camp/getCamp";
import getNongCamp from "@/libs/camp/getNongCamp";
import getPart from "@/libs/camp/getPart";
import getPeeCamp from "@/libs/camp/getPeeCamp";
import getPetoCamp from "@/libs/camp/getPetoCamp";
import getUserFromCamp from "@/libs/camp/getUserFromCamp";
import getShowPlace from "@/libs/randomthing/getShowPlace";
import getCampMemberCardByCampId from "@/libs/user/getCampMemberCardByCampId";
import getHeathIssue from "@/libs/user/getHeathIssue";
import getTimeOffset from "@/libs/user/getTimeOffset";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import { Id, MyMap } from "../../../../../interface";
import chatStyle from "@/components/chat.module.css";
import React from "react";
export default async function HospitalDetailPage({
  params,
}: {
  params: { cid: string };
}) {
  const campId = params.cid;
  const session = await getServerSession(authOptions);
  if (session) {
    const allPlaceData = await getAllPlaceData();
    const campDetail = await getCamp(stringToId(campId));
    const token = session.user.token;
    const user = await getUserProfile(token);
    if (!user) {
      return <PushToCamps />;
    }
    const userId: Id= user._id;
    const timeOffset = await getTimeOffset(user.selectOffsetId);
    const partMap: MyMap[] = [];
    let i = 0;
    const questions = await getAllQuestion(token, campDetail._id);
    while (i < campDetail.partIds.length) {
      const part = await getPart(campDetail.partIds[i++]);
      partMap.push({ key: part._id, value: part.partName });
    }
    if (campDetail.nongIds.includes(userId)) {
      const campMemberCard = await getCampMemberCardByCampId(
        campDetail._id,
        token
      );
      const nongCamp = await getNongCamp(campMemberCard.campModelId, token);
      const baan = await getBaan(nongCamp.baanId);
      const pees = await getUserFromCamp("getPeesFromBaanId", baan._id);
      const nongs = await getUserFromCamp("getNongsFromBaanId", baan._id);
      console.log(nongs);
      const boy = baan.boySleepPlaceId
        ? await getShowPlace(baan.boySleepPlaceId)
        : null;
      const girl = baan.girlSleepPlaceId
        ? await getShowPlace(baan.girlSleepPlaceId)
        : null;
      const normal = baan.normalPlaceId
        ? await getShowPlace(baan.normalPlaceId)
        : null;
      const healthIssue = campMemberCard.healthIssueId
        ? await getHeathIssue(campMemberCard.healthIssueId)
        : emptyHealthIssue;
      return (
        <>
          <TopMenuCamp role="nong" mode={user.mode} campId={campDetail._id} />
          <div style={{ height: "80px" }}></div>
          <ImagesFromUrl urls={campDetail.pictureUrls} />
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
                  ห้อง{campDetail.groupName}
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
                bypass={campMemberCard.sleepAtCamp}
                lock={campDetail.nongSleepModel == "ไม่มีการค้างคืน"}
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
                    ห้องนอน{campDetail.groupName}
                    {baan.name}น้องผู้ชาย
                  </td>
                  <td className={chatStyle.cell2}>{boy?.room.toString()}</td>
                  <td className={chatStyle.cell1}>{boy?.floor.toString()}</td>
                  <td className={chatStyle.cell2}>
                    {boy?.buildingName.toString()}
                  </td>
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
                    ห้องนอน{campDetail.groupName}
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
          </div>
          <BaanMembers
            baan={baan}
            campRole="nong"
            pees={pees}
            nongs={nongs}
            camp={campDetail}
          />
          <ShowOwnCampData
            token={token}
            user={user}
            campMemberCard={campMemberCard}
            healthIssue={healthIssue}
          />
        </>
      );
    } else if (campDetail.peeIds.includes(userId)) {
      const campMemberCard = await getCampMemberCardByCampId(
        campDetail._id,
        token
      );
      const peeCamp = await getPeeCamp(campMemberCard.campModelId, token);
      const baan = await getBaan(peeCamp.baanId);
      const part = await getPart(peeCamp.partId);
      const pees = await getUserFromCamp("getPeesFromBaanId", baan._id);
      const nongs = await getUserFromCamp("getNongsFromBaanId", baan._id);
      const PeeParts = await getUserFromCamp("getPeesFromPartId", part._id);
      const peto = await getUserFromCamp("getPetosFromPartId", peeCamp.partId);
      const boy = baan.boySleepPlaceId
        ? await getShowPlace(baan.boySleepPlaceId)
        : null;
      const girl = baan.girlSleepPlaceId
        ? await getShowPlace(baan.girlSleepPlaceId)
        : null;
      const normal = baan.normalPlaceId
        ? await getShowPlace(baan.normalPlaceId)
        : null;
      const partPlace = part.placeId ? await getShowPlace(part.placeId) : null;
      const healthIssue = campMemberCard.healthIssueId
        ? await getHeathIssue(campMemberCard.healthIssueId)
        : emptyHealthIssue;
      return (
        <>
          <TopMenuCamp role="pee" mode={user.mode} campId={campDetail._id} />
          <div style={{ height: "80px" }}></div>
          <ImagesFromUrl urls={campDetail.pictureUrls} />
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
                  ห้อง{campDetail.groupName}
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
                bypass={campMemberCard.sleepAtCamp}
                lock={campDetail.nongSleepModel == "ไม่มีการค้างคืน"}
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
                    ห้องนอนน้องผู้ชาย{campDetail.groupName}
                    {baan.name}
                  </td>
                  <td className={chatStyle.cell2}>{boy?.room.toString()}</td>
                  <td className={chatStyle.cell1}>{boy?.floor.toString()}</td>
                  <td className={chatStyle.cell2}>
                    {boy?.buildingName.toString()}
                  </td>
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
                    ห้องนอนน้องผู้หญิง{campDetail.groupName}
                    {baan.name}
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
                  <td className={chatStyle.cell2}>
                    {partPlace?.room.toString()}
                  </td>
                  <td className={chatStyle.cell1}>
                    {partPlace?.floor.toString()}
                  </td>
                  <td className={chatStyle.cell2}>
                    {partPlace?.buildingName.toString()}
                  </td>
                </tr>
              </AllInOneLock>
            </table>
          </div>
          <BaanMembers
            baan={baan}
            campRole={user.mode}
            pees={pees}
            nongs={nongs}
            camp={campDetail}
          />
          <PartClient
            pees={PeeParts}
            petos={peto}
            part={part}
            user={user}
            allPlaceData={allPlaceData}
            timeOffset={timeOffset}
            camp={campDetail}
          />
          <ShowOwnCampData
            token={token}
            user={user}
            campMemberCard={campMemberCard}
            healthIssue={healthIssue}
          />
        </>
      );
    } else if (campDetail.petoIds.includes(userId)) {
      const campMemberCard = await getCampMemberCardByCampId(
        campDetail._id,
        token
      );
      const petoCamp = await getPetoCamp(campMemberCard.campModelId, token);
      const part = await getPart(petoCamp.partId);
      const PeeParts = await getUserFromCamp("getPeesFromPartId", part._id);
      const peto = await getUserFromCamp("getPetosFromPartId", petoCamp.partId);
      const partPlace = part.placeId ? await getShowPlace(part.placeId) : null;
      const healthIssue = campMemberCard.healthIssueId
        ? await getHeathIssue(campMemberCard.healthIssueId)
        : emptyHealthIssue;
      return (
        <>
          <TopMenuCamp role="peto" mode={user.mode} campId={campDetail._id} />
          <div style={{ height: "80px" }}></div>
          <ImagesFromUrl urls={campDetail.pictureUrls} />
          <AllInOneLock mode={user.mode}>
            <table
              style={{
                width: "100%",
              }}
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
                <td className={chatStyle.cell2}>
                  {partPlace?.room.toString()}
                </td>
                <td className={chatStyle.cell1}>
                  {partPlace?.floor.toString()}
                </td>
                <td className={chatStyle.cell2}>
                  {partPlace?.buildingName.toString()}
                </td>
              </tr>
            </table>
          </AllInOneLock>
          <PartClient
            pees={PeeParts}
            petos={peto}
            part={part}
            user={user}
            allPlaceData={allPlaceData}
            timeOffset={timeOffset}
            camp={campDetail}
          />
          <ShowOwnCampData
            token={token}
            user={user}
            campMemberCard={campMemberCard}
            healthIssue={healthIssue}
          />
        </>
      );
    } else if (hasKey(campDetail.nongPendingIds, user._id)) {
      return (
        <>
          <ImagesFromUrl urls={campDetail.pictureUrls} />
          <NongPendingPage
            camp={campDetail}
            user={user}
            token={token}
            questions={questions}
          />
        </>
      );
    } else if (campDetail.nongPaidIds.includes(user._id)) {
      return (
        <>
          <ImagesFromUrl urls={campDetail.pictureUrls} />
          <div>คุณได้จ่ายตังแล้ว</div>
        </>
      );
    } else if (campDetail.nongSureIds.includes(user._id)) {
      return (
        <>
          <ImagesFromUrl urls={campDetail.pictureUrls} />
          <div>คุณได้เข้าค่ายแน่นอน</div>
        </>
      );
    } else if (hasKey(campDetail.nongPassIds, user._id)) {
      return (
        <NongSureClient campDetail={campDetail} user={user} token={token} />
      );
    } else if (hasKey(campDetail.peePassIds, user._id)) {
      if (!campDetail.peeLock) {
        return (
          <LocationDateReserve partMap={partMap} token={token} user={user} />
        );
      }
    } else if (hasKey(campDetail.nongInterviewIds, user._id)) {
      return <div>น้องผ่านรอบเอกสารแล้ว</div>;
    } else {
      switch (campDetail.memberStructure) {
        case "nong->highSchool,pee->1year,peto->2upYear": {
          if (campDetail.open && user.role == "nong") {
            //console.log(user.role);
            return (
              <>
                <ImagesFromUrl urls={campDetail.pictureUrls} />
                <NongRegisterPage
                  camp={campDetail}
                  token={token}
                  user={user}
                  questions={questions}
                />
              </>
            );
          } else if (!campDetail.peeLock && user.role != "nong") {
            return (
              <>
                <ImagesFromUrl urls={campDetail.pictureUrls} />
                <LocationDateReserve
                  partMap={partMap}
                  token={token}
                  user={user}
                />
              </>
            );
          } else {
            alert("this camp is close");
            return <PushToCamps />;
          }
        }
        case "nong->1year,pee->2upYear": {
          if (
            campDetail.open &&
            user.fridayActEn &&
            !(user.role == "peto" || user.role == "admin")
          ) {
            //console.log(user.role);
            return (
              <>
                <ImagesFromUrl urls={campDetail.pictureUrls} />
                <NongRegisterPage
                  camp={campDetail}
                  token={token}
                  user={user}
                  questions={questions}
                />
              </>
            );
          } else if (
            !campDetail.peeLock &&
            (user.role == "peto" || user.role == "admin")
          ) {
            return (
              <>
                <ImagesFromUrl urls={campDetail.pictureUrls} />
                <LocationDateReserve
                  partMap={partMap}
                  token={token}
                  user={user}
                />
              </>
            );
          } else {
            alert("this camp is close");
            return <PushToCamps />;
          }
        }
        case "nong->highSchool,pee->2upYear": {
          if (campDetail.open && user.role == "nong") {
            //console.log(user.role);
            return (
              <>
                <ImagesFromUrl urls={campDetail.pictureUrls} />
                <NongRegisterPage
                  camp={campDetail}
                  token={token}
                  user={user}
                  questions={questions}
                />
              </>
            );
          } else if (
            !campDetail.peeLock &&
            (user.role == "peto" || user.role == "admin")
          ) {
            return (
              <>
                <ImagesFromUrl urls={campDetail.pictureUrls} />
                <LocationDateReserve
                  partMap={partMap}
                  token={token}
                  user={user}
                />
              </>
            );
          } else {
            alert("this camp is close");
            return <PushToCamps />;
          }
        }
        case "nong->highSchool,pee->allYear": {
          if (campDetail.open && user.role == "nong") {
            //console.log(user.role);
            return (
              <>
                <ImagesFromUrl urls={campDetail.pictureUrls} />
                <NongRegisterPage
                  camp={campDetail}
                  token={token}
                  user={user}
                  questions={questions}
                />
              </>
            );
          } else if (!campDetail.peeLock && user.role != "nong") {
            return (
              <>
                <ImagesFromUrl urls={campDetail.pictureUrls} />
                <LocationDateReserve
                  partMap={partMap}
                  token={token}
                  user={user}
                />
              </>
            );
          } else {
            alert("this camp is close");
            return <PushToCamps />;
          }
        }
      }
    }
  } else {
    return <PushToCamps />;
  }
}
