import { getBackendUrl } from "@/components/utility/setup";
import { Id } from "../../../interface";

export default async function deleteBaanJob(jobId: Id, token: string) {
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
  return await response.json();
}
