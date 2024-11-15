import { getBackendUrl } from "@/components/setup";
import { Id, InterPartNameContainer } from "../../../interface";

export default async function getPartName(
  id: Id,
  token: string
): Promise<InterPartNameContainer> {
  const response = await fetch(
    `${getBackendUrl()}/camp/partName/params/${id}`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Fail");
  }

  return await response.json();
}
