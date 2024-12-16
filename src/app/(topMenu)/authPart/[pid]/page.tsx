import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AllAnswerAndQuestionPage from "@/components/AllAnswerAndQuestionPage";
import AllInOneLock from "@/components/AllInOneLock";
import BackToHome from "@/components/BackToHome";
import { getAllPlaceData } from "@/components/placeSetUp";
import PlanClient from "@/components/PlanClient";
import PrStudioClient from "@/components/PrStudioClient";
import RegisterPartClient from "@/components/RegisPartClient";
import { stringToId } from "@/components/setup";
import UpdateBaanServer from "@/components/UpdateBaanServer";
import UpdateCampClient from "@/components/UpdateCampClient";
import UpdateQuestionClient from "@/components/UpdateQuestionClient";
import WelfareClient from "@/components/WelfareClient";
import getAllRemainPartName from "@/libs/admin/getAllRemainPartName";
import getAllAnswerAndQuestion from "@/libs/camp/getAllAnswerAndQuestion";
import getAllPlanData from "@/libs/camp/getAllPlanData";
import getAllQuestion from "@/libs/camp/getAllQuestion";
import getAllWelfare from "@/libs/camp/getAllWelfare";
import getBaans from "@/libs/camp/getBaans";
import getCamp from "@/libs/camp/getCamp";
import getPart from "@/libs/camp/getPart";
import getParts from "@/libs/camp/getParts";
import getPeeCamp from "@/libs/camp/getPeeCamp";
import getPusherData from "@/libs/camp/getPusherData";
import getRegisterData from "@/libs/camp/getRegisterData";
import getAuthSongs from "@/libs/randomthing/getAuthSongs";
import getSystemInfo from "@/libs/randomthing/getSystemInfo";
import getCampMemberCardByCampId from "@/libs/user/getCampMemberCardByCampId";
import getTimeOffset from "@/libs/user/getTimeOffset";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import { InterPusherData } from "../../../../../interface";
import React from "react";
export default async function Baan({ params }: { params: { pid: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const token = session.user.token;
  const partId = stringToId(params.pid);
  const user = await getUserProfile(session.user.token);
  const part = await getPart(partId, token);
  const camp = await getCamp(part.campId);
  const selectOffset = await getTimeOffset(user.selectOffsetId);
  const displayOffset = await getTimeOffset(user.displayOffsetId);
  const campMemberCard = await getCampMemberCardByCampId(part.campId, token);
  if (!user.authPartIds.includes(camp.partBoardId) && part.auths.length == 0) {
    return <BackToHome />;
  }
  const outputs: React.ReactNode[] = [];
  let isBoard = false;
  if (user.authPartIds.includes(camp.partBoardId)) {
    const baans = await getBaans(camp._id);
    const remainPartName = await getAllRemainPartName(camp._id, token);
    const parts = await getParts(camp._id, token);
    let pusherData: InterPusherData | null;
    if (!camp.pusherId) {
      pusherData = null;
    } else {
      pusherData = await getPusherData(camp.pusherId);
    }
    outputs.push(
      <>
        <UpdateCampClient
          camp={camp}
          baans={baans}
          parts={parts}
          remainPartName={remainPartName}
          pusherData={pusherData}
          token={token}
        />
      </>
    );
    isBoard = true;
  }
  if (part.auths.includes("แก้ไขคำถาม")) {
    const systemInfo = await getSystemInfo();
    const questions = await getAllQuestion(token, camp._id);
    outputs.push(
      <UpdateQuestionClient
        camp={camp}
        token={token}
        systemInfo={systemInfo}
        questions={questions}
      />
    );
  }
  if (part.auths.includes("ตรวจคำตอบข้อเขียน") || isBoard) {
    const allAnswerAndQuestion = await getAllAnswerAndQuestion(camp._id, token);
    outputs.push(
      <AllAnswerAndQuestionPage
        dataInput={allAnswerAndQuestion}
        token={token}
        campIdInput={camp._id.toString()}
      />
    );
  }
  if (part.auths.includes("หัวหน้าพี่เลี้ยง") || isBoard) {
    switch (campMemberCard.role) {
      case "nong": {
        return <BackToHome />;
      }
      case "pee": {
        const peeCamp = await getPeeCamp(campMemberCard.campModelId, token);
        outputs.push(<UpdateBaanServer baanId={peeCamp.baanId} />);
        break;
      }
      case "peto": {
        outputs.push(
          camp.baanIds.map((baanId, i) => (
            <UpdateBaanServer key={i} baanId={baanId} />
          ))
        );
        break;
      }
    }
  }
  if (part.auths.includes("แผน") || isBoard) {
    const data = await getAllPlanData(camp._id);
    const allPlaceData = await getAllPlaceData();
    outputs.push(
      <PlanClient token={token} allPlaceData={allPlaceData} data={data} />
    );
  }
  if (part.auths.includes("สวัสดิการ") || isBoard) {
    const welfare = await getAllWelfare(camp._id);
    outputs.push(
      <WelfareClient
        welfare={welfare}
        displayOffset={displayOffset}
        partIdString={part._id.toString()}
        token={token}
        selectOffset={selectOffset}
      />
    );
  }
  if (part.auths.includes("pr/studio") || isBoard) {
    const authSong = await getAuthSongs(camp._id, token);
    outputs.push(
      <PrStudioClient
        authSong={authSong}
        token={token}
        partIdString={part._id.toString()}
      />
    );
  }
  if (part.auths.includes("ทะเบียน") || isBoard) {
    const data = await getRegisterData(camp._id);
    outputs.push(
      <RegisterPartClient isBoard={isBoard} data={data} token={token} />
    );
  }
  return (
    <AllInOneLock lock={user.mode == "nong"} token={token} pushToHome>
      {outputs}
    </AllInOneLock>
  );
}
