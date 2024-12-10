import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ImagesFromUrl from "@/components/ImagesFromUrl";
import LocationDateReserve from "@/components/LocationDateReserve";
import NongCampClient from "@/components/NongCampClient";
import NongPendingPage from "@/components/NongPendingPage";
import NongRegisterPage from "@/components/NongRegisterPage";
import NongSureClient from "@/components/NongSureClient";
import PeeCampClient from "@/components/PeeCampClient";
import PetoCampClient from "@/components/PetoCampClient";
import { getAllPlaceData } from "@/components/placeSetUp";
import PushToCamps from "@/components/PushToCamps";
import { stringToId } from "@/components/setup";
import getCampState from "@/libs/camp/getCampState";
import getNongCampData from "@/libs/camp/getNongCampData";
import getPart from "@/libs/camp/getPart";
import getParts from "@/libs/camp/getParts";
import getPeeCampData from "@/libs/camp/getPeeCampData";
import getPetoCampData from "@/libs/camp/getPetoCampData";
import { getServerSession } from "next-auth";
import React from "react";
import { CampState, MyMap } from "../../../../../interface";

export default async function HospitalDetailPage({
  params,
}: {
  params: { cid: string };
}) {
  async function getPartMaps(campState: CampState, token: string) {
    const partMap: MyMap[] = [];
    let i = 0;
    const parts = await getParts(campState.camp._id, token);
    while (i < parts.length) {
      const part = parts[i++];
      partMap.push({ key: part._id, value: part.partName });
    }
    return partMap;
  }
  const session = await getServerSession(authOptions);
  if (session) {
    const allPlaceData = await getAllPlaceData();
    const token = session.user.token;
    const campState = await getCampState(stringToId(params.cid), token);
    switch (campState.state) {
      case "nong": {
        const data = await getNongCampData(campState.camp._id, token);
        return <NongCampClient token={token} data={data} />;
      }
      case "pee": {
        const data = await getPeeCampData(campState.camp._id, token);
        return (
          <PeeCampClient
            data={data}
            token={token}
            allPlaceData={allPlaceData}
          />
        );
      }
      case "peto": {
        const data = await getPetoCampData(campState.camp._id, token);
        return (
          <PetoCampClient
            data={data}
            token={token}
            allPlaceData={allPlaceData}
          />
        );
      }
      case "pending":
        return <NongPendingPage campState={campState} token={token} />;
      case "interview":
        return (
          <>
            <ImagesFromUrl urls={campState.camp.pictureUrls} />
            <div>น้องผ่านรอบเอกสารแล้ว</div>
          </>
        );
      case "pass":
        return <NongSureClient campState={campState} token={token} />;
      case "paid":
        return (
          <>
            <ImagesFromUrl urls={campState.camp.pictureUrls} />
            <div>คุณได้จ่ายตังแล้ว</div>
          </>
        );
      case "sure":
        return (
          <>
            <ImagesFromUrl urls={campState.camp.pictureUrls} />
            <div>คุณได้เข้าค่ายแน่นอน</div>
          </>
        );
      case "peePass": {
        const part = await getPart(stringToId(campState.link), token);
        if (!campState.camp.peeLock) {
          const partMap = await getPartMaps(campState, token);
          return (
            <LocationDateReserve
              partMap={partMap}
              defaultSelect={{ key: part._id, value: part.partName }}
              token={token}
              user={campState.user}
            />
          );
        } else {
          return (
            <>
              <ImagesFromUrl urls={campState.camp.pictureUrls} />
              {part.partName}
            </>
          );
        }
      }
      case "notRegister": {
        switch (campState.camp.memberStructure) {
          case "nong->highSchool,pee->1year,peto->2upYear": {
            if (campState.camp.open && campState.user.role == "nong") {
              return <NongRegisterPage campState={campState} token={token} />;
            } else if (
              !campState.camp.peeLock &&
              campState.user.role != "nong"
            ) {
              const partMap = await getPartMaps(campState, token);
              return (
                <LocationDateReserve
                  partMap={partMap}
                  token={token}
                  user={campState.user}
                />
              );
            } else {
              alert("this camp is close");
              return <PushToCamps />;
            }
          }
          case "nong->1year,pee->2upYear": {
            if (
              campState.camp.open &&
              campState.user.fridayActEn &&
              !(campState.user.role == "peto" || campState.user.role == "admin")
            ) {
              return <NongRegisterPage campState={campState} token={token} />
            } else if (
              !campState.camp.peeLock &&
              (campState.user.role == "peto" || campState.user.role == "admin")
            ) {
              const partMap = await getPartMaps(campState, token);
              return (
                <LocationDateReserve
                  partMap={partMap}
                  token={token}
                  user={campState.user}
                />
              );
            } else {
              alert("this camp is close");
              return <PushToCamps />;
            }
          }
          case "nong->highSchool,pee->2upYear": {
            if (campState.camp.open && campState.user.role == "nong") {
              return <NongRegisterPage campState={campState} token={token} />
            } else if (
              !campState.camp.peeLock &&
              (campState.user.role == "peto" || campState.user.role == "admin")
            ) {
              const partMap = await getPartMaps(campState, token);
              return (
                <LocationDateReserve
                  partMap={partMap}
                  token={token}
                  user={campState.user}
                />
              );
            } else {
              alert("this camp is close");
              return <PushToCamps />;
            }
          }
          case "nong->highSchool,pee->allYear": {
            if (campState.camp.open && campState.user.role == "nong") {
              return <NongRegisterPage campState={campState} token={token} />
            } else if (!campState.camp.peeLock && campState.user.role != "nong") {
              const partMap = await getPartMaps(campState, token);
              return (
                <LocationDateReserve
                  partMap={partMap}
                  token={token}
                  user={campState.user}
                />
              );
            } else {
              alert("this camp is close");
              return <PushToCamps />;
            }
          }
        }
      }
    }
  } else {
    return <PushToCamps />;
  }
}
