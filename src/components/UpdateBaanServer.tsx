import getBaan from "@/libs/camp/getBaan";
import getCamp from "@/libs/camp/getCamp";
import getUserFromCamp from "@/libs/camp/getUserFromCamp";
import getPlace from "@/libs/randomthing/getPlace";
import BaanMembers from "./BaanMembers";
import UpdateBaanClient from "./UpdateBaanClient";
import { getAllPlaceData } from "./placeSetUp";
import { Id } from "../../interface";
import React from "react";
export default async function UpdateBaanServer({
  baanId,
}: {
  baanId: Id;
}) {
  const baan = await getBaan(baanId);
  const boy = baan.boySleepPlaceId
    ? await getPlace(baan.boySleepPlaceId)
    : null;
  const girl = baan.girlSleepPlaceId
    ? await getPlace(baan.girlSleepPlaceId)
    : null;
  const normal = baan.normalPlaceId ? await getPlace(baan.normalPlaceId) : null;
  const camp = await getCamp(baan.campId);
  const pees = await getUserFromCamp("getPeesFromBaanId", baan._id);
  const nongs = await getUserFromCamp("getNongsFromBaanId", baan._id);
  const allPlaceData = await getAllPlaceData();

  return (
    <>
      <UpdateBaanClient
        baan={baan}
        boy={boy}
        girl={girl}
        normal={normal}
        camp={camp}
        allPlaceData={allPlaceData}
      />
      <BaanMembers
        baan={baan}
        campRole={"pee"}
        nongs={nongs}
        pees={pees}
        camp={camp}
      />
    </>
  );
}
