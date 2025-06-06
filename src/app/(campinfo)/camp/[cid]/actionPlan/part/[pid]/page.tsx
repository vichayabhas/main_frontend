import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ActionPlanClient from "@/components/camp/ActionPlanClient";
import BackToHome from "@/components/utility/BackToHome";
import { stringToId } from "@/components/utility/setup";
import getActionPlanByPartId from "@/libs/camp/getActionPlanByPartId";
import getTimeOffset from "@/libs/user/getTimeOffset";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import React from "react";

export default async function HospitalDetailPage({
  params,
}: {
  params: { pid: string; cid: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const user = await getUserProfile(session.user.token);
  const timeOffset = await getTimeOffset(user.displayOffsetId);
  const actionPlans = await getActionPlanByPartId(
    stringToId(params.pid),
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
      roomId={stringToId(params.pid)}
    />
  );
}
