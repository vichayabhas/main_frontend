import { getBackendUrl } from "@/components/setup";
import { Id } from "../../../interface";

export default async function createBaanByGroup(
  campId: Id,
  token: string
) {
const res=  await fetch(`${getBackendUrl()}/admin/createBaanByGroup/params/${campId}`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return await res.json()
}
