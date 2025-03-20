import { getBackendUrl } from "@/components/utility/setup";
import { CreateActionPlan, TriggerActionPlan } from "../../../interface";
import { triggerActionPlan } from "@/components/camp/setup";
import { Socket } from "socket.io-client";

export default async function createActionPlan(
  input: CreateActionPlan,
  token: string,
  socket: Socket
) {
  const response = await fetch(`${getBackendUrl()}/camp/createActionPlan/`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  const data: TriggerActionPlan = await response.json();
  triggerActionPlan(data, socket);
  return data;
}
