import Link from "next/link";
import React from "react";
export default function StringToHtml({ input }: { input: string }) {
  try {
    const url = new URL(input);
    return <Link href={url}>{input}</Link>;
  } catch {
    return (
      <div
        style={{
          fontWeight: "bold",
          fontSize: "17px",
          display: "inline-block",
          backgroundColor: "#373737",
          color: "white",
          padding: "5px",
          paddingLeft: "18px",
          paddingRight: "18px",
          borderRadius: "18px 18px 18px 6px",
        }}
      >
        {input}
      </div>
    );
  }
}
