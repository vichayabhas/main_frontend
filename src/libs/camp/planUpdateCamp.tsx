import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import {
  PlanTrigger,
  PlanUpdateOut,
  UpdateAllPlanData,
  UpdateBaanOut,
  UpdatePartOut,
} from "../../../interface";
import { io } from "socket.io-client";
const socket = io(getBackendUrl());
export default async function planUpdateCamp(
  input: UpdateAllPlanData,
  token: string,
  socketInput: SocketReady<PlanTrigger>,
  room: string
) {
  const baanSocket = new SocketReady<UpdateBaanOut>(socket, "updateBaan");
  const planSocket = new SocketReady<UpdatePartOut>(socket, "updatePart");
  const response = await fetch(`${getBackendUrl()}/camp/planUpdateCamp/`, {
    method: "PUT",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  const data: PlanUpdateOut = await response.json();
  if (!response.ok) {
    return data;
  }
  socketInput.trigger(data.planTrigger, room);
  for (const baanTrigger of data.baanTriggers) {
    baanSocket.trigger(baanTrigger, baanTrigger.baan._id.toString());
  }
  for (const partTrigger of data.partTriggers) {
    planSocket.trigger(partTrigger, partTrigger._id.toString());
  }
}
