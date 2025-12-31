import { BasicUser, HealthIssueBody, Id } from "../../../../interface";
import React from "react";
import getCoopData from "@/libs/camp/getCoopData";
import { getAllPlaceData } from "@/components/randomthing/placeSetUp";
import UpdateBaanClient from "./UpdateBaanClient";
export default async function UpdateBaanServer({
  baanId,
  user,
  token,
  healthIssue,
}: {
  baanId: Id;
  user: BasicUser;
  token: string;
  healthIssue: HealthIssueBody;
}) {
  const coopData = await getCoopData(baanId);
  const allPlaceData = await getAllPlaceData();
  return (
    <>
      <UpdateBaanClient
        coopData={coopData}
        allPlaceData={allPlaceData}
        user={user}
        token={token}
        healthIssue={healthIssue}
      />
    </>
  );
}
