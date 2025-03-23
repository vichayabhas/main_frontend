import { getBackendUrl } from "@/components/utility/setup";
import { Id, TriggerJob } from "../../../interface";
import { Socket } from "socket.io-client";
import { triggerJob } from "@/components/camp/member/components/setup";

export default async function deleteBaanJob(
  jobId: Id,
  token: string,
  socket: Socket
) {
  const response = await fetch(
    `${getBackendUrl()}/camp/deleteBaanJob/params/${jobId}`,
    {
      method: "DELETE",
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  const data: TriggerJob[] = await response.json();
  if (!response.ok) {
    return data;
  }
  data.forEach((v) => triggerJob(v, socket));
  return data;
}
