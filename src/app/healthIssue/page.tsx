import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/user/getUserProfile";
import BackToHome from "@/components/BackToHome";
import { HeathIssueBody } from "../../../interface";
import getHeathIssue from "@/libs/user/getHeathIssue";
import HeathIssueClient from "@/components/HeathIssueClient";
import React from "react";
export default async function name() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const user = await getUserProfile(session.user.token);
  let heathIssue: HeathIssueBody;
  if (user.healthIssueId) {
    heathIssue = await getHeathIssue(user.healthIssueId);
  } else {
    heathIssue = {
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
  console.log(heathIssue);
  return (
    <HeathIssueClient heathIssue={heathIssue} token={session.user.token} />
  );
}
