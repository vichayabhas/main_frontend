import { getBackendUrl } from "@/components/utility/setup";
import { GetMeals, Id } from "../../../interface";

export default async function getMealByUser(
  mealId: Id,
  token: string
): Promise<GetMeals> {
  const response = await fetch(
    `${getBackendUrl()}/randomthing/getMealByUser/params/${mealId}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
