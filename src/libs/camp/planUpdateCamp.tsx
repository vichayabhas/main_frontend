import { getBackendUrl } from "@/components/utility/setup";
import { UpdateAllPlanData } from "../../../interface";

export default async function planUpdateCamp(
  input: UpdateAllPlanData,
  token: string
) {
  const response = await fetch(`${getBackendUrl()}/camp/planUpdateCamp/`, {
    method: "PUT",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  return await response.json();
}
