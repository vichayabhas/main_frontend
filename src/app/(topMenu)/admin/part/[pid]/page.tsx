import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/utility/BackToHome";
import { stringToId } from "@/components/utility/setup";
import UpdatePartServer from "@/components/camp/authPart/UpdatePartServer";
import getCamp from "@/libs/camp/getCamp";
import getPart from "@/libs/camp/getPart";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import React from "react";
export default async function Baan({ params }: { params: { pid: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const partId = stringToId(params.pid);
  const user = await getUserProfile(session.user.token);
  if (user.role === "admin") {
    return <UpdatePartServer partId={partId} token={session.user.token} />;
  }
  const part = await getPart(partId, session.user.token);
  const camp = await getCamp(part.campId);
  if (camp.boardIds.includes(user._id)) {
    return <UpdatePartServer partId={partId} token={session.user.token} />;
  }
  return <BackToHome />;
}
