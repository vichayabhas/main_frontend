import { getBackendUrl } from "@/components/utility/setup";
import { CampState, Id } from "../../../interface";

export default async function getCampState(
  campId: Id,
  token: string
): Promise<CampState> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getCampState/params/${campId}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
