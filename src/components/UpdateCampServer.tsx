import getAllRemainPartName from "@/libs/admin/getAllRemainPartName";
import getBaans from "@/libs/camp/getBaans";
import getCamp from "@/libs/camp/getCamp";
import { Id } from "../../interface";
import UpdateCampClient from "./UpdateCampClient";
import getAllQuestion from "@/libs/camp/getAllQuestion";
import React from "react";
import getParts from "@/libs/camp/getParts";

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
  const questions = await getAllQuestion(token, campId);
  const parts = await getParts(campId, token);
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
