"use client";

import { Id, ShowMember } from "../../interface";
import FinishButton from "./FinishButton";
import { useRouter } from "next/navigation";
import React from "react";import chatStyle from "./chat.module.css";

export default function ChatChoiseClient({
  nongs,
  campId,
}: {
  nongs: ShowMember[];
  campId: Id;
}) {
  const router = useRouter();
  return (
    <table
      style={{
        position: "absolute",
        left: "50%",
        width: "80%",
        marginLeft: "-40%",
      }}
    >
      <tr>
        <th>ชือเล่น</th>
        <th>ชื่อจริง</th>
        <th>นามสกุล</th>
        <th>เพศ</th>
        <th>chat</th>
      </tr>
      {nongs.map((user: ShowMember,i) => {
        console.log(user);
        return (
          <tr style={{ border: "solid", borderColor: "white" }} key={i}>
            <td className={chatStyle.cell1}>{user.nickname}</td>
            <td className={chatStyle.cell2}>{user.name}</td>
            <td className={chatStyle.cell1}>{user.lastname}</td>
            <td className={chatStyle.cell2}>{user.gender}</td>
            <td style={{ padding: "5px" }} className={chatStyle.cell1}>
              <FinishButton
                text="chat"
                onClick={() =>
                  router.push(
                    `/camp/${campId}/allNongChat/${user.campMemberCardId}`
                  )
                }
              />
            </td>
          </tr>
        );
      })}
    </table>
  );
}
