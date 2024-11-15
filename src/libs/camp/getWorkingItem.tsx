import { getBackendUrl } from "@/components/setup";
import { Id, InterWorkingItem } from "../../../interface";

export default async function getWorkingItem(
  id: Id,
  token: string
): Promise<InterWorkingItem> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getWorkingItem/params/${id}`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Fail");
  }
  return await response.json();
}
