import { getBackendUrl } from "@/components/setup";
import { Id } from "../../../interface";

export default async function getMealsByUser(campId: Id, token: string) {
  const response = await fetch(
    `${getBackendUrl()}/randomthing/getMealsByUser/params/${campId}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
