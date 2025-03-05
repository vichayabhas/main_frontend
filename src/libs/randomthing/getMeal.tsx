import { getBackendUrl } from "@/components/utility/setup";
import { Id, InterMeal } from "../../../interface";

export default async function getMeal(mealId: Id): Promise<InterMeal> {
  const response = await fetch(
    `${getBackendUrl()}/randomthing/getMeal/params/${mealId}`,
    {
      cache: "no-store",
    }
  );
  return await response.json();
}
