"use client";

import paid from "@/libs/camp/paid";
import Link from "next/link";
import { CampState } from "../../../../interface";
import React from "react";
import ImagesFromUrl from "../../utility/ImagesFromUrl";
import FinishButton from "@/components/utility/FinishButton";
export default function NongSureClient({
  token,
  campState: { camp, link },
}: {
  token: string;
  campState: CampState;
}) {
  switch (camp.registerModel) {
    case "noPaid": {
      return (
        <>
          <ImagesFromUrl urls={camp.pictureUrls} />
          <FinishButton
            text="ยืนยันที่จะเข้าค่าย"
            onClick={() => {
              paid(camp._id, token);
            }}
          />
        </>
      );
    }
    case "noInterview": {
      return (
        <div>
          <ImagesFromUrl urls={camp.pictureUrls} />
          <Link href={link}>Link</Link>
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
          <ImagesFromUrl urls={camp.pictureUrls} />
          <Link href={link}>Link</Link>
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
