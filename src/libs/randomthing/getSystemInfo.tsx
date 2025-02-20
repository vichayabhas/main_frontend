import { getBackendUrl } from "@/components/utility/setup";
import { SystemInfo } from "../../../interface";

export default async function getSystemInfo(): Promise<SystemInfo> {
  const res = await fetch(`${getBackendUrl()}/randomthing/getSystemInfo`, {
    cache: "no-store",
  });
  return await res.json();
}
