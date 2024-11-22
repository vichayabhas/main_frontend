import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import MealClient from "@/components/MealClient";
import { stringToId } from "@/components/setup";
import getCamp from "@/libs/camp/getCamp";
import getPart from "@/libs/camp/getPart";
import getFoods from "@/libs/randomthing/getFoods";
import getMeal from "@/libs/randomthing/getMeal";
import getTimeOffset from "@/libs/user/getTimeOffset";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import React from "react";
export default async function page({
  params,
}: {
  params: { pid: string; mid: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const token = session.user.token;
  const user = await getUserProfile(token);
  const selectOffset = await getTimeOffset(user.selectOffsetId);
  const displayOffset = await getTimeOffset(user.displayOffsetId);
  const mealId = stringToId(params.mid);
  const foods = await getFoods(mealId);
  const meal = await getMeal(mealId);
  const partId = stringToId(params.pid);
  const part = await getPart(partId);
  const camp = await getCamp(part.campId);
  return (
    <MealClient
      params={params}
      foods={foods}
      meal={meal}
      camp={camp}
      groupName={camp.groupName}
      token={token}
      displayOffset={displayOffset}
      selectOffset={selectOffset}
    />
  );
}
