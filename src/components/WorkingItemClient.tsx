"use client";
import React from "react";
import Link from "next/link";
import { InterWorkingItem } from "../../interface";
import { useRouter } from "next/navigation";

export default function WorkingItemClient({
  workingItems,
}: {
  workingItems: InterWorkingItem[];
}) {
  const router = useRouter();
  return (
    <div>
      <table>
        <tr>
          <th>id</th>
          <th>งาน</th>
          <th>สถานะ</th>
          <th>link</th>
          <th>ฝ่าย</th>
          <th>จาก</th>
          <th>งานถัดไป</th>
        </tr>
        {workingItems.map((workingItem,i) => (
          <tr key={i}>
            <td
              onClick={() => router.push(`/trackingSheet/${workingItem._id}`)}
            >
              {workingItem._id.toString()}
            </td>
            <td>{workingItem.name}</td>
            <td>{workingItem.status}</td>
            <td>
              {workingItem.link ? (
                <Link href={workingItem.link}>{workingItem.link}</Link>
              ) : null}
            </td>
            <td
              onClick={() =>
                router.push(`/trackingSheet/part/${workingItem.partId}`)
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
    </div>
  );
}
