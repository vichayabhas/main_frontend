import { Id, showActionPlan } from "../../../interface";
import { getBackendUrl } from "@/components/setup";

export default async function getActionPlanByPartId(
  partId: Id,
  token: string
): Promise<showActionPlan[]> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getActionPlanByPartId/params/${partId}`,
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
