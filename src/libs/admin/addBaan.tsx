import { getBackendUrl } from "@/components/setup";
import { Id } from "../../../interface";

export default async function addBaan(
  name: string,
  campId: Id,
  token: string
) {
  const res = await fetch(`${getBackendUrl()}/admin/addBaan`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      campId,
      name,
    }),
  });
  return await res.json()
}
