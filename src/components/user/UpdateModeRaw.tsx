"use client";
import { Session } from "next-auth";
import { Id, InterCampFront, InterUser } from "../../../interface";
import React from "react";
import { useRouter } from "next/navigation";
import peeUpdateMode from "@/libs/user/peeUpdateMode";
import { Checkbox, Input, TextField } from "@mui/material";
import { setSwop } from "../utility/setup";
import FinishButton from "../utility/FinishButton";

export default function UpdateModeRaw({
  session,
  user,
  camps,
}: {
  session: Session | null;
  user: InterUser | null;
  camps: InterCampFront[];
}) {
  const router = useRouter();

  if (!session || !user || user.role == "nong") {
    router.push("/");
    return <></>;
  }
  const [linkHash, setLinkHash] = React.useState<string>(user.linkHash);
  const [mode, setMode] = React.useState<"pee" | "nong" | null>(null);
  const [filterIds, setFilterIds] = React.useState<Id[]>(user.filterIds);
  //alert(filterIds.length)

  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      <div
        className="text-4xl font-bold"
        style={{
          color: "#961A1D",
        }}
      >
        update
      </div>
      <form
        className="w-[30%] items-center  p-10 rounded-3xl "
        style={{
          backgroundColor: "#961A1D",
        }}
      >
        <div className="flex flex-row items-center">
          <label className="w-2/5 text-2xl text-slate-200">รหัส</label>
          <TextField
            name="Name"
            id="Name"
            value={linkHash}
            className="w-3/5 bg-white rounded-2xl shadow-inner"
            sx={{
              backgroundColor: "#f5f5f5",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: " 1rem",
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "#5479FF",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#5479FF",
                },
              },
            }}
            onChange={(e) => setLinkHash(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">mode</label>
          <Input
            type="radio"
            id="bottle"
            value={"male"}
            onClick={() => setMode("pee")}
            className="h-4 w-4 rounded border-gray-300 focus:ring-indigo-600"
          />
          <label className="w-2/5 text-2xl text-white">พี่</label>
          <Input
            type="radio"
            id="bottle"
            value={"female"}
            onClick={() => setMode("nong")}
            className="h-4 w-4 rounded border-gray-300 focus:ring-indigo-600"
          />
          <label className="w-2/5 text-2xl text-white">น้อง</label>
        </div>
        <div className="flex flex-row justify-end">
          <FinishButton
            text="update mode"
            onClick={() => {
              if (mode) {
                peeUpdateMode(session.user.token, mode, filterIds, linkHash);
              }
            }}
          />
        </div>
        {camps.map((camp: InterCampFront, i) => {
          return (
            <div className="text-2xl my-10 text-white" key={i}>
              <Checkbox
                sx={{
                  "&.Mui-checked": {
                    color: "#FFFFFF", // Custom color when checked
                  },
                }}
                onChange={setSwop(camp._id, setFilterIds)}
                checked={filterIds.includes(camp._id)}
              />
              {camp.campName}
            </div>
          );
        })}
      </form>
    </div>
  );
}
