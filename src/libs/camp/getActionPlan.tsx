import { getBackendUrl } from "@/components/utility/setup";
import { Id, ShowActionPlan } from "../../../interface";

export default async function getActionPlan(
  id: Id,
  token: string
): Promise<ShowActionPlan> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getActionPlan/params/${id}`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Fail");
  }
  return await response.json();
}
