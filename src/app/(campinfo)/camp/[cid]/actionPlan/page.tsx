import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ActionPlanClient from "@/components/camp/ActionPlanClient";
import BackToHome from "@/components/utility/BackToHome";
import { stringToId } from "@/components/utility/setup";
import getActionPlanByCampId from "@/libs/camp/getActionPlanByCampId";
import getTimeOffset from "@/libs/user/getTimeOffset";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import React from "react";

export default async function HospitalDetailPage({
  params,
}: {
  params: { cid: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const user = await getUserProfile(session.user.token);
  const timeOffset = await getTimeOffset(user.displayOffsetId);
  const actionPlans = await getActionPlanByCampId(
    stringToId(params.cid),
    session.user.token
  );
  if (!actionPlans.success) {
    return <BackToHome />;
  }
  return (
    <ActionPlanClient
      actionPlans={actionPlans.data}
      timeOffset={timeOffset}
      baseUrl={`camp/${params.cid}/actionPlan`}
      roomId={stringToId(params.cid)}
    />
  );
}
