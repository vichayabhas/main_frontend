import { getBackendUrl } from "@/components/utility/setup";
import { Id, InterFood } from "../../../interface";

export default async function getFoods(mealId: Id): Promise<InterFood[]> {
  const response = await fetch(
    `${getBackendUrl()}/randomthing/getFoods/params/${mealId}`,
    {
      cache: "no-store",
    }
  );
  return await response.json();
}
