import { getBackendUrl } from "@/components/utility/setup";
import { Id, BasicPart } from "../../../interface";

export default async function getParts(
  campId: Id,
  token: string
): Promise<BasicPart[]> {
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
