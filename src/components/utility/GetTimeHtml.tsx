import dayjs from "dayjs";
import DateConv from "./Dateconv";
import React from "react";
import { UpdateTimeOffsetRaw } from "../../../interface";
export default function GetTimeHtml({
  input,
  offset,
}: {
  input: dayjs.ConfigType;
  offset: UpdateTimeOffsetRaw;
}) {
  const monthArray = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];
  const dateObj = dayjs(input)
    .add(-offset.day, "days")
    .add(-offset.hour, "hours")
    .add(-offset.minute, "minutes")
    .toDate();
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = monthArray[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  return (
    <DateConv
      day={day}
      minutes={minutes}
      month={month}
      year={year}
      hours={hours}
    />
  );
}
