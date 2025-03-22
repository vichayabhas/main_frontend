import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { CreateNongChat, ShowChat } from "../../../interface";

export default async function createNongChat(
  input: CreateNongChat,
  token: string,
  socket: SocketReady<ShowChat>,
  room: string
) {
  const res = await fetch(`${getBackendUrl()}/randomthing/createNongChat`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  const data: ShowChat = await res.json();
  if (!res.ok) {
    return data;
  }
  socket.trigger(data, room);
  return data;
}
