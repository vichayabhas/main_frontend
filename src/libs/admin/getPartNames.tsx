import { getBackendUrl } from "@/components/setup";
import { InterPartNameContainer } from "../../../interface";

export default async function getPartNames(): Promise<
  InterPartNameContainer[]
> {
  const response = await fetch(`${getBackendUrl()}/admin/getPartNames`, {
    cache: "no-store",
  });
  return await response.json();
}
