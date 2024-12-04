import AirQuality from "@/components/AirQuality";
import TMD from "@/components/TMD";
import React from "react";

export default function page() {
  return (
    <div>
      <TMD params={{select:''}} path="weather"/>
      <AirQuality />
    </div>
  );
}
