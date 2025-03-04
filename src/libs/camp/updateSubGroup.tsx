import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { GetGroupContainer, UpdateSubGroup } from "../../../interface";

export default async function updateSubGroup(
  input: UpdateSubGroup,
  token: string,
  socket: SocketReady<GetGroupContainer[]>,
  room: string
) {
  const response = await fetch(`${getBackendUrl()}/camp/updateSubGroup/`, {
    method: "PUT",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  const data: GetGroupContainer[] = await response.json();
  socket.trigger(data, room);
  return data;
}
