import { getBackendUrl } from "@/components/utility/setup";
import { Id, InterWorkingItem, SuccessBase } from "../../../interface";

export default async function getWorkingItemByCampId(
  campId: Id,
  token: string
): Promise<SuccessBase<InterWorkingItem[]>> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getWorkingItemByCampId/params/${campId}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
