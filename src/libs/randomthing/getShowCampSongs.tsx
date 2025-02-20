import { getBackendUrl } from "@/components/utility/setup";
import { Id, ShowCampSong } from "../../../interface";

export default async function getShowCampSongs(
  campId: Id,
  token: string
): Promise<ShowCampSong[]> {
  const response = await fetch(
    `${getBackendUrl()}/randomthing/getShowCampSongs/params/${campId}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
