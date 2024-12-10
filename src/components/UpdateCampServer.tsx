import getAllRemainPartName from "@/libs/admin/getAllRemainPartName";
import getBaans from "@/libs/camp/getBaans";
import getCamp from "@/libs/camp/getCamp";
import { Id, InterPusherData } from "../../interface";
import UpdateCampClient from "./UpdateCampClient";
import getAllQuestion from "@/libs/camp/getAllQuestion";
import React from "react";
import getParts from "@/libs/camp/getParts";
import getSystemInfo from "@/libs/randomthing/getSystemInfo";
import getPusherData from "@/libs/camp/getPusherData";

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
  const systemInfo=await getSystemInfo()
  let pusherData:InterPusherData|null
  if(!camp.pusherId){
    pusherData=null
  }else{
    pusherData=await getPusherData(camp.pusherId)
  }
  return (
    <>
      <UpdateCampClient
        camp={camp}
        baans={baans}
        parts={parts}
        remainPartName={remainPartName}
        questions={questions}
        systemInfo={systemInfo}
        pusherData={pusherData}
        token={token}
      />
    </>
  );
}
