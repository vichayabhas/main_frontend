import { getBackendUrl } from "@/components/setup";
import { Id, ShowMember } from "../../../interface";

export default async function getUserFromCamp(
  mode:
    | "getNongsFromBaanId"
    | "getPeesFromBaanId"
    | "getPeesFromPartId"
    | "getPetosFromPartId",
  id: Id
): Promise<ShowMember[]> {
  const res = await fetch(`${getBackendUrl()}/camp/${mode}/params/${id}`, {
    cache: "no-store",
  });
  return await res.json();
}
