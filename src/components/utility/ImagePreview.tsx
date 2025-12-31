// ImagePreview.tsx
"use client";
import React from "react";



import Image from "next/image";

export default function ImagePreview({ src }: { src: string | null }) {
  if (!src) return <p className="text-gray-500">No image</p>;

  return (
    <Image
      key={src}
      src={src}
      alt="preview"
      width={180}
      height={37}
      unoptimized
      referrerPolicy="no-referrer"
    />
  );
}
