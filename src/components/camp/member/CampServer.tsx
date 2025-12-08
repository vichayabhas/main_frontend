import { getAllPlaceData } from "@/components/randomthing/placeSetUp";
import ImagesFromUrl from "@/components/utility/ImagesFromUrl";
import { stringToId } from "@/components/utility/setup";
import getCampState from "@/libs/camp/getCampState";
import getNongCampData from "@/libs/camp/getNongCampData";
import getPart from "@/libs/camp/getPart";
import getPeeCampData from "@/libs/camp/getPeeCampData";
import getPetoCampData from "@/libs/camp/getPetoCampData";
import React from "react";
import LocationDateReserve from "./LocationDateReserve";
import NongCampClient from "./NongCampClient";
import NongPendingPage from "./NongPendingPage";
import NongSureClient from "./NongSureClient";
import PeeCampClient from "./PeeCampClient";
import PetoCampClient from "./PetoCampClient";
import { Id } from "../../../../configTypes";
import { CampState, MyMap } from "../../../../interface";
import getParts from "@/libs/camp/getParts";
import RegisterCamp from "./RegisterCamp";
export default async function CampServer({
  token,
  campId,
}: {
  token: string;
  campId: Id;
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
  const allPlaceData = await getAllPlaceData();
  const campState = await getCampState(campId, token);
  switch (campState.state) {
    case "nong": {
      const data = await getNongCampData(campState.camp._id, token);
      return (
        <NongCampClient data={data} token={token} allPlaceData={allPlaceData} />
      );
    }
    case "pee": {
      const data = await getPeeCampData(campState.camp._id, token);
      return (
        <PeeCampClient data={data} token={token} allPlaceData={allPlaceData} />
      );
    }
    case "peto": {
      const data = await getPetoCampData(campState.camp._id, token);
      return (
        <PetoCampClient data={data} token={token} allPlaceData={allPlaceData} />
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
      return <RegisterCamp campState={campState} token={token} />;
    }
  }
}
