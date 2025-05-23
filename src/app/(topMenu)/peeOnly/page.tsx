"use client";
import { setTextToString } from "@/components/utility/setup";
import changeModeToPee from "@/libs/user/changeModeToPee";
import { TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
export default function peeOnlyPage() {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session || session.user.role == "nong") {
    router.push("/");
    return <></>;
  }
  const [password, setPassword] = React.useState<string>("");
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
            onChange={setTextToString(setPassword)}
            value={password}
          />
        </div>
        <div className="flex flex-row justify-end">
          <button
            className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
            onClick={async () => {
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
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}
