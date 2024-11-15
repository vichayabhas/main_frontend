"use client";

//import React from "react";
import React from "react";
export default function DateConv({
  day,
  month,
  year,
  hours,
  minutes,
}: {
  day: string;
  month: string;
  year: number;
  hours: string;
  minutes: string;
}) {
  //alert('hhhhhhhhh')
  //console.log(month)
  return (
    <div
      style={{
        width: "130px",
        margin: "10px",
        marginTop: "6px",
        fontWeight: "bold",
        scale: "0.9",
      }}
    >
      <>
        {day} {month} {year}
      </>

      <>
        {" "}
        {hours}:{minutes}
      </>
    </div>
  ); // $
}
