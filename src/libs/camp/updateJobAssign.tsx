import { getBackendUrl } from "@/components/utility/setup";
import { TriggerJob, UpdateJobAssign } from "../../../interface";
import { Socket } from "socket.io-client";
import { triggerJob } from "@/components/camp/member/components/setup";

export default async function updateJobAssign(
  input: UpdateJobAssign,
  token: string,
  socket: Socket
) {
  const response = await fetch(`${getBackendUrl()}/camp/updateJobAssign/`, {
    method: "PUT",
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
