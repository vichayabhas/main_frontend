import { Id, InterWorkingItem, SuccessBase } from "../../../interface";
import { getBackendUrl } from "@/components/utility/setup";

export default async function getWorkingItemByPartId(
  partId: Id,
  token: string
): Promise<SuccessBase<InterWorkingItem[]>> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getWorkingItemByPartId/params/${partId}`,
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
