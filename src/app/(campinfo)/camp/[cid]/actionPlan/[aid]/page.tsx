import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import getActionPlan from "@/libs/camp/getActionPlan";
import { getServerSession } from "next-auth";
import getPlace from "@/libs/randomthing/getPlace";
import EditActionPlan from "@/components/EditActionPlan";
import getUserFromCamp from "@/libs/camp/getUserFromCamp";
import { getAllPlaceData } from "@/components/placeSetUp";
import { stringToId } from "@/components/setup";
import React from "react";
import getTimeOffset from "@/libs/user/getTimeOffset";
import getUserProfile from "@/libs/user/getUserProfile";
import { InterPlace } from "../../../../../../../interface";
import getCamp from "@/libs/camp/getCamp";
export default async function HospitalDetailPage({
  params,
}: {
  params: { aid: string; cid: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const actionPlan = await getActionPlan(
    stringToId(params.aid),
    session.user.token
  );
  const camp = await getCamp(stringToId(params.cid));
  const user = await getUserProfile(session.user.token);
  if (camp.nongIds.includes(user._id)) {
    return <BackToHome />;
  }
  let i = 0;
  const places: InterPlace[] = [];
  while (i < actionPlan.placeIds.length) {
    const place = await getPlace(actionPlan.placeIds[i++]);
    places.push(place);
  }
  const allPlaceData = await getAllPlaceData();
  const pees = await getUserFromCamp("getPeesFromPartId", actionPlan.partId);
  const petos = await getUserFromCamp("getPetosFromPartId", actionPlan.partId);
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