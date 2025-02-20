import { getBackendUrl } from "@/components/utility/setup";
import { GetPartForPlan, Id } from "../../../interface";

export default async function getPartForUpdate(
  partId: Id
): Promise<GetPartForPlan> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getPartForUpdate/params/${partId}`,
    {
      cache: "no-store",
    }
  );
  return await response.json();
}
