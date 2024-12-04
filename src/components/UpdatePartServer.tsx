import UpdatePartClient from "./UpdatePartClient";
import { getAllPlaceData } from "./placeSetUp";
import { Id } from "../../interface";
import React from "react";
import getPartForUpdate from "@/libs/camp/getPartForUpdate";
export default async function UpdatePartServer({
  partId,
  token,
}: {
  partId: Id;
  token: string;
}) {
  const data=await getPartForUpdate(partId)
  const allPlaceData = await getAllPlaceData();

  //const camp = await getCamp(part.campId);
  return (
    <UpdatePartClient
      data={data}
      allPlaceData={allPlaceData}
      token={token}
    />
  );
}
