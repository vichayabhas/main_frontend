import { getBackendUrl } from "@/components/utility/setup";
import { CreateSong } from "../../../interface";

export default async function createSong(input: CreateSong, token: string) {
  const response = await fetch(`${getBackendUrl()}/randomthing/createSong/`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  return await response.json();
}
