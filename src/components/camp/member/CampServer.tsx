import { getAllPlaceData } from "@/components/randomthing/placeSetUp";
import ImagesFromUrl from "@/components/utility/ImagesFromUrl";
import { stringToId } from "@/components/utility/setup";
import getCampState from "@/libs/camp/getCampState";
import getNongCampData from "@/libs/camp/getNongCampData";
import getPart from "@/libs/camp/getPart";
import getPeeCampData from "@/libs/camp/getPeeCampData";
import getPetoCampData from "@/libs/camp/getPetoCampData";
import React from "react";
import NongCampClient from "./inCamp/NongCampClient";
import NongPendingPage from "../admission/NongPendingPage";
import NongSureClient from "../admission/NongSureClient";
import PeeCampClient from "./inCamp/PeeCampClient";
import PetoCampClient from "./inCamp/PetoCampClient";
import { Id } from "../../../../configTypes";
import getDataForStaffUpdateRegister from "@/libs/camp/getDataForStaffUpdateRegister";
import RegisterCamp from "../admission/RegisterCamp";
import UpdateStaffRegister from "../admission/UpdateStaffRegister";
export default async function CampServer({
  token,
  campId,
}: {
  token: string;
  campId: Id;
}) {
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
      return (
        <>
          <ImagesFromUrl urls={campState.camp.pictureUrls} />
          {part.partName}
        </>
      );
    }
    case "notRegister": {
      return <RegisterCamp campState={campState} token={token} />;
    }
    case "staffRegister": {
      const data = await getDataForStaffUpdateRegister(
        campState.camp._id,
        token
      );
      return <UpdateStaffRegister token={token} data={data} />;
    }
  }
}
