import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { GetGroupContainer, Id } from "../../../interface";

export default async function deleteGroupContainer(
  containerId: Id,
  token: string,
  socket: SocketReady<GetGroupContainer[]>
) {
  const response = await fetch(
    `${getBackendUrl()}/camp/deleteGroupContainer/params/${containerId}`,
    {
      method: "DELETE",
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  const data: GetGroupContainer[] = await response.json();
  if (!response.ok) {
    return data;
  }
  socket.trigger(data);
  return data;
}
