import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import { getServerSession } from "next-auth";
import getWorkingItem from "@/libs/camp/getWorkingItem";
import getUserProfile from "@/libs/user/getUserProfile";
import bcrypt from "bcrypt";
import getPart from "@/libs/camp/getPart";
import EditWorkingItem from "@/components/EditWorkingItem";
import PasswordLock from "@/components/PasswordLock";
import { stringToId } from "@/components/setup";
import React from "react";
import getParts from "@/libs/camp/getParts";
export default async function HospitalDetailPage({
  params,
}: {
  params: { wid: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const user = await getUserProfile(session.user.token);
  if (user.role === "nong") {
    return <BackToHome />;
  }
  const workingItem = await getWorkingItem(
    stringToId(params.wid),
    session.user.token
  );
  const part = await getPart(workingItem.partId,session.user.token);
  const parts=await getParts(part.campId,session.user.token)
  const auth = await bcrypt.compare(user.linkHash, workingItem.password);
  if (!(await bcrypt.compare(user.linkHash, workingItem.password))) {
    workingItem.link = null;
  }
  return (
    <PasswordLock token={session.user.token} bypass={user.mode=='pee'}>
      <EditWorkingItem
        token={session.user.token}
        workingItem={workingItem}
        parts={parts}
        auth={auth}
      />
    </PasswordLock>
  );
}
