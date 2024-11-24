import { getBackendUrl } from "@/components/setup";
import { showActionPlan, SuccessBase } from "../../../interface";

export default async function getActionPlans(
  token: string
): Promise<SuccessBase<showActionPlan[]>> {
  const response = await fetch(`${getBackendUrl()}/camp/getActionPlans`, {
    method: "GET",
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Fail");
  }
  return await response.json();
}
