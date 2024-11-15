import { getBackendUrl } from "@/components/setup";
import { InterWorkingItem } from "../../../interface";

export default async function getWorkingItems(
  token: string
): Promise<InterWorkingItem[]> {
  const response = await fetch(`${getBackendUrl()}/camp/getWorkingItems`, {
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
