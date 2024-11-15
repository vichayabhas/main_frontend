import { getBackendUrl } from "@/components/setup";
import { Id, InterPetoCamp } from "../../../interface";

export default async function getPetoCamp(
  id: Id,
  token: string
): Promise<InterPetoCamp> {
  const response = await fetch(`${getBackendUrl()}/camp/petoCamp/params/${id}`, {
    method: "GET",
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
