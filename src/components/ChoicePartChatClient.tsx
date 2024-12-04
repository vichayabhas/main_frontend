"use client";

import { useRouter } from "next/navigation";
import { BasicPart } from "../../interface";
import FinishButton from "./FinishButton";
import React from "react";
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
