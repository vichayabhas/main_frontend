"use client";

import { useRouter } from "next/navigation";
import { BasicPart } from "../../../interface";
import React from "react";
import FinishButton from "../utility/FinishButton";
export default function ChoicePartChatClient({
  parts,
}: {
  parts: BasicPart[];
}) {
  const router = useRouter();
  return parts.map((part,i) => (
    <FinishButton key={i}
      text={part.partName}
      onClick={() => {
        router.push(`/camp/${part.campId}/part/${part._id}/chat`);
      }}
    />
  ));
}
