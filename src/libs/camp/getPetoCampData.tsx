import { getBackendUrl } from "@/components/utility/setup";
import { GetPetoData, Id } from "../../../interface";

export default async function getPetoCampData(
  campId: Id,
  token: string
): Promise<GetPetoData> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getPetoCampData/params/${campId}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
