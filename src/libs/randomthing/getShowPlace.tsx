import { getBackendUrl } from "@/components/setup";
import { Id, ShowPlace } from "../../../interface";

export default async function getShowPlace(
  id: Id
): Promise<ShowPlace> {
  const res = await fetch(
    `${getBackendUrl()}/randomthing/getShowPlace/params/${id}`,
    {
      cache: "no-store",
    }
  );
  return await res.json();
}
