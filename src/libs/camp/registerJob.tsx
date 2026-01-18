import { getBackendUrl } from "@/components/utility/setup";
import { RegisterJob, TriggerJob } from "../../../interface";
import { Socket } from "socket.io-client";
import { triggerJob } from "@/components/camp/member/components/general/setup";

export default async function registerJob(
  input: RegisterJob,
  token: string,
  socket: Socket
) {
  const response = await fetch(`${getBackendUrl()}/camp/registerJob/`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  const data: TriggerJob = await response.json();
  if (!response.ok) {
    return data;
  }
  triggerJob(data, socket);
  return data;
}
