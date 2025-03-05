import { getBackendUrl } from "@/components/utility/setup";
import { Id, BasicBaan } from "../../../interface";

export default async function getBaans(campId: Id): Promise<BasicBaan[]> {
  const res = await fetch(`${getBackendUrl()}/camp/getBaans/params/${campId}`, {
    cache: "no-store",
  });
  const buf = await res.json();
  return buf;
}
