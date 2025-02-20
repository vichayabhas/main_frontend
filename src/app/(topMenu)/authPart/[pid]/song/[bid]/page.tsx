import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/utility/BackToHome";
import PrStudioBaan from "@/components/camp/authPart/PrStudioBaan";
import { stringToId } from "@/components/utility/setup";
import getShowBaanSongs from "@/libs/randomthing/getShowBaanSongs";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page({ params }: { params: { bid: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const data = await getShowBaanSongs(
    stringToId(params.bid),
    session.user.token
  );
  return <PrStudioBaan data={data} token={session.user.token} />;
}
