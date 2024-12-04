import AirQuality from "@/components/AirQuality";
import TMD from "@/components/TMD";
import React from "react";

export default function page({ params }: { params: { select: string } }) {
  return (
    <div>
      <TMD params={params} path="weather" />
      <AirQuality />
    </div>
  );
}
