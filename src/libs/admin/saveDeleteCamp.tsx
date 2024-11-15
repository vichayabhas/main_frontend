import { getBackendUrl } from "@/components/setup";
import { Id } from "../../../interface";

export default async function saveDeleteCamp(
  id: Id,
  token: string
) {
  const response = await fetch(
    `${getBackendUrl()}/admin/saveDeleteCamp/params/${id}`,
    {
      method: "DELETE",
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
