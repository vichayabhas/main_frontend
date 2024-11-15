import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/user/getUserProfile";
import UpdateModeRaw from "@/components/UpdateModeRaw";
import BackToHome from "@/components/BackToHome";
import getCamp from "@/libs/camp/getCamp";
import React from "react";
export default async function updateModePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }

  const user = await getUserProfile(session.user.token as string);
  if (user.mode == "nong" || user.role == "nong") {
    return <BackToHome />;
  }
  let i=0
  const camps=[]
  while(i<user.registerIds.length){
    const camp=await getCamp(user.registerIds[i++])
    camps.push(camp)
  }
  return <UpdateModeRaw session={session} user={user} camps={camps}/>;
}
