import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import { stringToId } from "@/components/setup";
import getPlace from "@/libs/randomthing/getPlace";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import React from "react";
export default async function PlacePage({
  params,
}: {
  params: { bid: string; pid: string };
}) {
  const session=await getServerSession(authOptions)
    if(!session){
        return<BackToHome/>

    }
    const user=await getUserProfile(session.user.token)
    if(user.role==='nong'){
        return <BackToHome/>
    }
  const place = await getPlace(stringToId(params.pid));
  //const building=await getBuild
  return (
    <div>
      <table>
        <tr>
          <td>กิจกรรม</td>
          <td>ห้องเรียน</td>
          <td>ห้องนอน</td>
          <td>id</td>
        </tr>
        <tr>
          <td>{place.actCap}</td>
          <td>{place.studyCap}</td>
          <td>{place.sleepCap} </td>
          <td>{place._id.toString()}</td>
        </tr>
      </table>
    </div>
  );
}
