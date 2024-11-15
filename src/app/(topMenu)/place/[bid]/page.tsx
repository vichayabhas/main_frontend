import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import PlaceClient from "@/components/PlaceClient";
import { stringToId } from "@/components/setup";
import getPlaces from "@/libs/randomthing/getPlaces";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import React from "react";
export default async function PlacePage({
  params,
}: {
  params: { bid: string };
}) {
  const places = await getPlaces(stringToId(params.bid));
  //console.log(places)
  const session=await getServerSession(authOptions)
    if(!session){
        return<BackToHome/>

    }
    const user=await getUserProfile(session.user.token)
    if(user.role==='nong'){
        return <BackToHome/>
    }
  return (
    <PlaceClient
      places={places}
      token={session.user.token}
      buildingId={params.bid}
    />
  );
}
