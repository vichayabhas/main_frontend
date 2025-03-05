import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/utility/BackToHome";
import PureQuestion from "@/components/camp/question/PureQuestion";
import { stringToId } from "@/components/utility/setup";
import getAllQuestion from "@/libs/camp/getAllQuestion";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page({ params }: { params: { cid: string } }) {
  const campId = stringToId(params.cid);
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const questions = await getAllQuestion(session.user.token, campId);
  return (
    <PureQuestion
      campIdString={campId.toString()}
      token={session.user.token}
      questions={questions}
    />
  );
}
