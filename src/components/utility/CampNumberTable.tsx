"use client";
import { useDownloadExcel } from "react-export-table-to-excel";
import { CampNumberData } from "../../../interface";
import React from "react";
import FinishButton from "./FinishButton";
import { downloadText } from "./setup";
export default function CampNumberTable({
  groupName,
  isHavePeto,
  main,
  partNumbers,
  baanNumbers,
  filename,
  nongCall
}: {
  groupName: string;
  isHavePeto: boolean;
  main: CampNumberData;
  baanNumbers: CampNumberData[];
  partNumbers: CampNumberData[];
  filename: string;
  nongCall:string
}) {
  const ref = React.useRef(null);
  const download = useDownloadExcel({ currentTableRef: ref.current, filename });
  return (
    <div>
      <table ref={ref}>
        <tr>
          <th>{groupName}/ฝ่าย</th>
          <th>{nongCall}</th>
          <th>พี่{groupName}</th>
          {isHavePeto ? <th>ปีโต</th> : null}
        </tr>
        <tr>
          <td>ค่าย{main.name}</td>
          <td>{main.nongNumber}</td>
          <td>{main.peeNumber}</td>
          {isHavePeto ? <td>{main.petoNumber}</td> : null}
        </tr>
        {baanNumbers.map((baan, i) => (
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
        {partNumbers.map((part, i) => (
          <tr key={i}>
            <td>ฝ่าย{part.name}</td>
            <td>{part.nongNumber}</td>
            <td>{part.peeNumber}</td>
            {isHavePeto ? <td>{part.petoNumber}</td> : null}
          </tr>
        ))}
      </table>
      <FinishButton text={downloadText} onClick={download.onDownload} />
    </div>
  );
}
