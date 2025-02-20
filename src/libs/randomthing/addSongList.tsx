import { getBackendUrl } from "@/components/utility/setup";
import { Id } from "../../../interface";

export default async function addSongList(
  songIds: Id[],
  mode: string,
  token: string
) {
  const response = await fetch(`${getBackendUrl()}/randomthing/${mode}`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ songIds }),
  });
  return await response.json();
}
