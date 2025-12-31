import { getBackendUrl, userPath } from "@/components/utility/setup";
import { HealthIssueBody } from "../../../interface";

export default async function updateHealth(
  input: HealthIssueBody,
  token: string
) {
  const response = await fetch(`${getBackendUrl()}/${userPath}/updateHealth`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
    cache: "no-store",
  });
  return await response.json();
}
