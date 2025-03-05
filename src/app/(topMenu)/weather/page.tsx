import AirQuality from "@/components/randomthing/AirQuality";
import TMD from "@/components/randomthing/TMD";
import React from "react";

export default function page() {
  return (
    <div>
      <TMD params={{ select: "" }} path="weather" />
      <AirQuality />
    </div>
  );
}
