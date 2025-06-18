"use client";

import React from "react";
import {
  CommonUser,
  GetGewertzSquareBooking,
  GewertzSquareAvailableTime,
  gewertzSquareAvailableTimes,
  gewertzSquareMaxContinue,
  GewertzSquareRoomType,
  gewertzSquareRoomTypes,
  Id,
  InterGewertzSquareBooking,
} from "../../../interface";
import { io } from "socket.io-client";
import {
  copy,
  getBackendUrl,
  setTextToString,
  SocketReady,
} from "../utility/setup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import { MenuItem, Select, TextField } from "@mui/material";
import FinishButton from "../utility/FinishButton";
import updateBookingGewertzSquareRoom from "@/libs/gewertzSquare/updateBookingGewertzSquareRoom";
import deleteBookingGewertzSquareRoom from "@/libs/gewertzSquare/deleteBookingGewertzSquareRoom";
import bookingGewertzSquareRoom from "@/libs/gewertzSquare/bookingGewertzSquareRoom";
dayjs.extend(utc);
const socket = io(getBackendUrl());
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
function isAvailableGewertzSquareRoom(
  oldBookings: InterGewertzSquareBooking[],
  room: GewertzSquareRoomType | null
) {
  if (!room) {
    return true;
  }
  const oldRooms = oldBookings.map(({ room }) => room);
  if (oldRooms.includes(room)) {
    return false;
  }
  if (room == "Demo form" || room == "E-III") {
    return true;
  }
  const oldRooms2 = oldRooms.filter(
    (oldRoom) => oldRoom != "Demo form" && oldRoom != "E-III"
  );
  if (oldRooms2.length == 0) {
    return true;
  }
  if (oldRooms2.includes("Spark1&2&3") || oldRooms2.length == 3) {
    return false;
  }
  switch (room) {
    case "Spark1": {
      return !oldRooms2.includes("Spark1&2");
    }
    case "Spark2": {
      return !oldRooms2.includes("Spark1&2") && !oldRooms2.includes("Spark2&3");
    }
    case "Spark3": {
      return !oldRooms2.includes("Spark2&3");
    }
    case "Spark1&2": {
      return (
        !oldRooms2.includes("Spark1") &&
        !oldRooms2.includes("Spark2") &&
        !oldRooms2.includes("Spark2&3")
      );
    }
    case "Spark2&3": {
      return (
        !oldRooms2.includes("Spark3") &&
        !oldRooms2.includes("Spark2") &&
        !oldRooms2.includes("Spark1&2")
      );
    }
    case "Spark1&2&3": {
      return false;
    }
  }
}
export default function GewertzSquarePageClient({
  data,
  token,
  user,
}: {
  data: GetGewertzSquareBooking;
  token: string | undefined;
  user: CommonUser | null;
}) {
  const thisYear = new Date(Date.now()).getUTCFullYear();
  const [year, setYear] = React.useState(thisYear);
  const [month, setMonth] = React.useState(new Date(Date.now()).getUTCMonth());
  const [day, setDay] = React.useState(new Date(Date.now()).getUTCDate());
  const [time, setTime] = React.useState<GewertzSquareAvailableTime>(
    gewertzSquareAvailableTimes[0]
  );
  const [room, setRoom] = React.useState<GewertzSquareRoomType>("E-III");
  const [period, setPeriod] = React.useState(1);
  const [tel, setTel] = React.useState(user ? user.tel : "");
  const [alls, setAlls] = React.useState(data.all);
  const [owns, setOwns] = React.useState(data.own);
  const [_id, set_id] = React.useState<Id | null>(null);
  const ownSocket = new SocketReady<InterGewertzSquareBooking[]>(
    socket,
    "updateGewertzSquareBookingOwn",
    user ? user._id : ""
  );
  const allSocket = new SocketReady<InterGewertzSquareBooking[]>(
    socket,
    "updateGewertzSquareBookingAll",
    ""
  );
  const availablePeriod: number[] = [];
  let i = 0;
  while (i < gewertzSquareMaxContinue) {
    availablePeriod.push(++i);
  }

  React.useEffect(() => {
    ownSocket.listen(setOwns);
    allSocket.listen(setAlls);
    return () => {
      ownSocket.disconnect();
      allSocket.disconnect();
    };
  });
  return (
    <div>
      <div>
        <div>
          <label>เลือกห้อง</label>
          <Select value={room} renderValue={copy}>
            {gewertzSquareRoomTypes
              // .filter((gewertzSquareRoomType) => {
              //   return true;
              // if (
              //   time + period - 1 >
              //   gewertzSquareAvailableTimes[
              //     gewertzSquareAvailableTimes.length - 1
              //   ]
              // ) {
              //   return false;
              // }
              // let i = 0;
              // while (i < gewertzSquareMaxContinue) {
              //   const oldBookings = alls.filter(
              //     (oldBooking) =>
              //       oldBooking.period > i &&
              //       oldBooking.day == day &&
              //       oldBooking.month == month &&
              //       oldBooking.year == year &&
              //       oldBooking.time == time - i
              //   );
              //   if (
              //     !isAvailableGewertzSquareRoom(
              //       oldBookings,
              //       gewertzSquareRoomType
              //     )
              //   ) {
              //     return false;
              //   }
              //   if (time - ++i < gewertzSquareAvailableTimes[0]) {
              //     break;
              //   }
              // }
              // i = 0;
              // while (i < period - 1) {
              //   const oldBookings = alls.filter(
              //     (oldBooking) =>
              //       oldBooking.day == day &&
              //       oldBooking.month == month &&
              //       oldBooking.year == year &&
              //       oldBooking.time == time + ++i
              //   );
              //   if (
              //     !isAvailableGewertzSquareRoom(
              //       oldBookings,
              //       gewertzSquareRoomType
              //     )
              //   ) {
              //     return false;
              //   }
              // }
              // return true;
              // })
              .map((gewertzSquareRoomType, i) => {
                return (
                  <MenuItem
                    key={i}
                    onClick={() => setRoom(gewertzSquareRoomType)}
                    value={gewertzSquareRoomType}
                  >
                    {gewertzSquareRoomType}
                  </MenuItem>
                );
              })}
          </Select>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div>
            <label>เลือกวันที่:</label>
            <DatePicker
              value={dayjs.utc().year(year).month(month).date(day)}
              onChange={(value: Dayjs | null) => {
                if (value) {
                  const utcDate = value.utc();
                  setYear(utcDate.year());
                  setMonth(utcDate.month());
                  setDay(utcDate.date());
                }
              }}
            />
            <p>ปี: {year}</p>
            <p>เดือน: {monthArray[month]}</p>
            <p>วันที่: {day}</p>
          </div>
        </LocalizationProvider>
        <div>
          <label>จำนวนชั่วโมง</label>
          <Select value={period} renderValue={copy}>
            {availablePeriod.map((period, i) => (
              <MenuItem
                key={i}
                onClick={() => setPeriod(period)}
                value={period}
              >
                {period}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <label>เลือกเวลา</label>
          <Select value={time} renderValue={copy}>
            {gewertzSquareAvailableTimes
              .filter((time) => {
                if (
                  time + period - 1 >
                  gewertzSquareAvailableTimes[
                    gewertzSquareAvailableTimes.length - 1
                  ]
                ) {
                  return false;
                }
                let i = 0;
                while (i < gewertzSquareMaxContinue) {
                  const oldBookings = alls.filter(
                    (oldBooking) =>
                      oldBooking.period > i &&
                      oldBooking.day == day &&
                      oldBooking.month == month &&
                      oldBooking.year == year &&
                      oldBooking.time == time - i
                  );
                  if (!isAvailableGewertzSquareRoom(oldBookings, room)) {
                    return false;
                  }
                  if (time - ++i < gewertzSquareAvailableTimes[0]) {
                    break;
                  }
                }
                i = 0;
                while (i < period - 1) {
                  const oldBookings = alls.filter(
                    (oldBooking) =>
                      oldBooking.day == day &&
                      oldBooking.month == month &&
                      oldBooking.year == year &&
                      oldBooking.time == time + ++i
                  );
                  if (!isAvailableGewertzSquareRoom(oldBookings, room)) {
                    return false;
                  }
                }
                return true;
              })
              .map((gewertzSquareAvailableTime, i) => (
                <MenuItem
                  key={i}
                  onClick={() => setTime(gewertzSquareAvailableTime)}
                  value={gewertzSquareAvailableTime}
                >
                  {gewertzSquareAvailableTime}
                </MenuItem>
              ))}
          </Select>
        </div>
        <div>
          <label>tel</label>
          <TextField value={tel} onChange={setTextToString(setTel)} />
        </div>
      </div>
      {token &&
      user &&
      user.departureAuths.includes("วิศวกรรมไฟฟ้า (Electrical Engineering)") ? (
        <div>
          <FinishButton
            text="จอง"
            onClick={() =>
              bookingGewertzSquareRoom(
                {
                  day,
                  month,
                  year,
                  time,
                  room,
                  tel,
                  period,
                },
                token,
                ownSocket,
                allSocket
              )
            }
          />
          <table>
            <tr>
              <th>วัน</th>
              <th>เดือน</th>
              <th>ปี</th>
              <th>เวลา</th>
              <th>จำนวนชั่วโมง</th>
              <th>ห้อง</th>
              <th>tel</th>
              <th>action</th>
            </tr>
            {owns.map((own, i) => {
              if (_id?.toString() == own._id.toString()) {
                return (
                  <tr key={i}>
                    <td colSpan={3}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={dayjs.utc().year(year).month(month).date(day)}
                          onChange={(value: Dayjs | null) => {
                            if (value) {
                              const utcDate = value.utc();
                              setYear(utcDate.year());
                              setMonth(utcDate.month());
                              setDay(utcDate.date());
                            }
                          }}
                        />
                      </LocalizationProvider>
                    </td>
                    <td>
                      <Select value={time} renderValue={copy}>
                        {gewertzSquareAvailableTimes.map(
                          (gewertzSquareAvailableTime, i) => (
                            <MenuItem
                              key={i}
                              onClick={() =>
                                setTime(gewertzSquareAvailableTime)
                              }
                              value={gewertzSquareAvailableTime}
                            >
                              {gewertzSquareAvailableTime}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </td>
                    <td>
                      <Select value={period} renderValue={copy}>
                        {availablePeriod.map((period, i) => (
                          <MenuItem
                            key={i}
                            onClick={() => setPeriod(period)}
                            value={period}
                          >
                            {period}
                          </MenuItem>
                        ))}
                      </Select>
                    </td>
                    <td>
                      <Select value={room} renderValue={copy}>
                        {gewertzSquareRoomTypes
                          .filter((gewertzSquareRoomType) => {
                            if (
                              time + period - 1 >
                              gewertzSquareAvailableTimes[
                                gewertzSquareAvailableTimes.length - 1
                              ]
                            ) {
                              return false;
                            }
                            let i = 0;
                            while (i < gewertzSquareMaxContinue) {
                              const oldBookings = alls.filter(
                                (oldBooking) =>
                                  oldBooking.period > i &&
                                  oldBooking.day == day &&
                                  oldBooking.month == month &&
                                  oldBooking.year == year &&
                                  oldBooking.time == time - i &&
                                  oldBooking._id.toString() !=
                                    own._id.toString()
                              );
                              if (
                                !isAvailableGewertzSquareRoom(
                                  oldBookings,
                                  gewertzSquareRoomType
                                )
                              ) {
                                return false;
                              }
                              if (time - ++i < gewertzSquareAvailableTimes[0]) {
                                break;
                              }
                            }
                            i = 0;
                            while (i < period - 1) {
                              const oldBookings = alls.filter(
                                (oldBooking) =>
                                  oldBooking.day == day &&
                                  oldBooking.month == month &&
                                  oldBooking.year == year &&
                                  oldBooking.time == time + ++i &&
                                  oldBooking._id.toString() !=
                                    own._id.toString()
                              );
                              if (
                                !isAvailableGewertzSquareRoom(
                                  oldBookings,
                                  gewertzSquareRoomType
                                )
                              ) {
                                return false;
                              }
                            }
                            return true;
                          })
                          .map((gewertzSquareRoomType, i) => {
                            return (
                              <MenuItem
                                key={i}
                                onClick={() => setRoom(gewertzSquareRoomType)}
                                value={gewertzSquareRoomType}
                              >
                                {gewertzSquareRoomType}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </td>
                    <td>
                      <TextField
                        value={tel}
                        onChange={setTextToString(setTel)}
                      />
                    </td>
                    <td>
                      <FinishButton
                        text="update"
                        onClick={() => {
                          updateBookingGewertzSquareRoom(
                            {
                              _id,
                              day,
                              month,
                              year,
                              time,
                              room,
                              tel,
                              period,
                            },
                            token,
                            ownSocket,
                            allSocket
                          );
                        }}
                      />
                      <FinishButton
                        text="delete"
                        onClick={() => {
                          deleteBookingGewertzSquareRoom(
                            _id,
                            token,
                            ownSocket,
                            allSocket
                          );
                        }}
                      />
                    </td>
                  </tr>
                );
              } else {
                return (
                  <tr key={i}>
                    <td>{own.day}</td>
                    <td>{monthArray[own.month]}</td>
                    <td>{own.year}</td>
                    <td>{own.time}</td>
                    <td>{own.period}</td>
                    <td>{own.room}</td>
                    <td>{own.tel}</td>
                    <td>
                      <FinishButton
                        text="edit"
                        onClick={() => {
                          set_id(own._id);
                          setDay(own.day);
                          setMonth(own.month);
                          setPeriod(own.period);
                          setRoom(own.room);
                          setTel(own.tel);
                          setTime(own.time);
                          setYear(own.year);
                        }}
                      />
                    </td>
                  </tr>
                );
              }
            })}
          </table>
        </div>
      ) : null}
      {user && token && user.extraAuth.includes("gewertz square admin") ? (
        <div>
          <table>
            <tr>
              <th>วัน</th>
              <th>เดือน</th>
              <th>ปี</th>
              <th>เวลา</th>
              <th>จำนวนชั่วโมง</th>
              <th>ห้อง</th>
              <th>tel</th>
              <th>delete</th>
            </tr>
            {alls.map((own, i) => {
              return (
                <tr key={i}>
                  <td>{own.day}</td>
                  <td>{monthArray[own.month]}</td>
                  <td>{own.year}</td>
                  <td>{own.time}</td>
                  <td>{own.period}</td>
                  <td>{own.room}</td>
                  <td>{own.tel}</td>
                  <td>
                    <FinishButton
                      text="delete"
                      onClick={() => {
                        deleteBookingGewertzSquareRoom(
                          own._id,
                          token,
                          ownSocket,
                          allSocket
                        );
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      ) : null}
    </div>
  );
}
