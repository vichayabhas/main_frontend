import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getAirQuality from "@/libs/otherBackend/getAirQuality";
import getTimeOffset from "@/libs/user/getTimeOffset";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import { UpdateTimeOffsetRaw } from "../../../interface";
import GetTimeHtml from "../utility/GetTimeHtml";
import { zeroTimeOffset } from "../utility/setup";
import React from "react";

export default async function AirQuality() {
  const session = await getServerSession(authOptions);
  let timeOffset: UpdateTimeOffsetRaw;
  if (session) {
    const user = await getUserProfile(session.user.token);
    timeOffset = await getTimeOffset(user.displayOffsetId);
  } else {
    timeOffset = zeroTimeOffset;
  }

  const airQuality = await getAirQuality();
  return (
    <table>
      <tr>
        <th>time</th>
        <th>pm2.5</th>
        <th>aqi</th>
      </tr>
      {airQuality.measurements.hourly.map((hourly, i) => {
        if (!hourly.pm25) {
          return null;
        }
        return (
          <tr key={i}>
            <td>
              <GetTimeHtml input={hourly.ts} offset={timeOffset} />
            </td>
            <td>{hourly.pm25.concentration}</td>
            <td>{hourly.aqi}</td>
          </tr>
        );
      })}
    </table>
  );
}
