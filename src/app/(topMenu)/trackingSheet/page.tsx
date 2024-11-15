import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import getWorkingItems from "@/libs/camp/getWorkingItems";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";
import WorkingItemClient from "@/components/WorkingItemClient";
import PasswordLock from "@/components/PasswordLock";
import React from "react";
export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const user = await getUserProfile(session.user.token);
  if (user.role === "nong") {
    return <BackToHome />;
  }
  let i = 0;
  const workingItems = await getWorkingItems(session.user.token);
  while (i < workingItems.length) {
    if (!(await bcrypt.compare(user.linkHash, workingItems[i++].password))) {
      workingItems[i - 1].link = null;
    }
    //console.log(!await bcrypt.compare(user.linkHash,workingItems[i-1].password))
  }
  return (
    <PasswordLock token={session.user.token} bypass={user.mode=='pee'}>
      <WorkingItemClient workingItems={workingItems} />
    </PasswordLock>
  );
}
