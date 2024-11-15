import { getBackendUrl } from "@/components/setup";
import { Id, InterPlace } from "../../../interface";

export default async function getPlace(
  id: Id
): Promise<InterPlace> {
  const res = await fetch(
    `${getBackendUrl()}/randomthing/getPlace/params/${id}`,
    {
      cache: "no-store",
    }
  );
  return await res.json();
}
