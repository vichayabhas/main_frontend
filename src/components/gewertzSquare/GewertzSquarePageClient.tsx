"use client";

import React from "react";
import {
  BookingGewertzSquareRoom,
  CommonUser,
  GetGewertzSquareBooking,
  gewertzSquareMaxContinue,
  GewertzSquareRoomType,
  gewertzSquareRoomTypes,
  Id,
  InterGewertzSquareBooking,
} from "../../../interface";
import { io } from "socket.io-client";
import {
  addTime,
  copy,
  getBackendUrl,
  selectTimeToSystem,
  setTextToString,
  SocketReady,
} from "../utility/setup";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Checkbox, MenuItem, Select, TextField } from "@mui/material";
import FinishButton from "../utility/FinishButton";
import updateBookingGewertzSquareRoom from "@/libs/gewertzSquare/updateBookingGewertzSquareRoom";
import deleteBookingGewertzSquareRoom from "@/libs/gewertzSquare/deleteBookingGewertzSquareRoom";
import bookingGewertzSquareRoom from "@/libs/gewertzSquare/bookingGewertzSquareRoom";
import GetTimeHtml from "../utility/GetTimeHtml";
import approveBookingGewertzSquareRoom from "@/libs/gewertzSquare/approveBookingGewertzSquareRoom";
const socket = io(getBackendUrl());
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
  if (room == "Demo floor" || room == "E-III") {
    return true;
  }
  const oldRooms2 = oldRooms.filter(
    (oldRoom) => oldRoom != "Demo floor" && oldRoom != "E-III"
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
function checkTimeRange(start: Date, end: Date) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const startHour = startDate.getHours();
  const startMinute = startDate.getMinutes();

  const endHour = endDate.getHours();
  const endMinute = endDate.getMinutes();

  const startEarly = startHour < 8 || (startHour === 8 && startMinute === 0);

  const endAfterFive = endHour > 17 || (endHour === 17 && endMinute === 0);

  return {
    startEarly,
    endAfterFive,
  };
}
function isGreaterThan3Hours(start: Date, end: Date) {
  const durationMs = new Date(end).getTime() - new Date(start).getTime();
  const THREE_HOURS = 3 * 60 * 60 * 1000;
  return durationMs > THREE_HOURS;
}
function coversWeekend(start: Date, end: Date) {
  const current = new Date(start);
  const endDate = new Date(end);

  // Normalize to midnight to safely iterate days
  current.setHours(0, 0, 0, 0);

  while (current <= endDate) {
    const day = current.getDay();
    if (day === 0 || day === 6) {
      return true;
    }
    current.setDate(current.getDate() + 1);
  }
  return false;
}
function checkIsOverlap(
  newBooking: BookingGewertzSquareRoom,
  oldBooking: BookingGewertzSquareRoom
): boolean {
  if (
    oldBooking.start <= newBooking.start &&
    newBooking.start < oldBooking.end
  ) {
    return true;
  }
  if (oldBooking.start < newBooking.end && newBooking.end <= oldBooking.end) {
    return true;
  }
  return false;
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
  const [room, setRoom] = React.useState<GewertzSquareRoomType>("E-III");
  const [tel, setTel] = React.useState(user ? user.tel : "");
  const [alls, setAlls] = React.useState(data.all);
  const [owns, setOwns] = React.useState(data.own);
  const [_id, set_id] = React.useState<Id | null>(null);
  const [start, setStart] = React.useState<dayjs.Dayjs | null>(null);
  const [end, setEnd] = React.useState<dayjs.Dayjs | null>(null);
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
  let approved = false;
  const allBookings = data.all;
  if (
    isAvailableGewertzSquareRoom(
      allBookings.filter((old) =>
        checkIsOverlap(
          {
            start: selectTimeToSystem(start, data.selectOffset),
            end: selectTimeToSystem(end, data.selectOffset),
            room,
            tel,
            approved,
          },
          old
        )
      ),
      room
    )
  ) {
    approved = true;
  }
  if (
    coversWeekend(
      selectTimeToSystem(start, data.selectOffset),
      selectTimeToSystem(end, data.selectOffset)
    )
  ) {
    approved = false;
  }
  if (
    isGreaterThan3Hours(
      selectTimeToSystem(start, data.selectOffset),
      selectTimeToSystem(end, data.selectOffset)
    )
  ) {
    approved = false;
  }
  const check = checkTimeRange(
    selectTimeToSystem(start, data.selectOffset),
    selectTimeToSystem(end, data.selectOffset)
  );
  if (check.startEarly || check.endAfterFive) {
    approved = false;
  }
  if (start && end && start.isAfter(end)) {
    approved = false;
  }
  return (
    <div>
      <div>
        <div>
          <label>เลือกห้อง</label>
          <Select value={room} renderValue={copy}>
            {gewertzSquareRoomTypes
              // .filter((gewertzSquareRoomType) => {
              //   // return true;
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
            <label>เริ่มต้น</label>
            <DateTimePicker value={start} onChange={setStart} />
          </div>
          <div>
            <label>สิ้นสุด</label>
            <DateTimePicker value={end} onChange={setEnd} />
          </div>
        </LocalizationProvider>

        <div>
          <label>tel</label>
          <TextField value={tel} onChange={setTextToString(setTel)} />
        </div>
      </div>
      {token &&
      user &&
      user.departureAuths.includes("วิศวกรรมไฟฟ้า (Electrical Engineering)") ? (
        <div>
          <Checkbox checked={approved} readOnly />
          <FinishButton
            text="จอง"
            onClick={() => {
              if (start && end)
                bookingGewertzSquareRoom(
                  {
                    room,
                    tel,
                    start: selectTimeToSystem(start, data.selectOffset),
                    end: selectTimeToSystem(end, data.selectOffset),
                    approved: false,
                  },
                  token,
                  ownSocket,
                  allSocket
                );
            }}
          />
          <table>
            <tr>
              <th>เริ่มต้น</th>
              <th>สิ้นสุด</th>
              <th>อนุญาติ</th>
              <th>ห้อง</th>
              <th>tel</th>
              <th>action</th>
            </tr>
            {owns.map((own, i) => {
              if (_id?.toString() == own._id.toString()) {
                return (
                  <tr key={i}>
                    <td>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker value={start} onChange={setStart} />
                      </LocalizationProvider>
                    </td>
                    <td>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker value={end} onChange={setEnd} />
                      </LocalizationProvider>
                    </td>
                    <td></td>
                    <td>
                      <Select value={room} renderValue={copy}>
                        {gewertzSquareRoomTypes
                          // .filter((gewertzSquareRoomType) => {
                          //   if (
                          //     time + period - 1 >
                          //     gewertzSquareAvailableTimes[
                          //       gewertzSquareAvailableTimes.length - 1
                          //     ]
                          //   ) {
                          //     return false;
                          //   }
                          //   let i = 0;
                          //   while (i < gewertzSquareMaxContinue) {
                          //     const oldBookings = alls.filter(
                          //       (oldBooking) =>
                          //         oldBooking.period > i &&
                          //         oldBooking.day == day &&
                          //         oldBooking.month == month &&
                          //         oldBooking.year == year &&
                          //         oldBooking.time == time - i &&
                          //         oldBooking._id.toString() !=
                          //           own._id.toString()
                          //     );
                          //     if (
                          //       !isAvailableGewertzSquareRoom(
                          //         oldBookings,
                          //         gewertzSquareRoomType
                          //       )
                          //     ) {
                          //       return false;
                          //     }
                          //     if (time - ++i < gewertzSquareAvailableTimes[0]) {
                          //       break;
                          //     }
                          //   }
                          //   i = 0;
                          //   while (i < period - 1) {
                          //     const oldBookings = alls.filter(
                          //       (oldBooking) =>
                          //         oldBooking.day == day &&
                          //         oldBooking.month == month &&
                          //         oldBooking.year == year &&
                          //         oldBooking.time == time + ++i &&
                          //         oldBooking._id.toString() !=
                          //           own._id.toString()
                          //     );
                          //     if (
                          //       !isAvailableGewertzSquareRoom(
                          //         oldBookings,
                          //         gewertzSquareRoomType
                          //       )
                          //     ) {
                          //       return false;
                          //     }
                          //   }
                          //   return true;
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
                    </td>
                    <td>
                      <TextField
                        value={tel}
                        onChange={setTextToString(setTel)}
                      />
                    </td>
                    <td>
                      <Checkbox checked={approved} readOnly />
                      <FinishButton
                        text="update"
                        onClick={() => {
                          updateBookingGewertzSquareRoom(
                            {
                              _id,
                              start: selectTimeToSystem(
                                start,
                                data.selectOffset
                              ),
                              end: selectTimeToSystem(end, data.selectOffset),
                              room,
                              tel,
                              approved: false,
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
                    <td>
                      <GetTimeHtml
                        input={own.start}
                        offset={data.displayOffset}
                      />
                    </td>
                    <td>
                      <GetTimeHtml
                        input={own.end}
                        offset={data.displayOffset}
                      />
                    </td>
                    <td>
                      <Checkbox checked={own.approved} readOnly />
                    </td>
                    <td>{own.room}</td>
                    <td>{own.tel}</td>
                    <td>
                      <FinishButton
                        text="edit"
                        onClick={() => {
                          set_id(own._id);
                          setRoom(own.room);
                          setTel(own.tel);
                          setEnd(dayjs(addTime(own.end, data.selectOffset)));
                          setStart(
                            dayjs(addTime(own.start, data.selectOffset))
                          );
                          console.log(addTime(own.end, data.selectOffset));
                          // setEnd(new Date())
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
              <th>เริ่มต้น</th>
              <th>สิ้นสุด</th>
              <th>อนุญาติ</th>
              <th>ห้อง</th>
              <th>tel</th>
              <th>delete</th>
            </tr>
            {alls.map((own, i) => {
              return (
                <tr key={i}>
                  <td>
                    <GetTimeHtml
                      input={own.start}
                      offset={data.displayOffset}
                    />
                  </td>
                  <td>
                    <GetTimeHtml input={own.end} offset={data.displayOffset} />
                  </td>
                  <td>
                    {own.approved ? (
                      <Checkbox checked={own.approved} readOnly />
                    ) : (
                      <FinishButton
                        text="approve"
                        onClick={() => {
                          approveBookingGewertzSquareRoom(
                            own._id,
                            token,
                            ownSocket,
                            allSocket
                          );
                        }}
                      />
                    )}
                  </td>
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
