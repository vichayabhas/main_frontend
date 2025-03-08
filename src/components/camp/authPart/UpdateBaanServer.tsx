import { Id } from "../../../../interface";
import React from "react";
import getCoopData from "@/libs/camp/getCoopData";
import { getAllPlaceData } from "@/components/randomthing/placeSetUp";
import UpdateBaanClient from "./UpdateBaanClient";
export default async function UpdateBaanServer({ baanId }: { baanId: Id }) {
  const coopData = await getCoopData(baanId);
  const allPlaceData = await getAllPlaceData();
  return (
    <>
      <UpdateBaanClient coopData={coopData} allPlaceData={allPlaceData} />
    </>
  );
}
