import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import getActionPlan from "@/libs/camp/getActionPlan";
import { getServerSession } from "next-auth";
import { InterPlace } from "../../../../../interface";
import getPlace from "@/libs/randomthing/getPlace";
import EditActionPland from "@/components/EditActionPland";
import getUserFromCamp from "@/libs/camp/getUserFromCamp";
import { getAllPlaceData } from "@/components/placeSetUp";
import { stringToId } from "@/components/setup";
import React from "react";
export default async function HospitalDetailPage({
  params,
}: {
  params: { aid: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const actionPlan = await getActionPlan(
    stringToId(params.aid),
    session.user.token
  );
  let i = 0;
  const places: InterPlace[] = [];
  while (i < actionPlan.placeIds.length) {
    const place = await getPlace(actionPlan.placeIds[i++]);
    places.push(place);
  }
  const allPlaceData = await getAllPlaceData();
  const pees = await getUserFromCamp("getPeesFromPartId", actionPlan.partId);
  const petos = await getUserFromCamp("getPetosFromPartId", actionPlan.partId);
  return (
    <>
      <EditActionPland
        pees={pees}
        petos={petos}
        actionPlan={actionPlan}
        pls={places}
        allPlaceData={allPlaceData}
      />
    </>
  );
}
