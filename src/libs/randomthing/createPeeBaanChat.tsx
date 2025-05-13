import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { CreateBaanChat, ShowChat } from "../../../interface";

export default async function createPeeBaanChat(
  input: CreateBaanChat,
  token: string,
  socket: SocketReady<ShowChat>,
) {
  const res = await fetch(`${getBackendUrl()}/randomthing/createPeeBaanChat`, {
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
  socket.trigger(data);
  return data;
}
