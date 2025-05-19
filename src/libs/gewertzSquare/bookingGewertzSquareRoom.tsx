import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import {
  BookingGewertzSquareRoom,
  GetGewertzSquareBooking,
  InterGewertzSquareBooking,
} from "../../../interface";

export default async function bookingGewertzSquareRoom(
  input: BookingGewertzSquareRoom,
  token: string,
  ownSocket: SocketReady<InterGewertzSquareBooking[]>,
  allSocket: SocketReady<InterGewertzSquareBooking[]>
) {
  const response = await fetch(
    `${getBackendUrl()}/gewertzSquare/bookingGewertzSquareRoom/`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    }
  );
  const data: GetGewertzSquareBooking = await response.json();
  if (!response.ok) {
    return data;
  }
  ownSocket.trigger(data.own);
  allSocket.trigger(data.all);
  return data;
}
