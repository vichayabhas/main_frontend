import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import {
  GetGewertzSquareBooking,
  Id,
  InterGewertzSquareBooking,
} from "../../../interface";

export default async function deleteBookingGewertzSquareRoom(
  id: Id,
  token: string,
  ownSocket: SocketReady<InterGewertzSquareBooking[]>,
  allSocket: SocketReady<InterGewertzSquareBooking[]>
) {
  const response = await fetch(
    `${getBackendUrl()}/gewertzSquare/deleteBookingGewertzSquareRoom/params/${id}`,
    {
      method: "DELETE",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
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
