import { getBackendUrl } from "@/components/setup";
import { GetNongData, Id } from "../../../interface";

export default async function getNongCampData(
  campId: Id,
  token: string
): Promise<GetNongData> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getNongCampData/params/${campId}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
