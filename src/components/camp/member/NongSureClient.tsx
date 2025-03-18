"use client";

import paid from "@/libs/camp/paid";
import Link from "next/link";
import { CampState } from "../../../../interface";
import React from "react";
import ImagesFromUrl from "../../utility/ImagesFromUrl";
import FinishButton from "@/components/utility/FinishButton";
import { RealTimeCamp } from "../authPart/UpdateCampClient";
import { io } from "socket.io-client";
import { getBackendUrl } from "@/components/utility/setup";
const socket = io(getBackendUrl());
export default function NongSureClient({
  token,
  campState,
}: {
  token: string;
  campState: CampState;
}) {
  const [camp, setCamp] = React.useState(campState.camp);
  const realTimeCamp = new RealTimeCamp(camp._id, socket);
  React.useEffect(() => {
    realTimeCamp.listen(setCamp);
    return () => {
      realTimeCamp.disconect();
    };
  });
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
          <Link href={campState.link}>Link</Link>
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
          <Link href={campState.link}>Link</Link>
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
