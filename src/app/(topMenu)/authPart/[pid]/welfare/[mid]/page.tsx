import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/utility/BackToHome";
import MealClient from "@/components/camp/meal/MealClient";
import { stringToId } from "@/components/utility/setup";
import { getServerSession } from "next-auth";
import React from "react";
import getMealForUpdate from "@/components/randomthing/getMealForUpdate";
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
  const mealId = stringToId(params.mid);
  const data = await getMealForUpdate(mealId, token);
  return <MealClient params={params} data={data} token={token} />;
}
