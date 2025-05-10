import { getBackendUrl } from "@/components/utility/setup";
import { BasicCamp, Id } from "../../../interface";

export default async function getCamp(id: Id): Promise<BasicCamp> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getCamp/params/${id.toString()}`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("Fail");
  }

  return await response.json();
}
