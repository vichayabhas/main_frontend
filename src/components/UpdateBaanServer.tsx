import getUserFromCamp from "@/libs/camp/getUserFromCamp";
import BaanMembers from "./BaanMembers";
import UpdateBaanClient from "./UpdateBaanClient";
import { getAllPlaceData } from "./placeSetUp";
import { Id } from "../../interface";
import React from "react";
import getCoopData from "@/libs/camp/getCoopData";
export default async function UpdateBaanServer({ baanId }: { baanId: Id }) {
  const coopData=await getCoopData(baanId)
  const pees = await getUserFromCamp("getPeesFromBaanId",coopData.baan._id);
  const nongs = await getUserFromCamp("getNongsFromBaanId", coopData.baan._id);
  const allPlaceData = await getAllPlaceData();
  return (
    <>
      <UpdateBaanClient
        coopData={coopData}
        allPlaceData={allPlaceData}
      />
      <BaanMembers
        baan={coopData.baan}
        campRole={"pee"}
        nongs={nongs}
        pees={pees}
        camp={coopData.camp}
      />
    </>
  );
}
