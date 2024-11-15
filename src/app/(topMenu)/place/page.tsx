import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import BuildingClient from "@/components/BuildingClient";
import getAllBuilding from "@/libs/randomthing/getAllBuilding";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import React from "react";
export default async function Placepage(){
    const buildings=await getAllBuilding()
    //console.log(buildings)
    
    const session=await getServerSession(authOptions)
    if(!session){
        return<BackToHome/>

    }
    const user=await getUserProfile(session.user.token)
    if(user.role==='nong'){
        return <BackToHome/>
    }
    return<BuildingClient buildings={buildings} token={session.user.token} />
}