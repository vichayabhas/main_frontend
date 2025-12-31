import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { Id, RegisterData } from "../../../interface";

export default async function changeBaan(
  input: {
    userIds: Id[];
    baanId: Id;
  },
  token: string,
  socket: SocketReady<RegisterData>
) {
  const res = await fetch(`${getBackendUrl()}/camp/changeBaan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    body: JSON.stringify(input),
  });
  const data: RegisterData = await res.json();
  if (!res.ok) {
    return data;
  }
  socket.trigger(data);
  return data;
}
