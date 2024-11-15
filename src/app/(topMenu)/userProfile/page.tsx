"use client";
import { TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

export default function HospitalDetailPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [tel, setTel] = useState<string | null>(null);

  if (!session) {
    router.push("/");
    return <></>;
  }
  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      <div className="text-4xl font-medium">ค้นหาชื่อ นามสกุล ชื่อเล่น</div>

      <div className="w-[30%] items-center bg-slate-600 p-10 rounded-3xl shadow-[25px_25px_40px_-10px_rgba(0,0,0,0.7)]">
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">userId</label>
          <TextField
            name="Tel"
            id="Tel"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setTel(e.target.value)}
            defaultValue={tel}
          />
        </div>
        <div className="flex flex-row justify-end">
          <button
            className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
            onClick={() => {
              console.log(tel);
              if (tel) {
                router.push(`/userProfile/${tel}`);
              } else {
                alert("ไม่ได้ใส่id");
              }
            }}
          >
            check userId
          </button>
        </div>
      </div>
    </div>
  );
}
