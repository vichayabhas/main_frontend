import { getBackendUrl, userPath } from "@/components/utility/setup";
import { HeathIssueBody } from "../../../interface";

export default async function updateHeath(
  input: HeathIssueBody,
  token: string
) {
  const response = await fetch(`${getBackendUrl()}/${userPath}/updateHeath`, {
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
