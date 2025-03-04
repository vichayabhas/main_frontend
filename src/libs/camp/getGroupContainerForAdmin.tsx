import { getBackendUrl } from "@/components/utility/setup";
import { GetGroupContainerForAdmin, Id } from "../../../interface";

export default async function getGroupContainerForAdmin(
  baanId: Id
): Promise<GetGroupContainerForAdmin> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getGroupContainerForAdmin/params/${baanId}`,
    {
      cache: "no-store",
    }
  );
  return await response.json();
}
