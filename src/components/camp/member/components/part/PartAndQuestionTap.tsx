"use client";

import TopMenuItem from "@/components/randomthing/TopMenuItem";
import { Id } from "../../../../../../configTypes";
import React from "react";

export default function PartAndQuestionTap({ campId }: { campId: Id }) {
  return (
    <>
      <TopMenuItem
        title="พี่บ้านคุยกัน"
        pageRef={`/camp/${campId}/peebaanChat`}
      />
      <TopMenuItem title="คุยกันในฝ่าย" pageRef={`/camp/${campId}/part`} />
      <TopMenuItem
        title="รวมคำถามและคำตอบ"
        pageRef={`/camp/${campId}/allAnswerAndQuestion`}
      />
      <TopMenuItem
        title="ตอบคำถาม"
        pageRef={`/camp/${campId}/answerTheQuestion`}
      />
      <TopMenuItem title="อ่านแชตทั้งหมด" pageRef={`/camp/${campId}/allChat`} />
    </>
  );
}
