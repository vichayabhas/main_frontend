import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import ChatClient from "@/components/ChatClient";
import { stringToId } from "@/components/setup";
import getChat from "@/libs/randomthing/getChat";
import getCampMemberCardByCampId from "@/libs/user/getCampMemberCardByCampId";
import { getServerSession } from "next-auth";
import React from "react";
export default async function AllChat({
  params,
}: {
  params: { cid: string; pid: string };
}) {
  const campId = stringToId(params.cid);
  const partId = stringToId(params.pid);
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const token = session.user.token;
  const shirtManage = await getCampMemberCardByCampId(campId, token);
  if (shirtManage.role == "nong") {
    return <BackToHome />;
  }
  const data = await getChat(partId, "getPartChat", token);
  return <ChatClient data={data} token={token} />;
}
