import { getBackendUrl } from "@/components/setup";
import { Id } from "../../../interface";

export default async function addPart(
  nameId: Id,
  campId: Id,
  token: string
) {
  const res = await fetch(`${getBackendUrl()}/admin/addPart`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      campId,
      nameId,
    }),
  });
  return await res.json()
}
