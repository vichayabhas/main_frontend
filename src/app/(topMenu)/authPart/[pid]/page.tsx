import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { stringToId } from "@/components/utility/setup";
import UpdateBaanServer from "@/components/camp/authPart/UpdateBaanServer";
import UpdateCampClient from "@/components/camp/authPart/UpdateCampClient";
import UpdateQuestionClient from "@/components/camp/question/UpdateQuestionClient";
import WelfareClient from "@/components/camp/authPart/WelfareClient";
import getAllAnswerAndQuestion from "@/libs/camp/getAllAnswerAndQuestion";
import getAllPlanData from "@/libs/camp/getAllPlanData";
import getAllQuestion from "@/libs/camp/getAllQuestion";
import getAllWelfare from "@/libs/camp/getAllWelfare";
import getCamp from "@/libs/camp/getCamp";
import getPart from "@/libs/camp/getPart";
import getPeeCamp from "@/libs/camp/getPeeCamp";
import getRegisterData from "@/libs/camp/getRegisterData";
import getAuthSongs from "@/libs/randomthing/getAuthSongs";
import getCampMemberCardByCampId from "@/libs/user/getCampMemberCardByCampId";
import getTimeOffset from "@/libs/user/getTimeOffset";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import React from "react";
import UpdateImageAndDescription from "@/components/camp/authPart/UpdateImageAndDescription";
import getImageAndDescriptions from "@/libs/camp/getImageAndDescriptions";
import PlanClient from "@/components/camp/authPart/PlanClient";
import PrStudioClient from "@/components/camp/authPart/PrStudioClient";
import RegisterPartClient from "@/components/camp/authPart/RegisPartClient";
import AllAnswerAndQuestionPage from "@/components/camp/question/AllAnswerAndQuestionPage";
import { getAllPlaceData } from "@/components/randomthing/placeSetUp";
import AllInOneLock from "@/components/utility/AllInOneLock";
import BackToHome from "@/components/utility/BackToHome";
import getGroupContainerForAdmin from "@/libs/camp/getGroupContainerForAdmin";
import SubGroupAdminClient from "@/components/camp/authPart/SubGroupAdminClient";
import getCampForUpdate from "@/libs/admin/getCampForUpdate";
import getOrderForAdmin from "@/libs/camp/getOrderForAdmin";
import ManageItem from "@/components/camp/authPart/ManageItem";
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
  if (!camp.boardIds.includes(user._id) && part.auths.length == 0) {
    return <BackToHome />;
  }
  const outputs: React.ReactNode[] = [];
  let isBoard = false;
  if (camp.boardIds.includes(user._id)) {
    const data = await getCampForUpdate(camp._id, token);
    outputs.push(
      <>
        <UpdateCampClient data={data} token={token} />
      </>
    );
    isBoard = true;
  }
  if (part.auths.includes("แก้ไขคำถาม")) {
    const questions = await getAllQuestion(token, camp._id);
    outputs.push(
      <UpdateQuestionClient camp={camp} token={token} questions={questions} />
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
        const imageAndDescriptionContainersPack = await getImageAndDescriptions(
          peeCamp.baanId,
          token
        );
        outputs.push(
          <UpdateImageAndDescription
            imageAndDescriptionContainersPack={
              imageAndDescriptionContainersPack
            }
            token={token}
          />
        );
        break;
      }
      case "peto": {
        let i = 0;
        while (i < camp.baanIds.length) {
          const imageAndDescriptionContainersPack =
            await getImageAndDescriptions(camp.baanIds[i++], token);
          outputs.push(
            <UpdateImageAndDescription
              imageAndDescriptionContainersPack={
                imageAndDescriptionContainersPack
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
      const imageAndDescriptionContainersPack = await getImageAndDescriptions(
        camp.baanIds[i++],
        token
      );
      outputs.push(
        <UpdateImageAndDescription
          imageAndDescriptionContainersPack={imageAndDescriptionContainersPack}
          token={token}
        />
      );
    }
  }
  if (part.auths.includes("แก้ไขกลุ่มได้") || isBoard) {
    switch (campMemberCard.role) {
      case "nong": {
        return <BackToHome />;
      }
      case "pee": {
        if (isBoard) {
          let i = 0;
          while (i < camp.baanIds.length) {
            const data = await getGroupContainerForAdmin(camp.baanIds[i++]);
            outputs.push(<SubGroupAdminClient data={data} token={token} />);
          }
          break;
        } else {
          const peeCamp = await getPeeCamp(campMemberCard.campModelId, token);
          const data = await getGroupContainerForAdmin(peeCamp.baanId);
          outputs.push(<SubGroupAdminClient data={data} token={token} />);
          break;
        }
      }
      case "peto": {
        let i = 0;
        while (i < camp.baanIds.length) {
          const data = await getGroupContainerForAdmin(camp.baanIds[i++]);
          outputs.push(<SubGroupAdminClient data={data} token={token} />);
        }
        break;
      }
    }
  }
  if (part.auths.includes("สามารถจัดการของได้") || isBoard) {
    const data = await getOrderForAdmin(camp._id, token);
    outputs.push(<ManageItem data={data} token={token} />);
  }
  return (
    <AllInOneLock lock={user.mode == "nong"} token={token} pushToHome>
      {outputs}
    </AllInOneLock>
  );
}
