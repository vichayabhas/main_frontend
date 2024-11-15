import { getBackendUrl } from "@/components/setup";
import { UpdateBaan } from "../../../interface";

export default async function updateBaan(input: UpdateBaan, token: string) {
  const response = await fetch(`${getBackendUrl()}/admin/updateBaan`, {
    method: "PUT",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",

      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  return await response.json();
}
