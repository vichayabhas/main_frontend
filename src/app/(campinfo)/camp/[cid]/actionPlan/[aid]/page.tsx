import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/utility/BackToHome";
import { getServerSession } from "next-auth";
import { stringToId } from "@/components/utility/setup";
import React from "react";
import { getAllPlaceData } from "@/components/randomthing/placeSetUp";
import getActionPlanForEdit from "@/libs/camp/getActionPlanForEdit";
import EditActionPlan from "@/components/camp/actionPlan/EditActionPlan";
export default async function HospitalDetailPage({
  params,
}: {
  params: { aid: string; cid: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const allPlaceData = await getAllPlaceData();
  const data = await getActionPlanForEdit(
    stringToId(params.aid),
    session.user.token
  );
  return (
    <>
      <EditActionPlan
        allPlaceData={allPlaceData}
        data={data}
        token={session.user.token}
      />
    </>
  );
}
