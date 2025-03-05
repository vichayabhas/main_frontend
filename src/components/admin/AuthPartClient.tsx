"use client";
import { useRouter } from "next/navigation";
import { BasicPart } from "../../../interface";
import React from "react";
import FinishButton from "../utility/FinishButton";
export default function AuthPartClient({ parts }: { parts: BasicPart[] }) {
  const router = useRouter();
  return (
    <div
      className="text-center p-5 text-white rounded-3xl"
      style={{
        backgroundColor: "#961A1D",
        width: "70%",
        marginLeft: "15%",
        marginTop: "100px",
      }}
    >
      {parts.map((part, i) => (
        <FinishButton
          key={i}
          text={part.partName}
          onClick={() => {
            router.push(`/authPart/${part._id}`);
          }}
        />
      ))}
    </div>
  );
}
