import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { CreateGroupContainer, GetGroupContainer } from "../../../interface";

export default async function createGroupContainer(
  input: CreateGroupContainer,
  token: string,
  socket: SocketReady<GetGroupContainer[]>,
  room: string
) {
  const response = await fetch(
    `${getBackendUrl()}/camp/createGroupContainer/`,
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
  const data: GetGroupContainer[] = await response.json();
  if (!response.ok) {
    return data;
  }
  socket.trigger(data, room);
  return data;
}
