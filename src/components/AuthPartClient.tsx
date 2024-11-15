"use client";
import { useRouter } from "next/navigation";
import { InterPartFront } from "../../interface";
import FinishButton from "./FinishButton";
import React from "react";
export default function AuthPartClient({ parts }: { parts: InterPartFront[] }) {
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
      {parts.map((part,i) => (
        <FinishButton key={i}
          text={part.partName}
          onClick={() => {
            router.push(`/authPart/${part._id}`);
          }}
        />
      ))}
    </div>
  );
}
