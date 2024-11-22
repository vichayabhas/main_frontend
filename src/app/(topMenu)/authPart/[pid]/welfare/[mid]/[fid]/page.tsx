import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import FoodClient from "@/components/FoodClient";
import { getTimeOffsetByToken, stringToId } from "@/components/setup";
import getFoodForUpdate from "@/libs/randomthing/getFoodForUpdate";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page({
  params,
}: {
  params: { pid: string; fid: string; mid: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const token = session.user.token;
  const timeOffset = await getTimeOffsetByToken(token);
  const food = await getFoodForUpdate(stringToId(params.fid));
  return <FoodClient timeOffset={timeOffset} food={food} token={token} />;
}
