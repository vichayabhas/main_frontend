import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import ChatClient from "@/components/ChatClient";
import { stringToId } from "@/components/setup";
import getChat from "@/libs/randomthing/getChat";
import { getServerSession } from "next-auth";
import React from "react";
export default async function AllChat({ params }: { params: { cid: string } }) {
  const campId = stringToId(params.cid);
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const token = session.user.token;
  const data = await getChat(campId, "getNongBaanChat", token);
  if (!data.success) {
    return <BackToHome />;
  }
  return <ChatClient data={data} token={token} />;
}
