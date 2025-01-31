import { getBackendUrl } from "@/components/setup";
import { Id } from "../../../interface";

export default async function name(containerId: Id, token: string) {
  const response = await fetch(
    `${getBackendUrl()}/camp/deleteImageAndDescryption/params/${containerId}`,
    {
      method: "DELETE",
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
