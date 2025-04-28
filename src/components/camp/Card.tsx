
"use client";
import Image from "next/image";
import React from "react";
import InteractiveCard from "./InteractiveCard";

import { ClockIcon } from "@mui/x-date-pickers";
import { BasicCamp, Id } from "../../../interface";
import { RealTimeCamp } from "./authPart/UpdateCampClient";
import { io } from "socket.io-client";
import { getBackendUrl } from "../utility/setup";

//import { Router } from "next/router";
//import { useRouter } from "next/navigation";

const socket = io(getBackendUrl());
export default function Card({
  hospitalName,
  onRating,
  link,
  camp: campInput,
}: {
  hospitalName: string;
  onRating: (input: string) => void;
  value?: number | null;
  link: string;
  imgSrc: string | null;
  id: Id;
  camp: BasicCamp;
  //onCarSelected :Function
}) {
  //  const session=await getServerSession()

  const [camp, setCamp] = React.useState(campInput);
  const realTimeCamp = new RealTimeCamp(camp._id, socket);
  React.useEffect(() => {
    realTimeCamp.listen(setCamp);
    return () => {
      realTimeCamp.disconnect();
    };
  });
  return (
    <InteractiveCard
      contentName={hospitalName}
      link={link} /*onCarSelected={()=>{onCarSelected}}*/
    >
      <div
        className="flex flex-row h-auto"
        onClick={() => {
          onRating(`/camp/${camp._id}`);
        }}
      >
        <div className="w-1/5 h-auto relative rounded-t-lg">
          {camp.logoUrl ? (
            <Image
              src={camp.logoUrl}
              alt="Massage Shop Picture"
              fill={true}
              className="object-cover rounded-t-lg"
            />
          ) : null}
        </div>

        <div className="w-3/5 h-auto p-[10px]">
          <div className="text-left pl-5">
            <div className="text-3xl">{hospitalName}</div>

            <div className="text-2xl my-10">
              <ClockIcon className="mr-5" />
              {camp.open ? <>เปิดรับสมัคร</> : <>ปิดรับสมัครแล้ว</>}
            </div>
          </div>
        </div>
        <div className="w-1/5 h-auto bg-slate-800 rounded-xl hover:bg-slate-600"></div>
      </div>
    </InteractiveCard>
  );
} //
