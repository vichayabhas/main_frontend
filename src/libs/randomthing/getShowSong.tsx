import { getBackendUrl } from "@/components/utility/setup";
import { Id, ShowSongPage } from "../../../interface";

export default async function getShowSong(
  songId: Id,
  token: string | null
): Promise<ShowSongPage> {
  const response = await fetch(
    `${getBackendUrl()}/randomthing/getShowSong/params/${songId}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
