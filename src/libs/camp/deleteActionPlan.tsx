import { getBackendUrl } from "@/components/utility/setup";
import { Id, TriggerActionPlan } from "../../../interface";
import { Socket } from "socket.io-client";
import { triggerActionPlan } from "@/components/camp/setup";

export default async function deleteActionPlan(
  id: Id,
  token: string,
  socket: Socket
) {
  const response = await fetch(
    `${getBackendUrl()}/camp/deleteActionPlan/params/${id}`,
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
  const data: TriggerActionPlan = await response.json();
  if (!response.ok) {
    return data;
  }
  triggerActionPlan(data, socket);
  return data;
}
