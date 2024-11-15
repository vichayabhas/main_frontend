import getAllRemainPartName from "@/libs/admin/getAllRemainPartName";
import getBaans from "@/libs/camp/getBaans";
import getCamp from "@/libs/camp/getCamp";
import getPart from "@/libs/camp/getPart";
import { Id, InterPartFront } from "../../interface";
import UpdateCampClient from "./UpdateCampClient";
import getAllQuestion from "@/libs/camp/getAllQuestion";
import React from "react";

export default async function UpdateCampServer({
  campId,
  token,
}: {
  campId: Id;
  token: string;
}) {
  const baans = await getBaans(campId);
  const camp = await getCamp(campId);
  const remainPartName = await getAllRemainPartName(campId, token);
  const questions=await getAllQuestion(token,campId)
  let i = 0;
  const parts: InterPartFront[] = [];
  while (i < camp.partIds.length) {
    const part = await getPart(camp.partIds[i++]);
    parts.push(part);
  }
  return (
    <>
      <UpdateCampClient
        camp={camp}
        baans={baans}
        parts={parts}
        remainPartName={remainPartName}
        questions={questions}
      />
    </>
  );
}
