import { BasicUser } from "../../../interface";
import React from "react";

export default function UserNameTable({ inputs }: { inputs: BasicUser[] }) {
  return (
    <table>
      <tr>
        <th>ชื่อจริง</th>
        <th>นามสกุล</th>
        <th>ชื่อเล่น</th>
      </tr>
      {inputs.map((input, i) => (
        <tr key={i}>
          <td>{input.name}</td>
          <td>{input.lastname}</td>
          <td>{input.nickname}</td>
        </tr>
      ))}
    </table>
  );
}
