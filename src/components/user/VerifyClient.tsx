"use client";

import verifyEmail from "@/libs/user/verifyEmail";
import { TextField } from "@mui/material";
import React from "react";
import { setTextToString } from "../utility/setup";
export default function VerifileClient({ token }: { token: string }) {

  const [password, setPassword] = React.useState<string>("");
  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      <div className="text-4xl font-medium">Verify</div>

      <div className="w-[30%] items-center bg-slate-600 p-10 rounded-3xl shadow-[25px_25px_40px_-10px_rgba(0,0,0,0.7)]">
        <div className="flex flex-col items-center my-5 w-full space-y-2">
          <label className="w-full text-2xl text-slate-200">
            Token from Email
          </label>
          <TextField
            name="Password"
            id="Password"
            type="password"
            className="w-full bg-slate-100 rounded-2xl border-gray-200"
            onChange={setTextToString(setPassword, true)}
          />
        </div>

        <div className="flex flex-row justify-end">
          <button
            className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
            onClick={async () => {
              if (password) {
                try {
                  verifyEmail(password, token);
                } catch (error) {
                  console.log(error);
                }
              } else {
                alert("Please type in all the details!");
              }
            }}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}
