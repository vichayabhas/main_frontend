import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/utility/BackToHome";
import getActionPlan from "@/libs/camp/getActionPlan";
import { getServerSession } from "next-auth";
import { InterPlace } from "../../../../../interface";
import getPlace from "@/libs/randomthing/getPlace";
import EditActionPlan from "@/components/camp/EditActionPlan";
import getUserFromCamp from "@/libs/camp/getUserFromCamp";
import { stringToId } from "@/components/utility/setup";
import React from "react";
import getTimeOffset from "@/libs/user/getTimeOffset";
import getUserProfile from "@/libs/user/getUserProfile";
import { getAllPlaceData } from "@/components/randomthing/placeSetUp";
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
  const user = await getUserProfile(session.user.token);
  const timeOffset = await getTimeOffset(user.selectOffsetId);
  return (
    <>
      <EditActionPlan
        pees={pees}
        petos={petos}
        actionPlan={actionPlan}
        pls={places}
        allPlaceData={allPlaceData}
        timeOffset={timeOffset}
      />
    </>
  );
}
