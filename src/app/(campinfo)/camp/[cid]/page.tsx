import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ImagesFromUrl from "@/components/ImagesFromUrl";
import LocationDateReserve from "@/components/LocationDateReserve";
import NongPendingPage from "@/components/NongPendingPage";
import NongRegisterPage from "@/components/NongRegisterPage";
import NongSureClient from "@/components/NongSureClient";
import { getAllPlaceData } from "@/components/placeSetUp";
import PushToCamps from "@/components/PushToCamps";
import { stringToId, hasKey } from "@/components/setup";
import getAllQuestion from "@/libs/camp/getAllQuestion";
import getCamp from "@/libs/camp/getCamp";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import { Id, MyMap } from "../../../../../interface";
import React from "react";
import getParts from "@/libs/camp/getParts";
import NongCampClient from "@/components/NongCampClient";
import PeeCampClient from "@/components/PeeCampClient";
import PetoCampClient from "@/components/PetoCampClient";
import getNongCampData from "@/libs/camp/getNongCampData";
import getPeeCampData from "@/libs/camp/getPeeCampData";
import getPetoCampData from "@/libs/camp/getPetoCampData";
export default async function HospitalDetailPage({
  params,
}: {
  params: { cid: string };
}) {
  const session = await getServerSession(authOptions);
  if (session) {
    const allPlaceData = await getAllPlaceData();
    const camp = await getCamp(stringToId(params.cid));
    const token = session.user.token;
    const user = await getUserProfile(token);
    if (!user) {
      return <PushToCamps />;
    }
    const userId: Id = user._id;
    const partMap: MyMap[] = [];
    let i = 0;
    const questions = await getAllQuestion(token, camp._id);
    const parts = await getParts(camp._id, token);
    while (i < parts.length) {
      const part = parts[i++];
      partMap.push({ key: part._id, value: part.partName });
    }
    if (camp.nongIds.includes(userId)) {
      const data = await getNongCampData(camp._id, token);
      return <NongCampClient token={token} data={data} />;
    } else if (camp.peeIds.includes(userId)) {
      const data = await getPeeCampData(camp._id, token);
      return (
        <PeeCampClient data={data} token={token} allPlaceData={allPlaceData} />
      );
    } else if (camp.petoIds.includes(userId)) {
      const data = await getPetoCampData(camp._id, token);
      return (
        <PetoCampClient data={data} token={token} allPlaceData={allPlaceData} />
      );
    } else if (hasKey(camp.nongPendingIds, user._id)) {
      return (
        <>
          <ImagesFromUrl urls={camp.pictureUrls} />
          <NongPendingPage
            camp={camp}
            user={user}
            token={token}
            questions={questions}
          />
        </>
      );
    } else if (camp.nongPaidIds.includes(user._id)) {
      return (
        <>
          <ImagesFromUrl urls={camp.pictureUrls} />
          <div>คุณได้จ่ายตังแล้ว</div>
        </>
      );
    } else if (camp.nongSureIds.includes(user._id)) {
      return (
        <>
          <ImagesFromUrl urls={camp.pictureUrls} />
          <div>คุณได้เข้าค่ายแน่นอน</div>
        </>
      );
    } else if (hasKey(camp.nongPassIds, user._id)) {
      return <NongSureClient camp={camp} user={user} token={token} />;
    } else if (hasKey(camp.peePassIds, user._id)) {
      if (!camp.peeLock) {
        return (
          <LocationDateReserve partMap={partMap} token={token} user={user} />
        );
      }
    } else if (hasKey(camp.nongInterviewIds, user._id)) {
      return <div>น้องผ่านรอบเอกสารแล้ว</div>;
    } else {
      switch (camp.memberStructure) {
        case "nong->highSchool,pee->1year,peto->2upYear": {
          if (camp.open && user.role == "nong") {
            //console.log(user.role);
            return (
              <>
                <ImagesFromUrl urls={camp.pictureUrls} />
                <NongRegisterPage
                  camp={camp}
                  token={token}
                  user={user}
                  questions={questions}
                />
              </>
            );
          } else if (!camp.peeLock && user.role != "nong") {
            return (
              <>
                <ImagesFromUrl urls={camp.pictureUrls} />
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
            camp.open &&
            user.fridayActEn &&
            !(user.role == "peto" || user.role == "admin")
          ) {
            //console.log(user.role);
            return (
              <>
                <ImagesFromUrl urls={camp.pictureUrls} />
                <NongRegisterPage
                  camp={camp}
                  token={token}
                  user={user}
                  questions={questions}
                />
              </>
            );
          } else if (
            !camp.peeLock &&
            (user.role == "peto" || user.role == "admin")
          ) {
            return (
              <>
                <ImagesFromUrl urls={camp.pictureUrls} />
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
          if (camp.open && user.role == "nong") {
            return (
              <>
                <ImagesFromUrl urls={camp.pictureUrls} />
                <NongRegisterPage
                  camp={camp}
                  token={token}
                  user={user}
                  questions={questions}
                />
              </>
            );
          } else if (
            !camp.peeLock &&
            (user.role == "peto" || user.role == "admin")
          ) {
            return (
              <>
                <ImagesFromUrl urls={camp.pictureUrls} />
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
          if (camp.open && user.role == "nong") {
            //console.log(user.role);
            return (
              <>
                <ImagesFromUrl urls={camp.pictureUrls} />
                <NongRegisterPage
                  camp={camp}
                  token={token}
                  user={user}
                  questions={questions}
                />
              </>
            );
          } else if (!camp.peeLock && user.role != "nong") {
            return (
              <>
                <ImagesFromUrl urls={camp.pictureUrls} />
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
