"use client";

import { useRouter } from "next/navigation";;
import React from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { showActionPlan, InterTimeOffset } from "../../../interface";
import FinishButton from "../utility/FinishButton";
import GetTimeHtml from "../utility/GetTimeHtml";
import { getDifferentMinute, downloadText } from "../utility/setup";


export default function ActionPlanClient({
  actionPlans,
  timeOffset,
  baseUrl,
}: {
  actionPlans: showActionPlan[];
  timeOffset: InterTimeOffset;
  baseUrl: string;
}) {
  const router = useRouter();
  const ref = React.useRef(null);
  const download = useDownloadExcel({
    currentTableRef: ref.current,
    filename: "action plan",
  });
  return (
    <div
      className="text-center p-5 text-white rounded-3xl"
      style={{
        backgroundColor: "#961A1D",
        width: "80%",
        marginLeft: "10%",
        padding: "10px",
      }}
    >
      <table
        style={{
          width: "100%",
        }}
        ref={ref}
      >
        <tr style={{ border: "solid", borderColor: "white" }}>
          <th>id</th>
          <th>start</th>
          <th>end</th>
          <th>ใช้เวลา</th>
          <th>partName</th>
          <th>action</th>
          <th>สถานที่</th>
          <th>ผู้ตัดสินใจสูงสุด</th>
          <th>เบอร์โทร</th>
          <th>body</th>
        </tr>
        {actionPlans.map((actionPlan, i) => {
          return (
            <tr style={{ border: "solid", borderColor: "white" }} key={i}>
              <td
                onClick={() => {
                  router.push(`/${baseUrl}/${actionPlan._id}`);
                }}
              >
                {actionPlan._id.toString()}
              </td>
              <td>
                <GetTimeHtml offset={timeOffset} input={actionPlan.start} />
              </td>
              <td>
                <GetTimeHtml offset={timeOffset} input={actionPlan.end} />
              </td>
              <td>{getDifferentMinute(actionPlan.start, actionPlan.end)}</td>
              <td
                onClick={() => {
                  router.push(`/${baseUrl}/part/${actionPlan.partId}`);
                }}
              >
                {actionPlan.partName}
              </td>
              <td>{actionPlan.action}</td>
              <td>{actionPlan.placeName.toString()}</td>
              <td>{actionPlan.headName}</td>
              <td>{actionPlan.headTel}</td>
              <td>{actionPlan.body}</td>
            </tr>
          );
        })}
      </table>
      <FinishButton text={downloadText} onClick={download.onDownload} />
    </div>
  );
}
