import { getBackendUrl } from "@/components/setup";

export default async function getSystemInfo(): Promise<{
  systemMode: string;
  endEmail: string;
}> {
  const res = await fetch(`${getBackendUrl()}/randomthing/getSystemInfo`, {
    cache: "no-store",
  });
  return await res.json();
}
