import { getBackendUrl } from "@/components/utility/setup";
import { CreateItem, Id, InterItem } from "../../../interface";
import { triggerItem } from "@/components/camp/setup";
import { Socket } from "socket.io-client";

export default async function createItem(
  input: CreateItem,
  token: string,
  campId: Id,
  socket: Socket
) {
  const response = await fetch(`${getBackendUrl()}/camp/createItem/`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  const data: InterItem[] = await response.json();
  if (!response.ok) {
    return data;
  }
  triggerItem(data, campId, socket);
  return data
}
