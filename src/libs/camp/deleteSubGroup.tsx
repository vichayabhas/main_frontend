import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { GetGroupContainer, Id } from "../../../interface";

export default async function deleteSubGroup(
  subGroupId: Id,
  token: string,
  socket: SocketReady<GetGroupContainer[]>,
  room: string
) {
  const response = await fetch(
    `${getBackendUrl()}/camp/deleteSubGroup/params/${subGroupId}`,
    {
      method: "DELETE",
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  const data: GetGroupContainer[] = await response.json();
  socket.trigger(data, room);
  return data;
}
