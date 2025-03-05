import { getBackendUrl } from "@/components/utility/setup";
import { GetCoopData, Id } from "../../../interface";

export default async function getCoopData(baanId: Id): Promise<GetCoopData> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getCoopData/params/${baanId}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
}
