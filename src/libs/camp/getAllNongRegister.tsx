import { getBackendUrl } from "@/components/utility/setup";
import { AllNongRegister, Id } from "../../../interface";

export default async function getAllNongRegister(
  campId: Id,
  token: string
): Promise<AllNongRegister> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getAllNongRegister/params/${campId}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
