import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { Id, ShowImageAndDescriptions } from "../../../interface";

export default async function name(
  containerId: Id,
  token: string,
  socket: SocketReady<ShowImageAndDescriptions[]>,
  room: string
) {
  const response = await fetch(
    `${getBackendUrl()}/camp/deleteImageAndDescryption/params/${containerId}`,
    {
      method: "DELETE",
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  const data: ShowImageAndDescriptions[] = await response.json();
  if (!response.ok) {
    return data;
  }
  socket.trigger(data, room);
  return data
}
