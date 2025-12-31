import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/user/getUserProfile";
import BackToHome from "@/components/utility/BackToHome";
import { HealthIssueBody } from "../../../interface";
import getHealthIssue from "@/libs/user/getHealthIssue";
import HealthIssueClient from "@/components/user/HealthIssueClient";
import React from "react";
export default async function name() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const user = await getUserProfile(session.user.token);
  let healthIssue: HealthIssueBody;
  if (user.healthIssueId) {
    healthIssue = await getHealthIssue(user.healthIssueId);
  } else {
    healthIssue = {
      food: "",
      medicine: "",
      chronicDisease: "",
      extra: "",
      isWearing: false,
      spicy: false,
      foodConcern: "",
      foodLimit: "ไม่มีข้อจำกัดด้านความเชื่อ",
    };
  }
  return (
    <HealthIssueClient healthIssue={healthIssue} token={session.user.token} />
  );
}
