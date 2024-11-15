import { getBackendUrl } from "@/components/setup";
import { InterBuilding } from "../../../interface";

export default async function getAllBuilding(): Promise<InterBuilding[]> {
  const res = await fetch(`${getBackendUrl()}/randomthing/getAllBuilding`, {
    cache: "no-store",
  });
  const buf = await res.json();
  return buf;
}
