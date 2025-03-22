import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { CreateSubGroup, GetGroupContainer } from "../../../interface";

export default async function createSubGroup(
  input: CreateSubGroup,
  token: string,
  socket: SocketReady<GetGroupContainer[]>,
  room: string
) {
  const response = await fetch(`${getBackendUrl()}/camp/createSubGroup/`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  const data: GetGroupContainer[] = await response.json();
  if (!response.ok) {
    return data;
  }
  socket.trigger(data, room);
  return data;
}
