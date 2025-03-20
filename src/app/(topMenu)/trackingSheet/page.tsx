import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/utility/BackToHome";
import getWorkingItems from "@/libs/camp/getWorkingItems";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import PasswordLock from "@/components/utility/PasswordLock";
import React from "react";
import WorkingItemWithoutSocketClient from "@/components/camp/WorkingItemWithoutSocketClient";
export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const user = await getUserProfile(session.user.token);
  if (user.role === "nong") {
    return <BackToHome />;
  }
  const workingItems = await getWorkingItems(session.user.token);
  if (!workingItems.success) {
    return <BackToHome />;
  }
  return (
    <PasswordLock token={session.user.token} bypass={user.mode == "pee"}>
      <WorkingItemWithoutSocketClient
        workingItems={workingItems.data}
        baseUrl="trackingSheet"
      />
    </PasswordLock>
  );
}
