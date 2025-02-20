import { getBackendUrl } from "@/components/utility/setup";
import { AuthSongsCamp, Id } from "../../../interface";

export default async function getAuthSongs(
  campId: Id,
  token: string
): Promise<AuthSongsCamp> {
  const response = await fetch(
    `${getBackendUrl()}/randomthing/getAuthSongs/params/${campId}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
