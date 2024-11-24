import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import WorkingItemClient from "@/components/WorkingItemClient";
import getWorkingItemByPartId from "@/libs/camp/getWorkingItemByPartId";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import PasswordLock from "@/components/PasswordLock";
import { stringToId } from "@/components/setup";
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
        baseUrl={`camp/${params.cid}trackingSheet`}
      />
    </PasswordLock>
  );
}
