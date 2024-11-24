import { getBackendUrl } from "@/components/setup";
import { Id, InterPartFront } from "../../../interface";

export default async function getParts(
  campId: Id,
  token: string
): Promise<InterPartFront[]> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getParts/params/${campId}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
