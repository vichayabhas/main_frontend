import { getBackendUrl } from "@/components/setup";
import { Id, InterPeeCamp } from "../../../interface";

export default async function getPeeCamp(
  id: Id,
  token: string
): Promise<InterPeeCamp> {
  const response = await fetch(`${getBackendUrl()}/camp/peeCamp/params/${id}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Fail");
  }

  return await response.json();
}
