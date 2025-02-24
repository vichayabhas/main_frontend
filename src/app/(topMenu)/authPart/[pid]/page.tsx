import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { stringToId } from "@/components/utility/setup";
import UpdateBaanServer from "@/components/camp/authPart/UpdateBaanServer";
import UpdateCampClient from "@/components/camp/authPart/UpdateCampClient";
import UpdateQuestionClient from "@/components/camp/question/UpdateQuestionClient";
import WelfareClient from "@/components/camp/authPart/WelfareClient";
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
import getRegisterData from "@/libs/camp/getRegisterData";
import getAuthSongs from "@/libs/randomthing/getAuthSongs";
import getSystemInfo from "@/libs/randomthing/getSystemInfo";
import getCampMemberCardByCampId from "@/libs/user/getCampMemberCardByCampId";
import getTimeOffset from "@/libs/user/getTimeOffset";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import React from "react";
import UpdateImageAndDescryption from "@/components/camp/authPart/UpdateImageAndDescryption";
import getImageAndDescriptions from "@/libs/camp/getImageAndDescriptions";
import PlanClient from "@/components/camp/authPart/PlanClient";
import PrStudioClient from "@/components/camp/authPart/PrStudioClient";
import RegisterPartClient from "@/components/camp/authPart/RegisPartClient";
import AllAnswerAndQuestionPage from "@/components/camp/question/AllAnswerAndQuestionPage";
import { getAllPlaceData } from "@/components/randomthing/placeSetUp";
import AllInOneLock from "@/components/utility/AllInOneLock";
import BackToHome from "@/components/utility/BackToHome";
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
    outputs.push(
      <>
        <UpdateCampClient
          camp={camp}
          baans={baans}
          parts={parts}
          remainPartName={remainPartName}
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
  if (
    part.auths.includes("แก้ไขรูปภาพและคำอธิบายได้เฉพาะบ้านตัวเอง") &&
    !isBoard
  ) {
    switch (campMemberCard.role) {
      case "nong": {
        return <BackToHome />;
      }
      case "pee": {
        const peeCamp = await getPeeCamp(campMemberCard.campModelId, token);
        const imageAndDescryptionContainersPack = await getImageAndDescriptions(
          peeCamp.baanId,
          token
        );
        outputs.push(
          <UpdateImageAndDescryption
            imageAndDescryptionContainersPack={
              imageAndDescryptionContainersPack
            }
            token={token}
          />
        );
        break;
      }
      case "peto": {
        let i = 0;
        while (i < camp.baanIds.length) {
          const imageAndDescryptionContainersPack =
            await getImageAndDescriptions(camp.baanIds[i++], token);
          outputs.push(
            <UpdateImageAndDescryption
              imageAndDescryptionContainersPack={
                imageAndDescryptionContainersPack
              }
              token={token}
            />
          );
        }
        break;
      }
    }
  }
  if (part.auths.includes("แก้ไขรูปภาพและคำอธิบายได้ทุกบ้าน") || isBoard) {
    let i = 0;
    while (i < camp.baanIds.length) {
      const imageAndDescryptionContainersPack = await getImageAndDescriptions(
        camp.baanIds[i++],
        token
      );
      outputs.push(
        <UpdateImageAndDescryption
          imageAndDescryptionContainersPack={imageAndDescryptionContainersPack}
          token={token}
        />
      );
    }
  }
  return (
    <AllInOneLock lock={user.mode == "nong"} token={token} pushToHome bypass>
      {outputs}
    </AllInOneLock>
  );
}
