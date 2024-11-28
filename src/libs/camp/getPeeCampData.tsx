import { getBackendUrl } from "@/components/setup";
import { GetPeeData, Id } from "../../../interface";

export default async function getPeeCampData(
  campId: Id,
  token: string
): Promise<GetPeeData> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getPeeCampData/params/${campId}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
