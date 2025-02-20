import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AllAnswerAndQuestionPage from "@/components/camp/question/AllAnswerAndQuestionPage";
import BackToHome from "@/components/utility/BackToHome";
import { stringToId } from "@/components/utility/setup";
import getAllAnswerAndQuestion from "@/libs/camp/getAllAnswerAndQuestion";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page({ params }: { params: { cid: string } }) {
  const campId = stringToId(params.cid);
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const data = await getAllAnswerAndQuestion(campId, session.user.token);
  return (
    <AllAnswerAndQuestionPage
      dataInput={data}
      token={session.user.token}
      campIdInput={campId.toString()}
      readOnly
    />
  );
}
