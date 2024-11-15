"use client";
import { useRouter } from "next/navigation";
import React from "react";
export default function BackToHome() {
  const router = useRouter();
  router.push("/");
  return <></>;
}
