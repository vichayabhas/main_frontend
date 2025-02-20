import { getBackendUrl } from "@/components/utility/setup";
import { Id, RegisterData } from "../../../interface";

export default async function getRegisterData(
  campId: Id
): Promise<RegisterData> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getRegisterData/params/${campId}`,
    {
      cache: "no-store",
    }
  );
  return await response.json();
}
