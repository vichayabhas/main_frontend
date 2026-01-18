"use client";

import TopMenuItem from "@/components/randomthing/TopMenuItem";
import { Id } from "../../../../../../configTypes";
import { RoleCamp } from "../../../../../../interface";
import React from "react";

export default function ChatAndQuestionTap({
  campId,
  role,
}: {
  campId: Id;
  role: RoleCamp;
}) {
  return (
    <>
      <TopMenuItem
        title={`คุยส่วนตัวกับ${role == "nong" ? "พี่" : "น้อง"}`}
        pageRef={`/camp/${campId}/allNongChat`}
      />
      <TopMenuItem
        title="คุยกันในบ้าน"
        pageRef={`/camp/${campId}/baan/nongChat`}
      />
      <TopMenuItem
        title="ตอบคำถาม"
        pageRef={`/camp/${campId}/answerTheQuestion`}
      />
      <TopMenuItem title="อ่านแชตทั้งหมด" pageRef={`/camp/${campId}/allChat`} />
    </>
  );
}
