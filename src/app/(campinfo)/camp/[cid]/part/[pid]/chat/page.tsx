import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/utility/BackToHome";
import ChatClient from "@/components/chat/ChatClient";
import { stringToId } from "@/components/utility/setup";
import getChat from "@/libs/randomthing/getChat";
import { getServerSession } from "next-auth";
import React from "react";
export default async function AllChat({
  params,
}: {
  params: { cid: string; pid: string };
}) {
  const partId = stringToId(params.pid);
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const token = session.user.token;
  const data = await getChat(partId, "getPartChat", token);
  if (!data.success) {
    return <BackToHome />;
  }
  return <ChatClient data={data} token={token} />;
}
