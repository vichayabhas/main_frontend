import { getBackendUrl } from "@/components/utility/setup";
import { Id, TriggerOrder } from "../../../interface";
import { Socket } from "socket.io-client";
import { triggerOrder } from "@/components/camp/setup";

export default async function completeOrder(
  orderId: Id,
  token: string,
  socket: Socket
) {
  const response = await fetch(
    `${getBackendUrl()}/camp/completeOrder/params/${orderId}`,
    {
      method: "PUT",
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  const data: TriggerOrder = await response.json();
  if (!response.ok) {
    return data;
  }
  triggerOrder(data, socket);
  return data;
}
