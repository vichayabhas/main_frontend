import { getBackendUrl } from "@/components/utility/setup";
import { Id } from "../../../configTypes";
import { GetOverrideHealthIssue } from "../../../interface";

export default async function getOverrideHealthIssue(baanId: Id):Promise<GetOverrideHealthIssue> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getOverrideHealthIssue/params/${baanId}`,
    {
      cache: "no-store",
    }
  );
  return await response.json();
}
