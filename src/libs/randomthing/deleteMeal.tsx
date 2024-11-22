import { getBackendUrl } from "@/components/setup";
import { Id } from "../../../interface";

export default async function deleteMeal(mealId: Id, token: string) {
  const response = await fetch(
    `${getBackendUrl()}/randomthing/deleteMeal/params/${mealId}`,
    {
      method: "DELETE",
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
