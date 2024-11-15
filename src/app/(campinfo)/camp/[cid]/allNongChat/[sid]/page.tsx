import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import ChatClient from "@/components/ChatClient";
import { stringToId } from "@/components/setup";
import getChat from "@/libs/randomthing/getChat";
import { getServerSession } from "next-auth";
import React from "react";
export default async function NongChat({
  params,
}: {
  params: { sid: string };
}) {
  const campMemberCardId = stringToId(params.sid);
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const token = session.user.token;
  const data = await getChat(campMemberCardId, "getNongChat", token);
  if (!data.success) {
    return <BackToHome />;
  }
  return <ChatClient data={data} token={token} />;
}