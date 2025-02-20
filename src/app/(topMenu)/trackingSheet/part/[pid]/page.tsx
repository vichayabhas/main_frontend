import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/utility/BackToHome";
import WorkingItemClient from "@/components/camp/WorkingItemClient";
import getWorkingItemByPartId from "@/libs/camp/getWorkingItemByPartId";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import PasswordLock from "@/components/utility/PasswordLock";
import { stringToId } from "@/components/utility/setup";
import React from "react";
export default async function HospitalDetailPage({
  params,
}: {
  params: { pid: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const user = await getUserProfile(session.user.token);
  if (user.role === "nong") {
    return <BackToHome />;
  }
  const workingItems = await getWorkingItemByPartId(
    stringToId(params.pid),
    session.user.token
  );
  if (!workingItems.success) {
    return <BackToHome />;
  }
  return (
    <PasswordLock token={session.user.token} bypass={user.mode == "pee"}>
      <WorkingItemClient
        workingItems={workingItems.data}
        baseUrl="trackingSheet"
      />
    </PasswordLock>
  );
}
