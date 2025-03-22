import { getBackendUrl } from "@/components/utility/setup";
import { Id, InterItem } from "../../../interface";
import { Socket } from "socket.io-client";
import { triggerItem } from "@/components/camp/setup";

export default async function deleteItem(
  itemId: Id,
  token: string,
  campId: Id,
  socket: Socket
) {
  const response = await fetch(
    `${getBackendUrl()}/camp/deleteItem/params/${itemId}`,
    {
      method: "DELETE",
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  const data: InterItem[] = await response.json();
  if (!response.ok) {
    return data;
  }
  triggerItem(data, campId, socket);
  return data;
}
