import { getBackendUrl } from "@/components/utility/setup";
import { UpdateMeal } from "../../../interface";

export default async function updateMeal(input: UpdateMeal, token: string) {
  const response = await fetch(`${getBackendUrl()}/randomthing/updateMeal/`, {
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
