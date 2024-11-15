import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import LostAndFoundClient from "@/components/LostAndFoundClient";
import { getAllPlaceData } from "@/components/placeSetUp";
import getAllUserCamp from "@/libs/camp/getAllUserCamp";
import getLostAndFounds from "@/libs/randomthing/getLostAndFounds";
import { getServerSession } from "next-auth";
import React from "react";
export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const allCamp = await getAllUserCamp(session.user.token);
  const lostAndFounds = await getLostAndFounds(session.user.token);
  const allPlaceData=await getAllPlaceData()
  return (
    <div>
      <table>
        <tr>
          <th>id</th>
          <th>สิ่งของอะไร</th>
          <th>รายละเอียด</th>
          <th>ชื่อเล่นของคนพบหรือหา</th>
          <th>เบอร์ติดต่อ</th>
          <th>ประเภท</th>
          <th>ตึก</th>
          <th>ชั้น</th>
          <th>ห้อง</th>
          <th>ค่าย</th>
        </tr>
        {lostAndFounds.map((lostAndFound,i) => (
          <tr key={i}>
            <td>{lostAndFound._id.toString()}</td>
            <td>{lostAndFound.name}</td>
            <td>{lostAndFound.detail}</td>
            <td>{lostAndFound.userNickname}</td>
            <td>{lostAndFound.tel}</td>
            <td>{lostAndFound.type}</td>
            <td>{lostAndFound.buildingName.toString()}</td>
            <td>{lostAndFound.floor.toString()}</td>
            <td>{lostAndFound.room.toString()}</td>
            <td>{lostAndFound.campName}</td>
          </tr>
        ))}
      </table>
      <LostAndFoundClient
        mapIn={allCamp}
        token={session.user.token}
        allPlaceData={allPlaceData}
      />
    </div>
  );
}
