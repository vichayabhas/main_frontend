import getCamp from "@/libs/camp/getCamp"
import ChoicePartChatClient from "@/components/chat/ChoicePartChatClient"
import { stringToId } from "@/components/utility/setup"
import React from "react";
import getParts from "@/libs/camp/getParts"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import BackToHome from "@/components/utility/BackToHome"
export default async function PartChoice({params}:{params:{cid:string}}){
    const session=await getServerSession(authOptions)
    if(!session){
        return <BackToHome/>
    }
    const camp=await getCamp(stringToId(params.cid))
    const parts=await getParts(camp._id,session.user.token)
    return<ChoicePartChatClient parts={parts}/>
    //เอาทุกฝ่ายในค่ายมาให้เลือกให้อ่านแชต
}