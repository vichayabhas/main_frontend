import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/utility/BackToHome";
import ChatClient from "@/components/chat/ChatClient";
import getPeeCamp from "@/libs/camp/getPeeCamp";
import getUserFromCamp from "@/libs/camp/getUserFromCamp";
import getChat from "@/libs/randomthing/getChat";
import getCampMemberCardByCampId from "@/libs/user/getCampMemberCardByCampId";
import { getServerSession } from "next-auth";
import ChatChoiceClient from "@/components/chat/ChatChoiceClient";
import { stringToId } from "@/components/utility/setup";
import React from "react";
export default async function NongChatChoice({
  params,
}: {
  params: { cid: string };
}) {
  const campId = stringToId(params.cid);
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const token = session.user.token;
  const shirtManage = await getCampMemberCardByCampId(campId, token);
  switch (shirtManage.role) {
    case "nong": {
      const data = await getChat(shirtManage._id, "getNongChat", token);
      if (!data.success) {
        return <BackToHome />;
      }
      return <ChatClient data={data} token={token} />;
    }
    case "pee": {
      const peeCamp = await getPeeCamp(shirtManage.campModelId, token);
      const nongs = await getUserFromCamp("getNongsFromBaanId", peeCamp.baanId);
      return <ChatChoiceClient nongs={nongs} campId={campId} />;
    }
    case "peto":
      return <BackToHome />;
  }
}
