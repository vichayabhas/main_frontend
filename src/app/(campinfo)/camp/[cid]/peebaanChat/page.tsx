import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/utility/BackToHome";
import ChatClient from "@/components/chat/ChatClient";
import PasswordLock from "@/components/utility/PasswordLock";
import { stringToId } from "@/components/utility/setup";
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
  const data = await getChat(campId, "getPartPeebaanChat", token);
  if (!data.success) {
    return <BackToHome />;
  }
  return (
    <PasswordLock token={token} bypass={data.mode == "pee"}>
      <ChatClient data={data} token={token} />
    </PasswordLock>
  );
}
