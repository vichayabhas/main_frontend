import { getBackendUrl } from "@/components/setup";
import { Id, InterNongCampBack } from "../../../interface";

export default async function getNongCamp(
  id: Id,
  token: string
): Promise<InterNongCampBack> {
  const response = await fetch(`${getBackendUrl()}/camp/nongCamp/params/${id}`, {
    method: "GET",cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Fail");
  }

  return await response.json();
}
