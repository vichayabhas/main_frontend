"use client";
import { useRouter } from "next/navigation";
import React from "react";
export default function PushToCamps() {
  const router = useRouter();
  router.push("/camp/");
  return <></>;
}
