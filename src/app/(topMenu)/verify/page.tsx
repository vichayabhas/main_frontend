import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import VerifileClient from "@/components/VerifyClient";
import getSystemInfo from "@/libs/randomthing/getSystemInfo";
import getUserProfile from "@/libs/user/getUserProfile";
import signId from "@/libs/user/signId";
import { getServerSession } from "next-auth";
import React from "react";
export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const user = await getUserProfile(session.user.token);
  const info = await getSystemInfo();
  if (!info.endEmail.split(",").includes(user.email.split("@")[1])) {
    return <BackToHome />;
  }
  const { success } = await signId(session.user.token);
  if (!success) {
    return <BackToHome />;
  }
  return <VerifileClient token={session.user.token} />;
}
