import { CampNumberData } from "../../interface";
import React from "react";
export default function CampNumberTable({
  groupName,
  isHavePeto,
  main,
  partNumbers,
  baanNumbers,
}: {
  groupName: string;
  isHavePeto: boolean;
  main:CampNumberData
  baanNumbers: CampNumberData[];
  partNumbers: CampNumberData[];
}) {
  return (
    <table>
      <tr>
        <th>{groupName}/ฝ่าย</th>
        <th>น้องค่าย</th>
        <th>พี่{groupName}</th>
        {isHavePeto ? <th>ปีโต</th> : null}
      </tr>
      <tr>
        <td>ค่าย{main.name}</td>
        <td>{main.nongNumber}</td>
        <td>{main.peeNumber}</td>
        {isHavePeto ? <td>{main.petoNumber}</td> : null}
      </tr>
      {baanNumbers.map((baan,i) => (
        <tr key={i}>
          <td>
            {groupName}
            {baan.name}
          </td>
          <td>{baan.nongNumber}</td>
          <td>{baan.peeNumber}</td>
          {isHavePeto ? <td>{baan.petoNumber}</td> : null}
        </tr>
      ))}
      {partNumbers.map((part,i) => (
        <tr key={i}>
          <td>ฝ่าย{part.name}</td>
          <td>{part.nongNumber}</td>
          <td>{part.peeNumber}</td>
          {isHavePeto ? <td>{part.petoNumber}</td> : null}
        </tr>
      ))}
    </table>
  );
}
