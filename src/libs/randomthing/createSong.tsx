import { getBackendUrl } from "@/components/utility/setup";
import { CreateSong, InterSong } from "../../../interface";
import { triggerNewSong } from "@/components/randomthing/setup";
import { Socket } from "socket.io-client";

export default async function createSong(
  input: CreateSong,
  token: string,
  socket: Socket
) {
  const response = await fetch(`${getBackendUrl()}/randomthing/createSong/`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  const data: InterSong = await response.json();
  triggerNewSong(data, socket);
  return data;
}
