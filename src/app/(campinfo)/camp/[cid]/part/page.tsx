import getCamp from "@/libs/camp/getCamp"
import getPart from "@/libs/camp/getPart"
import { InterPartFront } from "../../../../../../interface"
import ChoicePartChatClient from "@/components/ChoicePartChatClient"
import { stringToId } from "@/components/setup"
import React from "react";
export default async function PartChoice({params}:{params:{cid:string}}){
    let i=0
    const camp=await getCamp(stringToId(params.cid))
    const parts:InterPartFront[]=[]
    while(i<camp.partIds.length){
        const part=await getPart(camp.partIds[i++])
        parts.push(part)
    }
    return<ChoicePartChatClient parts={parts}/>
    //เอาทุกฝ่ายในค่ายมาให้เลือกให้อ่านแชต
}