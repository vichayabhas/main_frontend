import { getBackendUrl } from "@/components/setup";
import { InterNameContainer } from "../../../interface";

export default async function getCampNames(): Promise<InterNameContainer[]> {
  const response = await fetch(`${getBackendUrl()}/admin/getCampNames`, {
    cache: "no-store",
  });
  return await response.json();
}
