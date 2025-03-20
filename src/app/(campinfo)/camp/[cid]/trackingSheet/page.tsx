import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/utility/BackToHome";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import WorkingItemClient from "@/components/camp/WorkingItemClient";
import PasswordLock from "@/components/utility/PasswordLock";
import React from "react";
import getWorkingItemByCampId from "@/libs/camp/getWorkingItemByCampId";
import { stringToId } from "@/components/utility/setup";
export default async function page({ params }: { params: { cid: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const user = await getUserProfile(session.user.token);
  const workingItems = await getWorkingItemByCampId(
    stringToId(params.cid),
    session.user.token
  );
  if (!workingItems.success) {
    return <BackToHome />;
  }
  return (
    <PasswordLock token={session.user.token} bypass={user.mode == "pee"}>
      <WorkingItemClient
        workingItems={workingItems.data}
        baseUrl={`camp/${params.cid}/trackingSheet`}
        roomId={stringToId(params.cid)}
        password={user.linkHash}
      />
    </PasswordLock>
  );
}
