import { getBackendUrl } from "@/components/setup";
import { Id, InterBaanFront } from "../../../interface";

export default async function getBaans(
  campId: Id
): Promise<InterBaanFront[]> {
  const res = await fetch(`${getBackendUrl()}/camp/getBaans/params/${campId}`, {
    cache: "no-store",
  });
  const buf = await res.json();
  return buf;
}
