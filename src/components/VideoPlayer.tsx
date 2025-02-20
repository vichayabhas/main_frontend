"use client";
import { useWindowListener } from "@/hooks/useWindowListener";
import { useEffect } from "react";
import React from "react";
export default function VideoPlayer({
  vdoSrc,
  isPlaying,
}: {
  vdoSrc: string;
  isPlaying: boolean;
}) {
  const vdoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isPlaying) {
      vdoRef.current?.play();
    } else {
      vdoRef.current?.pause();
    }
  }, [isPlaying]);

  useWindowListener("contextmenu", (e) => {
    e.preventDefault();
  });

  return (
    <video className="w-[40%]" src={vdoSrc} ref={vdoRef} controls loop muted />
  );
}
