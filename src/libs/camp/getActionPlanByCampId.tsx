import { getBackendUrl } from "@/components/utility/setup";
import { Id, showActionPlan, SuccessBase } from "../../../interface";

export default async function getActionPlanByCampId(
  campId: Id,
  token: string
): Promise<SuccessBase<showActionPlan[]>> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getActionPlanByCampId/params/${campId}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
