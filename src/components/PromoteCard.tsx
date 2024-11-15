"use client";

import FinishButton from "./FinishButton";
import VideoPlayer from "./VideoPlayer";
import { useState } from "react";
import { sendNotification } from "./setup";
import React from "react";
export default function PromoteCard() {
  const [playing, setPlaying] = useState(true);

  return (
    <div
      className="w-[80%] shadow-lg mx-[10%] my-10 p-2 rounded-lg bg-gray-200
        flex flex-row"
    >
      <VideoPlayer vdoSrc="/vdo/getvaccine.mp4" isPlaying={playing} />
      <div>
        Get your vaccine today
        <button
          onClick={() => {
            setPlaying(!playing);
          }}
          className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm "
        >
          {playing ? "Pause" : "Play"}
        </button>
        <FinishButton text={"hvfghjnhbgh"} onClick={() => sendNotification()} />
      </div>
    </div>
  );
}
