import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { Id, ShowImageAndDescriptions } from "../../../interface";

export default async function deleteImageAndDescription(
  containerId: Id,
  token: string,
  socket: SocketReady<ShowImageAndDescriptions[]>
) {
  const response = await fetch(
    `${getBackendUrl()}/camp/deleteImageAndDescription/params/${containerId}`,
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
  socket.trigger(data);
  return data;
}
