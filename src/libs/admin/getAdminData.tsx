import { getBackendUrl } from "@/components/utility/setup";
import { GetAdminData } from "../../../interface";

export default async function getAdminData(): Promise<GetAdminData> {
  const response = await fetch(`${getBackendUrl()}/admin/getAdminData/`, {
    cache: "no-store",
  });
  return await response.json();
}
