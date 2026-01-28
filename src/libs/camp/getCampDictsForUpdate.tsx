import { getBackendUrl } from "@/components/utility/setup";
import { GetCampDictForUpdate, Id } from "../../../interface";

export default async function getCampDictsForUpdate(
  id: Id,
): Promise<GetCampDictForUpdate> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getCampDictsForUpdate/params/${id}`,
    {
      cache: "no-store",
    },
  );
  return await response.json();
}
