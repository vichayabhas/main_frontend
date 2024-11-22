import getAllWelfare from "@/libs/camp/getAllWelfare";
import WelfareClient from "./WelfareClient";
import { Id, InterTimeOffset } from "../../interface";
import React from "react";
import { getTimeOffsetByToken } from "./setup";
export default async function WelfareServer({
  campId,
  token,
  partIdString,
  selectOffset
}: {
  campId: Id;
  token: string;
  partIdString: string;
  selectOffset:InterTimeOffset
}) {
  const welfare = await getAllWelfare(campId);
  const timeOffset = await getTimeOffsetByToken(token);
  return (
    <WelfareClient
      welfare={welfare}
      timeOffset={timeOffset}
      partIdString={partIdString}
      token={token}
      selectOffset={selectOffset}
    />
  );
}
