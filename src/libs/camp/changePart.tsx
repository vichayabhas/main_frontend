import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { Id, RegisterData } from "../../../interface";

export default async function changePart(
  input: {
    userIds: Id[];
    partId: Id;
  },
  token: string,
  socket: SocketReady<RegisterData>,
  room: string
) {
  const res = await fetch(`${getBackendUrl()}/camp/changePart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) {
    return data;
  }
  socket.trigger(data, room);
  return data;
}
