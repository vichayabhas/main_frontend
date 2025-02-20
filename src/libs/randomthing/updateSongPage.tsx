import { getBackendUrl } from "@/components/utility/setup";
import { UpdateSongPage } from "../../../interface";

export default async function updateSongPage(
  input: UpdateSongPage,
  token: string
) {
  const response = await fetch(
    `${getBackendUrl()}/randomthing/updateSongPage/`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    }
  );
  return await response.json();
}
