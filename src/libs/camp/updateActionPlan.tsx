import { getBackendUrl } from "@/components/utility/setup";
import { Id, UpdateActionPlan } from "../../../interface";

export default async function updateActionPlan(
  input: UpdateActionPlan,
  id: Id,
  token: string
) {
  const response = await fetch(
    `${getBackendUrl()}/camp/updateActionPlan/params/${id}`,
    {
      method: "PUT",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    }
  );
  return await response.json();
}
