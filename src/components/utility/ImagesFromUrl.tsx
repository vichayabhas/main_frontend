"use client";
import Image from "next/image";
import React from "react";
export default function ImagesFromUrl({ urls }: { urls: string[] }) {
  return urls.map((url, i) => (
    <Image src={url} alt={""} width={100} height={100} key={i} />
  ));
}
