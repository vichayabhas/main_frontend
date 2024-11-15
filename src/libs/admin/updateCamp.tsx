import { Id, UpdateCamp } from "../../../interface";
import { getBackendUrl } from "@/components/setup";

export default async function updateCamp(
  update: UpdateCamp,
  id: Id,
  token: string
) {
  const response = await fetch(
    `${getBackendUrl()}/admin/updateCamp/params/${id}`,
    {
      method: "PUT",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",

        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(update),
    }
  );
  return await response.json();
}
