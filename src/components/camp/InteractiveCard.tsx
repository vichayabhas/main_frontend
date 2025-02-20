"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function InteractiveCard({
  children,
  link,
}: {
  children: React.ReactNode;
  contentName: string;
  link: string;
}) {
  const router = useRouter();
  function onCarSelected() {
    router.push(link);
  }
  function onCardMouseAction(event: React.SyntheticEvent) {
    if (event.type === "mouseover") {
      event.currentTarget.classList.add("shadow-lg");
      // Use inline styles to set the background color
      (event.currentTarget as HTMLElement).style.backgroundColor = "#B44C4F";
    } else {
      event.currentTarget.classList.remove("shadow-lg");
      // Reset the background color
      (event.currentTarget as HTMLElement).style.backgroundColor = "#961A1D";
    }
  }

  return (
    <div
      className=" shadow-lg rounded-3xl h-96"
      style={{
        backgroundColor: "#961A1D",
        color: "white",
        padding: "30px",
        fontWeight: "bold",
      }}
      onClick={() => onCarSelected()}
      onMouseOver={(e) => onCardMouseAction(e)}
      onMouseOut={(e) => onCardMouseAction(e)}
    >
      {children}
    </div>
  );
}
