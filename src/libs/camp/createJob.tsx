import { getBackendUrl } from "@/components/utility/setup";
import { CreateJobAssign, TriggerJob } from "../../../interface";
import { triggerJob } from "@/components/camp/member/components/setup";
import { Socket } from "socket.io-client";

export default async function createJob(
  input: CreateJobAssign,
  token: string,
  socket: Socket
) {
  const response = await fetch(`${getBackendUrl()}/camp/createJob/`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  const data: TriggerJob[] = await response.json();
  if (!response.ok) {
    return data;
  }
  data.forEach((v) => triggerJob(v, socket));
  return data;
}
