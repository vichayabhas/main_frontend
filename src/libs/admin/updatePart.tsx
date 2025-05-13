import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { Id, UpdatePartOut } from "../../../interface";

export default async function updatePart(
  partId: Id,
  placeId: Id | null,
  token: string,
  socket: SocketReady<UpdatePartOut>,
) {
  const response = await fetch(`${getBackendUrl()}/admin/updatePart`, {
    method: "PUT",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      partId,
      placeId,
    }),
  });
  const data: UpdatePartOut = await response.json();
  socket.trigger(data);
}
