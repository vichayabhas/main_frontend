"use client";

import { InterBaanFront } from "../../interface";
import { useRouter } from "next/navigation";
import React from "react";
export default function BaanCard(baan: InterBaanFront) {
  const router = useRouter();
  return (
    <div
      className="flex flex-row h-auto"
      onClick={() => {
        router.push(`/admin/baan/${baan._id}`);
      }}
    >
      <div className="w-3/5 h-auto p-[10px]">
        <div className="text-left pl-5">
          <div className="text-3xl">{baan.name}</div>
        </div>
      </div>
      <div className="w-1/5 h-auto bg-slate-800 rounded-xl hover:bg-slate-600"></div>
    </div>
  );
}
