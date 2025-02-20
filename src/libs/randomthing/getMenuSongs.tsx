import { getBackendUrl } from "@/components/utility/setup";
import { GetMenuSongs } from "../../../interface";

export default async function getMenuSongs(
  token: string | null
): Promise<GetMenuSongs> {
  const response = await fetch(`${getBackendUrl()}/randomthing/getMenuSongs/`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}
