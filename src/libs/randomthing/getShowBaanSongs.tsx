import { getBackendUrl } from "@/components/utility/setup";
import { Id, ShowCampSongReady } from "../../../interface";

export default async function getShowBaanSongs(
  baanId: Id,
  token: string
): Promise<ShowCampSongReady> {
  const response = await fetch(
    `${getBackendUrl()}/randomthing/getShowBaanSongs/params/${baanId}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
