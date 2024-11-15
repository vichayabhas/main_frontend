import { getBackendUrl } from "@/components/setup";
import { Id, InterCampFront } from "../../../interface";

export default async function getCamp(
  id: Id
): Promise<InterCampFront> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getCamp/params/${id.toString()}`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("Fail");
  }

  return await response.json();
}
