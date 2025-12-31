import { getBackendUrl } from "@/components/utility/setup";
import {
  GetOverrideHealthIssue,
  UpdateOverrideHealthIssue,
} from "../../../interface";

export default async function updateOverrideHealthIssue(
  input: UpdateOverrideHealthIssue,
  token: string
): Promise<GetOverrideHealthIssue> {
  const response = await fetch(
    `${getBackendUrl()}/camp/updateOverrideHealthIssue/`,
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
