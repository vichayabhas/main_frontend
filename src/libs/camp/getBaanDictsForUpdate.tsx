import { getBackendUrl } from "@/components/utility/setup";
import { Id } from "../../../configTypes";
import { GetBaanDictForUpdate } from "../../../interface";

export default async function getBaanDictsForUpdate(
  id: Id,
): Promise<GetBaanDictForUpdate> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getBaanDictsForUpdate/params/${id}`,
    {
      cache: "no-store",
    },
  );
  return await response.json();
}
