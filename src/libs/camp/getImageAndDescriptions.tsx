import { getBackendUrl } from "@/components/utility/setup";
import { Id } from "../../../interface";

export default async function getImageAndDescriptions(
  baanId: Id,
  token: string
) {
  const response = await fetch(
    `${getBackendUrl()}/camp/getImageAndDescriptions/params/${baanId}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
