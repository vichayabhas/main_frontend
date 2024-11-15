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
      <div className="text-4xl font-bold"
          style={{
            color:"#961A1D"
          }}
      >Check Tel </div>

      <div className="w-[70%] items-center p-10 rounded-3xl "
      style={{
        backgroundColor:"#961A1D"
      }}
      >
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">Telephone</label>
          <TextField
            name="Tel"
            id="Tel"
            className="w-3/5 bg-white rounded-2xl border-gray-200"
            sx={{
              backgroundColor: '#f5f5f5',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: ' 1rem',
                  borderColor: 'transparent', 
                },
                '&:hover fieldset': {
                  borderColor: '#5479FF',     
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#5479FF',      
                }
              }
            }}
            onChange={(e) => setTel(e.target.value)}
            defaultValue={tel}
          />
        </div>
        <div className="flex flex-row justify-end">
          <button
            className="bg-white p-3 font-medium rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
            style={{
              color:"#961A1D"
            }}
            onClick={() => {
              if (tel) {
                router.push(`/tel/${tel}`);
              } else {
                alert("ไม่ได้ใส่หมายเลขโทรศัพท์");
              }
            }}
          >
            checkTel
          </button>
        </div>
      </div>
    </div>
  );
}
