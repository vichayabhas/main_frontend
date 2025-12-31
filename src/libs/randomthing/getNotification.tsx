import { getBackendUrl } from "@/components/utility/setup";
import { GetNotification } from "../../../interface";

export default async function getNotification(
  token?: string | undefined
): Promise<GetNotification[]> {
  const response = await fetch(
    `${getBackendUrl()}/randomthing/getNotification/`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
