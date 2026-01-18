import { getBackendUrl } from "@/components/utility/setup";
import { Id, TriggerJob } from "../../../interface";
import { triggerJob } from "@/components/camp/member/components/general/setup";
import { Socket } from "socket.io-client";

export default async function deletePartJob(
  jobId: Id,
  token: string,
  socket: Socket
) {
  const response = await fetch(
    `${getBackendUrl()}/camp/deletePartJob/params/${jobId}`,
    {
      method: "DELETE",
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  const data: TriggerJob = await response.json();
  if (!response.ok) {
    return data;
  }
  triggerJob(data, socket);
  return data;
}
