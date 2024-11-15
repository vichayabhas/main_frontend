import getAllWelfare from "@/libs/camp/getAllWelfare";
import WelfareClient from "./WelfareClient";
import { Id } from "../../interface";
import React from "react";
export default async function WelfareServer({
  campId,
}: {
  campId: Id;
  token: string;
}) {
  const welfare = await getAllWelfare(campId);
  return <WelfareClient welfare={welfare} />;
}
