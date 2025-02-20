import { getBackendUrl } from "@/components/utility/setup";
import { Id } from "../../../interface";

export default async function deleteFood(foodId: Id, token: string) {
  const response = await fetch(
    `${getBackendUrl()}/randomthing/deleteFood/params/${foodId}`,
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
