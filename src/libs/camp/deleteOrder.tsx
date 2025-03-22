import { Socket } from "socket.io-client";
import { Id, TriggerOrder } from "../../../interface";
import { triggerOrder } from "@/components/camp/setup";
import { getBackendUrl } from "@/components/utility/setup";

export default async function deleteOrder(
  orderId: Id,
  token: string,
  socket: Socket
) {
  const response = await fetch(
    `${getBackendUrl()}/camp/deleteOrder/params/${orderId}`,
    {
      method: "DELETE",
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
  return data
}
