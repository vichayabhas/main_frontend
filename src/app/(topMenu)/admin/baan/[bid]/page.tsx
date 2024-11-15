import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import { stringToId } from "@/components/setup";
import UpdateBaanServer from "@/components/UpdateBaanServer";
import getBaan from "@/libs/camp/getBaan";
import getCamp from "@/libs/camp/getCamp";
import getPeeCamp from "@/libs/camp/getPeeCamp";
import getCampMemberCardByCampId from "@/libs/user/getCampMemberCardByCampId";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import React from "react";
export default async function Baan({ params }: { params: { bid: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const token=session.user.token

  const user = await getUserProfile(session.user.token);
  
const baanId = stringToId(params.bid);
if(user.role==='admin'){
  return <UpdateBaanServer baanId={baanId} />;
}
const baan=await getBaan(baanId)
const camp=await getCamp(baan.campId)
const campMemberCard=await getCampMemberCardByCampId(baan.campId,token)
switch (campMemberCard.role){
  case "nong":{
    return<BackToHome/>
  }
  case "pee":{
    const peeCamp=await getPeeCamp(campMemberCard.campModelId,token)
    if(user.authPartIds.includes(camp.partBoardId)){
      return<UpdateBaanServer baanId={baanId}/>
    }
    if(user.authPartIds.includes(camp.partCoopId)&&peeCamp.baanId.toString().localeCompare(params.bid)){
      return<UpdateBaanServer baanId={baanId}/>
    }
    return<BackToHome/>

  }
  case "peto":{
    if(user.authPartIds.includes(camp.partBoardId)){
      return<UpdateBaanServer baanId={baanId}/>
    }
    if(user.authPartIds.includes(camp.partCoopId)){
      return<UpdateBaanServer baanId={baanId}/>
    }
    return<BackToHome/>

  }
}

  
}
