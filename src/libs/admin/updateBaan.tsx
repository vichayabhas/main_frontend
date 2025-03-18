import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { UpdateBaan, UpdateBaanOut } from "../../../interface";

export default async function updateBaan(
  input: UpdateBaan,
  token: string,
  socket: SocketReady<UpdateBaanOut>,
  room: string
) {
  const response = await fetch(`${getBackendUrl()}/admin/updateBaan`, {
    method: "PUT",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  const data: UpdateBaanOut = await response.json();
  socket.trigger(data, room);
  return data;
}
