import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/utility/BackToHome";
import { stringToId } from "@/components/utility/setup";
import UpdateBaanServer from "@/components/camp/authPart/UpdateBaanServer";
import getBaan from "@/libs/camp/getBaan";
import getCamp from "@/libs/camp/getCamp";
import getPart from "@/libs/camp/getPart";
import getPeeCamp from "@/libs/camp/getPeeCamp";
import getPetoCamp from "@/libs/camp/getPetoCamp";
import getCampMemberCardByCampId from "@/libs/user/getCampMemberCardByCampId";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import React from "react";
export default async function Baan({ params }: { params: { bid: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const token = session.user.token;
  const user = await getUserProfile(session.user.token);
  const baanId = stringToId(params.bid);
  if (user.role === "admin") {
    return <UpdateBaanServer baanId={baanId} />;
  }
  const baan = await getBaan(baanId);
  const camp = await getCamp(baan.campId);
  const campMemberCard = await getCampMemberCardByCampId(baan.campId, token);
  switch (campMemberCard.role) {
    case "nong": {
      return <BackToHome />;
    }
    case "pee": {
      const peeCamp = await getPeeCamp(campMemberCard.campModelId, token);
      const part = await getPart(peeCamp.partId, token);
      if (camp.boardIds.includes(user._id)) {
        return <UpdateBaanServer baanId={baanId} />;
      }
      if (
        part.auths.includes("หัวหน้าพี่เลี้ยง") &&
        peeCamp.baanId.toString() == params.bid
      ) {
        return <UpdateBaanServer baanId={baanId} />;
      }
      return <BackToHome />;
    }
    case "peto": {
      const petoCamp = await getPetoCamp(campMemberCard.campModelId, token);
      const part = await getPart(petoCamp.partId, token);
      if (camp.boardIds.includes(user._id)) {
        return <UpdateBaanServer baanId={baanId} />;
      }
      if (part.auths.includes("หัวหน้าพี่เลี้ยง")) {
        return <UpdateBaanServer baanId={baanId} />;
      }
      return <BackToHome />;
    }
  }
}
