import AirQuality from "@/components/randomthing/AirQuality";
import TMD from "@/components/randomthing/TMD";
import React from "react";

export default function page({ params }: { params: { select: string } }) {
  return (
    <div>
      <TMD params={params} path="weather" />
      <AirQuality />
    </div>
  );
}
