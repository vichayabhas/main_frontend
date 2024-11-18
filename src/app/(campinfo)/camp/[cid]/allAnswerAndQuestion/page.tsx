import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AllAnswerAndQuestionPage from "@/components/AllAnswerAndQuestionPage";
import BackToHome from "@/components/BackToHome";
import { stringToId } from "@/components/setup";
import getAllAnswerAndQuestion from "@/libs/camp/getAllAnswerAndQuestion";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page({params}:{params:{cid:string}}){
    const campId=stringToId(params.cid)
    const session=await getServerSession(authOptions)
    if(!session){
        return <BackToHome/>
    }
    const data=await getAllAnswerAndQuestion(campId)
    //return<></>
    return <AllAnswerAndQuestionPage dataInput={data} token={session.user.token} campIdInput={campId.toString()} readOnly />
}