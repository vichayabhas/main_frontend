import { GetMealForUpdate, Id } from "../../../interface";
import { getBackendUrl } from "../utility/setup";

export default async function getMealForUpdate(
  mealId: Id,
  token: string
): Promise<GetMealForUpdate> {
  const response = await fetch(
    `${getBackendUrl()}/randomthing/getMealForUpdate/params/${mealId}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
