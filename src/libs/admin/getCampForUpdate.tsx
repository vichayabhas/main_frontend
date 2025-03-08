import { getBackendUrl } from "@/components/utility/setup";
import { GetCampForUpdate, Id } from "../../../interface";

export default async function getCampForUpdate(
  campId: Id,
  token: string
): Promise<GetCampForUpdate> {
  const response = await fetch(
    `${getBackendUrl()}/admin/getCampForUpdate/params/${campId}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
