"use client";

import paid from "@/libs/camp/paid";
import Link from "next/link";
import { InterCampFront, InterUser } from "../../interface";
import FinishButton from "./FinishButton";
import { getValue } from "./setup";
import React from "react";
export default function NongSureClient({
  camp,
  token,
  user,
}: {
  camp: InterCampFront;
  token: string;
  user: InterUser;
}) {
  switch (camp.registerModel) {
    case "noPaid": {
      return (
        <FinishButton
          text="ยืนยันที่จะเข้าค่าย"
          onClick={() => {
            paid(camp._id, token);
          }}
        />
      );
    }
    case "noInterview": {
      return (
        <div>
          <Link href={getValue(camp.nongPassIds, user._id)}>Link</Link>
          <FinishButton
            text="ยืนยันที่จะเข้าค่าย+จ่ายตัง"
            onClick={() => {
              paid(camp._id, token);
            }}
          />
        </div>
      );
    }
    case "all": {
      return (
        <div>
          <Link href={getValue(camp.nongPassIds, user._id)}>Link</Link>
          <FinishButton
            text="ยืนยันที่จะเข้าค่าย+จ่ายตัง"
            onClick={() => {
              paid(camp._id, token);
            }}
          />
        </div>
      );
    }
  }
}
