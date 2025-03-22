import { getBackendUrl } from "@/components/utility/setup";
import { Id, TriggerWorkingItem } from "../../../interface";
import { triggerTrackingSheet } from "@/components/camp/setup";
import { Socket } from "socket.io-client";

export default async function updateWorkingItem(
  input: {
    name: string;
    link: string | null;
    status: "not start" | "in process" | "done";
  },
  id: Id,
  token: string,
  socket: Socket
) {
  const response = await fetch(
    `${getBackendUrl()}/camp/updateWorkingItem/params/${id}`,
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
  const data: TriggerWorkingItem = await response.json();
  if (!response.ok) {
    return data;
  }
  triggerTrackingSheet(data, socket);
  return data;
}
