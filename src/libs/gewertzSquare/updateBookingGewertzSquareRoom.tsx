import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import {
  GetGewertzSquareBooking,
  InterGewertzSquareBooking,
  UpdateBookingGewertzSquareRoom,
} from "../../../interface";

export default async function updateBookingGewertzSquareRoom(
  input: UpdateBookingGewertzSquareRoom,
  token: string,
  ownSocket: SocketReady<InterGewertzSquareBooking[]>,
  allSocket: SocketReady<InterGewertzSquareBooking[]>
) {
  const response = await fetch(
    `${getBackendUrl()}/gewertzSquare/updateBookingGewertzSquareRoom/`,
    {
      method: "PUT",
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
