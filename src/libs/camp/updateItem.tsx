import { getBackendUrl } from "@/components/utility/setup";
import { Id, InterItem, UpdateItem } from "../../../interface";
import { Socket } from "socket.io-client";
import { triggerItem } from "@/components/camp/setup";

export default async function updateItem(
  input: UpdateItem,
  token: string,
  campId: Id,
  socket: Socket
) {
  const response = await fetch(`${getBackendUrl()}/camp/updateItem/`, {
    method: "PUT",
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
  return data;
}
