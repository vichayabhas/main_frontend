import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { Id } from "../../../configTypes";
import { GetGewertzSquareBooking, InterGewertzSquareBooking } from "../../../interface";

export default async function approveBookingGewertzSquareRoom(
  id: Id,
  token: string,
  ownSocket: SocketReady<InterGewertzSquareBooking[]>,
  allSocket: SocketReady<InterGewertzSquareBooking[]>
) {
  const response = await fetch(
    `${getBackendUrl()}/gewertzSquare/approveBookingGewertzSquareRoom/params/${id}`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
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
