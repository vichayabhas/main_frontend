
import React from "react";
import { Size } from "../../../../../interface";
import getNongCamp from "@/libs/camp/getNongCamp";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import getCamp from "@/libs/camp/getCamp";
import getBaan from "@/libs/camp/getBaan";
import getShertmanage from "@/libs/user/getCampMemberCard";
import getPeeCamp from "@/libs/camp/getPeeCamp";
import getPetoCamp from "@/libs/camp/getPetoCamp";
import getUser from "@/libs/user/getUser";
import { stringToId } from "@/components/setup";

export default async function page({ params }: { params: { uid: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const user = await getUser(stringToId(params.uid));
  //console.log(user)
  interface Out {
    campName: string;
    role: string;
    baan: string;
    size: Size;
  }
  const outs: Out[] = [];
  let i = 0;
  while (i < user.campMemberCardIds.length) {
    const campMemberCard = await getShertmanage(user.campMemberCardIds[i++]);
    switch (campMemberCard.role) {
      case "nong": {
        const nongCamp = await getNongCamp(
          campMemberCard.campModelId,
          session.user.token
        );
        const camp = await getCamp(nongCamp.campId);
        const baan = await getBaan(nongCamp.baanId);
        outs.push({
          campName: camp.campName,
          role: "น้องค่าย",
          baan: baan.name,
          size: campMemberCard.size,
        });
        break;
      }
      case "pee": {
        const peeCamp = await getPeeCamp(
          campMemberCard.campModelId,
          session.user.token
        );
        const camp = await getCamp(peeCamp.campId);
        const baan = await getBaan(peeCamp.baanId);
        outs.push({
          campName: camp.campName,
          role: "พี่บ้าน",
          baan: baan.name,
          size: campMemberCard.size,
        });
        break;
      }
      case "peto": {
        const petoCamp = await getPetoCamp(
          campMemberCard.campModelId,
          session.user.token
        );
        const camp = await getCamp(petoCamp.campId);

        outs.push({
          campName: camp.campName,
          role: "พี่ปีโตบ้าน",
          baan: "null",
          size: campMemberCard.size,
        });
        break;
      }
    }
  }

  return (
    <div>
      <div>
        {`ชื่อเล่น ${user.nickname} ชื่อจริง ${user.name} นามสกุล ${user.lastname}`}
      </div>
      <table>
        <tr>
          <th>ชื่อค่าย</th>
          <th>ตำแหน่ง</th>
          <th>บ้าน</th>
          <th>Size เสื้อ</th>
        </tr>
        {outs.map((out,i) => (
          <tr key={i}>
            <td>{out.campName}</td>
            <td>{out.role}</td>
            <td>{out.baan}</td>
            <td>{out.size}</td>
          </tr>
        ))}
      </table>
    </div>
  );
  //return<></>
}
