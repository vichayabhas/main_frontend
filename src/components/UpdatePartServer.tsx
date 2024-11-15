import getPart from "@/libs/camp/getPart";
import getPlace from "@/libs/randomthing/getPlace";
import UpdatePartClient from "./UpdatePartClient";
import { getAllPlaceData } from "./placeSetUp";
import { Id } from "../../interface";
import React from "react";
export default async function UpdatePartServer({
  partId,
}: {
  partId: Id;
  token: string;
}) {
  const part = await getPart(partId);
  const place = part.placeId ? await getPlace(part.placeId) : null;
  const allPlaceData = await getAllPlaceData();

  //const camp = await getCamp(part.campId);
  return (
    <UpdatePartClient
      place={place}
      partId={part._id}
      allPlaceData={allPlaceData}
    />
  );
}
