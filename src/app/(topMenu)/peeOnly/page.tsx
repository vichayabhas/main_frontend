"use client";
import changeModeToPee from "@/libs/user/changeModeToPee";
import { TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import React from "react";
export default function peeOnlyPage() {
  const router = useRouter();
  const userRef = useRef("");
  const { data: session } = useSession();
  if (!session || session.user.role == "nong") {
    router.push("/");
    return <></>;
  }
  const [password, setPassword] = useState<string>("");
  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      <div className="text-4xl font-medium">Verifile</div>

      <div className="w-[30%] items-center bg-slate-600 p-10 rounded-3xl shadow-[25px_25px_40px_-10px_rgba(0,0,0,0.7)]">
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">Password</label>
          <TextField
            name="Password"
            id="Password"
            type="password"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-row justify-end">
          <button
            className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
            onClick={async () => {
              console.log(password);
              console.log(userRef);
              if (password) {
                try {
                  changeModeToPee(password, session.user.token);
                } catch (error) {
                  console.log(error);
                }
                router.push("/");
              } else {
                alert("Please type in all the details!");
              }
              router.push("/");
            }}
          >
            Verifile
          </button>
        </div>
      </div>
    </div>
  );
}
