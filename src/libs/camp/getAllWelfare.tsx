import { getBackendUrl } from "@/components/setup";
import { CampWelfarePack, Id } from "../../../interface";

export default async function getAllWelfare(
  campId: Id
): Promise<CampWelfarePack> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getAllWelfare/params/${campId}`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("Fail");
  }

  return await response.json();
}
