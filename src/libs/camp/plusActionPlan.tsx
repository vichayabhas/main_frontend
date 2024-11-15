import { getBackendUrl } from "@/components/setup";
import { Id } from "../../../interface";

export default async function plusActionPlan(
  input: { campId: Id; plus: number },
  token: string
) {
  const response = await fetch(`${getBackendUrl()}/camp/plusActionPlan`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  return await response.json();
}
