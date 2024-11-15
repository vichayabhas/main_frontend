import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import MenuPeeClient from "@/components/MenuPeeClient";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import React from "react";
export default async function page(){
    const session=await getServerSession(authOptions)
    if(!session){
        return<BackToHome/>
    }
    const user=await getUserProfile(session.user.token)
    if(user.role==='nong'){
        return <BackToHome/>
    }
    return <MenuPeeClient user={user}/>
}