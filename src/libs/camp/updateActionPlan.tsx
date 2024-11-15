import { getBackendUrl } from "@/components/setup";
import { Id } from "../../../interface";

export default async function updateActionPlan(
  input: {
    action: string;
    placeIds: Id[];
    start: Date;
    end: Date;
    headId: Id;
    body: string;
  },
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
      body: JSON.stringify(
        input
      ),
    }
  );
  return await response.json();
}
