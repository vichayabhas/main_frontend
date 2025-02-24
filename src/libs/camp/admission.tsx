import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { Id, RegisterData } from "../../../interface";

export default async function admission(
  input: {
    members: Id[];
    campId: Id;
  },
  mode: "interview" | "pass" | "sure" | "kick/pee" | "kick/nong",
  token: string,
  socket: SocketReady<RegisterData>,
  room: string
) {
  const res = await fetch(`${getBackendUrl()}/camp/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    body: JSON.stringify(input),
  });
  const data = await res.json();
  socket.trigger(data, room);
  return data;
}
