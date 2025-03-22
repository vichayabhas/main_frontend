import { getBackendUrl } from "@/components/utility/setup";
import { CreateWorkingItem, TriggerWorkingItem } from "../../../interface";
import { Socket } from "socket.io-client";
import { triggerTrackingSheet } from "@/components/camp/setup";

export default async function createWorkingItem(
  input: CreateWorkingItem,
  token: string,
  socket: Socket
) {
  const response = await fetch(`${getBackendUrl()}/camp/createWorkingItem/`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  const data: TriggerWorkingItem = await response.json();
  if (!response.ok) {
    return data;
  }
  triggerTrackingSheet(data, socket);
  return data;
}
