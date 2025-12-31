import { getBackendUrl, userPath } from "@/components/utility/setup";
import { Id, InterHealthIssue } from "../../../interface";

export default async function getHealthIssue(id: Id): Promise<InterHealthIssue> {
  const response = await fetch(
    `${getBackendUrl()}/${userPath}/getHealthIssue/params/${id}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("Fail");
  }
  return await response.json();
}
