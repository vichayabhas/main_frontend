"use client";

import { useDownloadExcel } from "react-export-table-to-excel";
import {
  BasicBaan,
  BasicCamp,
  BasicPart,
  BasicUser,
  InterCampDict,
  RoleCamp,
} from "../../../../../../interface";
import React from "react";
import { copy, downloadText, getLastAnd } from "@/components/utility/setup";
import FinishButton from "@/components/utility/FinishButton";
import AllInOneLock from "@/components/utility/AllInOneLock";

export default function CampDictClient({
  campDicts,
  partData,
  baanData,
  camp,
  user,
  role,
}: {
  campDicts: InterCampDict[];
  baanData?: {
    baan: BasicBaan;
    baanDicts: InterCampDict[];
  };
  partData?: {
    part: BasicPart;
    partDicts: InterCampDict[];
  };
  camp: BasicCamp;
  user: BasicUser;
  role: RoleCamp;
}) {
  const fileNames = [`ส่วนกลางในค่าย${camp.campName}`];
  const finalCampDicts = campDicts.map(copy);
  if (partData) {
    fileNames.push(`ฝ่าย${partData.part.partName}`);
    finalCampDicts.push(...partData.partDicts);
  }

  if (baanData) {
    fileNames.push(`${camp.groupName}${baanData.baan.name}`);
    finalCampDicts.push(...baanData.baanDicts);
  }
  const ref = React.useRef(null);
  const download = useDownloadExcel({
    currentTableRef: ref.current,
    filename: getLastAnd(fileNames),
  });
  return (
    <div>
      <table ref={ref}>
        <tr>
          <th>key</th>
          <th>ความหมาย</th>
        </tr>
        {finalCampDicts.map((campDict, i) => (
          <AllInOneLock
            canNongAccidentallySee={campDict.canNongAccidentallySee}
            key={i}
            bypass={campDict.canNongSee}
            role={role}
            mode={user.mode}
          >
            <tr>
              <td>{campDict.key}</td>
              <td>{campDict.value}</td>
            </tr>
          </AllInOneLock>
        ))}
      </table>
      <FinishButton onClick={download.onDownload} text={downloadText} />
    </div>
  );
}
