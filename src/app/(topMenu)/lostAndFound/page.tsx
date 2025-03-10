import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/utility/BackToHome";
import LostAndFoundClient from "@/components/randomthing/LostAndFoundClient";
import getAllUserCamp from "@/libs/camp/getAllUserCamp";
import getLostAndFounds from "@/libs/randomthing/getLostAndFounds";
import { getServerSession } from "next-auth";
import React from "react";
import { getAllPlaceData } from "@/components/randomthing/placeSetUp";
export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const allCamp = await getAllUserCamp(session.user.token);
  const lostAndFounds = await getLostAndFounds(session.user.token);
  const allPlaceData = await getAllPlaceData();
  return (
    <div>
      <LostAndFoundClient
        mapIn={allCamp}
        token={session.user.token}
        allPlaceData={allPlaceData}
        lostAndFounds={lostAndFounds}
      />
    </div>
  );
}
