import { getBackendUrl } from "@/components/utility/setup";
import { BasicPart, Id } from "../../../interface";

export default async function getPart(
  id: Id,
  token: string
): Promise<BasicPart> {
  const response = await fetch(`${getBackendUrl()}/camp/part/params/${id}`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Fail");
  }
  return await response.json();
}
