import { getBackendUrl } from "@/components/utility/setup";
import { Id, TriggerActionPlan, UpdateActionPlan } from "../../../interface";
import { Socket } from "socket.io-client";
import { triggerActionPlan } from "@/components/camp/setup";

export default async function updateActionPlan(
  input: UpdateActionPlan,
  id: Id,
  token: string,
  socket:Socket
) {
  const response = await fetch(
    `${getBackendUrl()}/camp/updateActionPlan/params/${id}`,
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
  const data: TriggerActionPlan = await response.json();
    triggerActionPlan(data, socket);
    return data;
}
