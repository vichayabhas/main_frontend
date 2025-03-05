"use client";

import updateTimeOffset from "@/libs/user/updateTimeOffset";
import React from "react";
import { setTextToInt } from "../utility/setup";
import { TextField } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { InterTimeOffset } from "../../../interface";
import DateConv from "../utility/Dateconv";
import FinishButton from "../utility/FinishButton";
export default function TestDateTime({
  token,
  selectOffset,
  displayOffset,
}: {
  token: string;
  selectOffset: InterTimeOffset;
  displayOffset: InterTimeOffset;
}) {
  const [selectMinute, setSelectMinute] = React.useState<number>(
    selectOffset.minute
  );
  const [selectHour, setSelectHour] = React.useState<number>(selectOffset.hour);
  const [selectDay, setSelectDay] = React.useState<number>(selectOffset.day);
  const [displayMinute, setDisplayMinute] = React.useState<number>(
    displayOffset.minute
  );
  const [displayHour, setDisplayHour] = React.useState<number>(
    displayOffset.hour
  );
  const [displayDay, setDisplayDay] = React.useState<number>(displayOffset.day);
  const [select, setSelect] = React.useState<dayjs.Dayjs>(dayjs(Date.now()));
  const dateObj = dayjs(new Date(Date.now()))
    .add(-displayMinute, "minutes")
    .add(-displayHour, "hours")
    .add(-displayDay, "days")
    .toDate();
  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayn = String(dateObj.getDate()).padStart(2, "0");
  const monthn = monthArray[dateObj.getMonth()];
  const yearn = dateObj.getFullYear();
  const hoursn = String(dateObj.getHours()).padStart(2, "0");
  const minutesn = String(dateObj.getMinutes()).padStart(2, "0");
  const dateObjs = select
    ?.add(-(displayMinute + selectMinute), "minutes")
    .add(-(displayHour + selectHour), "hours")
    .add(-(displayDay + selectDay), "days")
    .toDate();
  const days = String(dateObjs.getDate()).padStart(2, "0");
  const months = monthArray[dateObjs.getMonth()];
  const years = dateObjs.getFullYear();
  const hourss = String(dateObjs.getHours()).padStart(2, "0");
  const minutess = String(dateObjs.getMinutes()).padStart(2, "0");
  return (
    <div>
      <DateConv
        day={dayn}
        hours={hoursn}
        year={yearn}
        month={monthn}
        minutes={minutesn}
      />
      <div className="flex flex-row items-center">
        <label className="w-2/5 text-2xl text-slate-200">แสดงวัน</label>
        <TextField
          name="Name"
          id="Name"
          type="number"
          value={displayDay.toString()}
          className="w-3/5 bg-slate-100 rounded-2xl shadow-inner"
          onChange={setTextToInt(setDisplayDay)}
        />
      </div>
      <div className="flex flex-row items-center my-5">
        <label className="w-2/5 text-2xl text-slate-200">แสดงชั่วโมง</label>
        <TextField
          name="LastName"
          id="LastName"
          type="number"
          value={displayHour.toString()}
          className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
          onChange={setTextToInt(setDisplayHour)}
        />
      </div>
      <div className="flex flex-row items-center">
        <label className="w-2/5 text-2xl text-slate-200">แสดงนาที</label>
        <TextField
          name="Nickname"
          id="Nickname"
          type="number"
          value={displayMinute.toString()}
          className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
          onChange={setTextToInt(setDisplayMinute)}
        />
      </div>

      <DateConv
        day={days}
        hours={hourss}
        year={years}
        month={months}
        minutes={minutess}
      />
      <div className="flex flex-row items-center">
        <label className="w-2/5 text-2xl text-slate-200">ปรับวัน</label>
        <TextField
          name="Name"
          id="Name"
          type="number"
          value={displayDay.toString()}
          className="w-3/5 bg-slate-100 rounded-2xl shadow-inner"
          onChange={setTextToInt(setSelectDay)}
        />
      </div>
      <div className="flex flex-row items-center my-5">
        <label className="w-2/5 text-2xl text-slate-200">ปรับชั่วโมง</label>
        <TextField
          name="LastName"
          id="LastName"
          type="number"
          value={displayHour.toString()}
          className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
          onChange={setTextToInt(setSelectHour)}
        />
      </div>
      <div className="flex flex-row items-center">
        <label className="w-2/5 text-2xl text-slate-200">ปรับนาที</label>
        <TextField
          name="Nickname"
          id="Nickname"
          type="number"
          value={displayMinute.toString()}
          className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
          onChange={setTextToInt(setSelectMinute)}
        />
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          className="bg-white m-10"
          value={select}
          onChange={(newValue) => {
            setSelect(newValue || dayjs(Date.now()));
          }}
        />
      </LocalizationProvider>
      <FinishButton
        text="update"
        onClick={() => {
          updateTimeOffset(
            {
              display: {
                day: displayDay,
                minute: displayMinute,
                hour: displayHour,
              },
              select: {
                day: selectDay,
                hour: selectHour,
                minute: selectMinute,
              },
            },
            token
          );
        }}
      />
    </div>
  );
}
