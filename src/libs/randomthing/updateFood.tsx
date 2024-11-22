import { getBackendUrl } from "@/components/setup";
import { UpdateFood } from "../../../interface";

export default async function updateFood(input: UpdateFood, token: string) {
  const response = await fetch(`${getBackendUrl()}/randomthing/updateFood/`, {
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
