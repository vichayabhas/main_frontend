"use client";
import React from "react";
import { InterWorkingItem } from "../../../interface";
import { useRouter } from "next/navigation";
import { useDownloadExcel } from "react-export-table-to-excel";
import { downloadText } from "../utility/setup";
import StringToHtml from "../utility/StringToHtml";
import FinishButton from "../utility/FinishButton";

export default function WorkingItemWithoutSocketClient({
  workingItems,
  baseUrl,
}: {
  workingItems: InterWorkingItem[];
  baseUrl: string;
}) {
  const router = useRouter();
  const ref = React.useRef(null);
  const download = useDownloadExcel({
    currentTableRef: ref.current,
    filename: "tracking sheet",
  });
  return (
    <div>
      <table ref={ref}>
        <tr>
          <th>id</th>
          <th>งาน</th>
          <th>สถานะ</th>
          <th>link</th>
          <th>ฝ่าย</th>
          <th>จาก</th>
          <th>งานถัดไป</th>
        </tr>
        {workingItems.map((workingItem, i) => (
          <tr key={i}>
            <td onClick={() => router.push(`/${baseUrl}/${workingItem._id}`)}>
              {workingItem._id.toString()}
            </td>
            <td>{workingItem.name}</td>
            <td>{workingItem.status}</td>
            <td>
              {workingItem.link ? (
                <StringToHtml input={workingItem.link} />
              ) : null}
            </td>
            <td
              onClick={() =>
                router.push(`/${baseUrl}/part/${workingItem.partId}`)
              }
            >
              {workingItem.partName}
            </td>
            <td>{workingItem.fromId?.toString()}</td>
            <td>
              {workingItem.linkOutIds.map((o) => o.toString()).toString()}
            </td>
          </tr>
        ))}
      </table>
      <FinishButton text={downloadText} onClick={download.onDownload} />
    </div>
  );
}
