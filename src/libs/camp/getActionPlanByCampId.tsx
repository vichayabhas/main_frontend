import { getBackendUrl } from "@/components/utility/setup";
import { Id, ShowActionPlan, SuccessBase } from "../../../interface";

export default async function getActionPlanByCampId(
  campId: Id,
  token: string
): Promise<SuccessBase<ShowActionPlan[]>> {
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
