import { getBackendUrl } from "@/components/utility/setup";
import { GetActionPlanForEdit, Id } from "../../../interface";

export default async function getActionPlanForEdit(
  actionPlanId: Id,
  token: string
): Promise<GetActionPlanForEdit> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getActionPlanForEdit/params/${actionPlanId}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
