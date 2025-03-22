import { getBackendUrl } from "@/components/utility/setup";
import { Id, TriggerWorkingItem } from "../../../interface";
import { Socket } from "socket.io-client";
import { triggerTrackingSheet } from "@/components/camp/setup";

export default async function deleteWorkingItem(
  id: Id,
  token: string,
  socket: Socket
) {
  const response = await fetch(
    `${getBackendUrl()}/camp/deleteWorkingItem/params/${id}`,
    {
      method: "DELETE",
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Fail");
  }
  const data: TriggerWorkingItem = await response.json();
  if (!response.ok) {
    return data;
  }
  triggerTrackingSheet(data, socket);
  return data;
}
