import { getBackendUrl } from "@/components/utility/setup";
import { Id } from "../../../configTypes";
import { GetPartDictForUpdate } from "../../../interface";

export default async function getPartDictsForUpdate(
  id: Id,
): Promise<GetPartDictForUpdate> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getPartDictsForUpdate/params/${id}`,
    {
      cache: "no-store",
    },
  );
  return await response.json();
}
