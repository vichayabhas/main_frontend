"use client";
import FinishButton from "@/components/utility/FinishButton";
import { getBackendUrl, downloadText } from "@/components/utility/setup";
import StringToHtml from "@/components/utility/StringToHtml";
import { useRouter } from "next/router";
import React from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { io } from "socket.io-client";
import { Id } from "../../../../configTypes";
import { InterWorkingItem } from "../../../../interface";
import { RealTimeTrackingSheet } from "../setup";

const socket = io(getBackendUrl());
export default function WorkingItemClient({
  workingItems: inputs,
  baseUrl,
  roomId,
  password: passwordIn,
}: {
  workingItems: InterWorkingItem[];
  baseUrl: string;
  roomId: Id;
  password: string;
}) {
  const router = useRouter();
  const ref = React.useRef(null);
  const download = useDownloadExcel({
    currentTableRef: ref.current,
    filename: "tracking sheet",
  });
  const [workingItems, setWorkingItems] = React.useState(inputs);
  const realTimeTrackingSheet = new RealTimeTrackingSheet(roomId, socket);
  React.useEffect(() => {
    realTimeTrackingSheet.listen((data) => {
      setWorkingItems(
        data.map(
          ({
            _id,
            link,
            password,
            linkOutIds,
            partId,
            partName,
            name,
            status,
            fromId,
            createBy,
          }) => {
            if (passwordIn != password) {
              link = null;
            }
            return {
              _id,
              link,
              linkOutIds,
              partId,
              partName,
              password,
              name,
              status,
              fromId,
              createBy,
            };
          }
        )
      );
    });
    return () => {
      realTimeTrackingSheet.disconnect();
    };
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
