import { getBackendUrl } from "@/components/utility/setup";
import { UpdateSongPage, UpdateSongPageOut } from "../../../interface";
import {
  triggerBaanSong,
  triggerCampSong,
} from "@/components/camp/authPart/setup";
import { Socket } from "socket.io-client";

export default async function updateSongPage(
  input: UpdateSongPage,
  token: string,
  socket: Socket
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
  const data: UpdateSongPageOut = await response.json();
  if (!response.ok) {
    return data;
  }
  data.baans.forEach((baan) => {
    triggerBaanSong(baan._id, baan.songIds, socket);
  });
  data.camps.forEach((camp) => {
    triggerCampSong(camp._id, camp.songIds, socket);
  });
}
