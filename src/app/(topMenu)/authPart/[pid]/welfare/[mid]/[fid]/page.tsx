import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/utility/BackToHome";
import FoodClient from "@/components/camp/meal/FoodClient";
import { stringToId } from "@/components/utility/setup";
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
  const food = await getFoodForUpdate(stringToId(params.fid),token);
  return <FoodClient food={food} token={token} />;
}
