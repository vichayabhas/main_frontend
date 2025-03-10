import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/utility/BackToHome";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import { BasicPart } from "../../../../interface";
import getPart from "@/libs/camp/getPart";
import AuthPartClient from "@/components/admin/AuthPartClient";
import PasswordLock from "@/components/utility/PasswordLock";
import React from "react";
export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const user = await getUserProfile(session.user.token);
  if (user.role === "nong" || !user.authPartIds.length) {
    return <BackToHome />;
  }
  const parts: BasicPart[] = [];
  let i = 0;
  while (i < user.authPartIds.length) {
    const part = await getPart(user.authPartIds[i++], session.user.token);
    parts.push(part);
  }
  return (
    <PasswordLock token={session.user.token} bypass={user.mode == "pee"}>
      <AuthPartClient parts={parts} />
    </PasswordLock>
  );
}
