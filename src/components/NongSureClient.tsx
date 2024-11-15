"use client";

import paid from "@/libs/camp/paid";
import Link from "next/link";
import { InterCampFront, InterUser } from "../../interface";
import FinishButton from "./FinishButton";
import { getValue } from "./setup";
import React from "react";
export default function NongSureClient({
  campDetail,
  token,
  user,
}: {
  campDetail: InterCampFront;
  token: string;
  user: InterUser;
}) {
  switch (campDetail.registerModel) {
    case "noPaid": {
      return (
        <FinishButton
          text="ยืนยันที่จะเข้าค่าย"
          onClick={() => {
            paid(campDetail._id, token);
          }}
        />
      );
    }
    case "noInterview": {
      return (
        <div>
          <Link href={getValue(campDetail.nongPassIds, user._id)}>Link</Link>
          <FinishButton
            text="ยืนยันที่จะเข้าค่าย+จ่ายตัง"
            onClick={() => {
              paid(campDetail._id, token);
            }}
          />
        </div>
      );
    }
    case "all": {
      return (
        <div>
          <Link href={getValue(campDetail.nongPassIds, user._id)}>Link</Link>
          <FinishButton
            text="ยืนยันที่จะเข้าค่าย+จ่ายตัง"
            onClick={() => {
              paid(campDetail._id, token);
            }}
          />
        </div>
      );
    }
  }
}
