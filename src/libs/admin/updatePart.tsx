import { getBackendUrl } from "@/components/setup";
import { Id } from "../../../interface";

export default async function updatePart(
  partId: Id,
  placeId: Id,
  token: string
) {
  const response = await fetch(`${getBackendUrl()}/admin/updatePart`, {
    method: "PUT",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",

      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      partId,
      placeId,
    }),
  });
  return await response.json();
}
