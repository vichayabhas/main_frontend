import { getBackendUrl } from "@/components/setup";
import { Id, InterPusherData } from "../../../interface";

export default async function getPusherData(
  pusherId: Id
): Promise<InterPusherData> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getPusherData/params/${pusherId}`,
    {
      cache: "no-store",
    }
  );
  return await response.json();
}
