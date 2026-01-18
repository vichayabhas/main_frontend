import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ActionPlanWithoutSocketClient from "@/components/camp/actionPlan/ActionPlanWithoutSocketClient";
import BackToHome from "@/components/utility/BackToHome";
import getActionPlans from "@/libs/camp/getActionPlans";
import getTimeOffset from "@/libs/user/getTimeOffset";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import React from "react";
export default async function HospitalDetailPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const user = await getUserProfile(session.user.token);
  if (user.role === "nong") {
    return <BackToHome />;
  }
  const timeOffset = await getTimeOffset(user.displayOffsetId);
  const actionPlans = await getActionPlans(session.user.token);
  return (
    <ActionPlanWithoutSocketClient
      actionPlans={actionPlans.data}
      timeOffset={timeOffset}
      baseUrl="actionPlan"
    />
  );
}
