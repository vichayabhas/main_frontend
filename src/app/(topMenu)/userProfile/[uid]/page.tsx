import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/utility/BackToHome";
import getUser from "@/libs/user/getUser";
import { stringToId } from "@/components/utility/setup";
import getOwnRegisterCampDatas from "@/libs/user/getOwnRegisterCampDatas";

export default async function page({ params }: { params: { uid: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const user = await getUser(stringToId(params.uid));
  const outs = await getOwnRegisterCampDatas(stringToId(params.uid));
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
        {outs.map((out, i) => (
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
