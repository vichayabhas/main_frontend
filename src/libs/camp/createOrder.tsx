import { getBackendUrl } from "@/components/utility/setup";
import { CreateOrder, TriggerOrder } from "../../../interface";
import { triggerOrder } from "@/components/camp/setup";
import { Socket } from "socket.io-client";

export default async function createOrder(
  input: CreateOrder,
  token: string,
  socket: Socket
) {
  const response = await fetch(`${getBackendUrl()}/camp/createOrder/`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  const data: TriggerOrder = await response.json();
  if (!response.ok) {
    return data;
  }
  triggerOrder(data, socket);
  return data;
}
