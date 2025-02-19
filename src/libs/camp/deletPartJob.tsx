import { getBackendUrl } from "@/components/setup";
import { Id } from "../../../interface";

export default async function deletPartJob(jobId: Id, token: string) {
  const response = await fetch(
    `${getBackendUrl()}/camp/deletPartJob/params/${jobId}`,
    {
      method: "DELETE",
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
