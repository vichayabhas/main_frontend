import { Id, UpdateCamp, UpdateCampOut } from "../../../interface";
import { getBackendUrl, SocketReady } from "@/components/utility/setup";

export default async function updateCamp(
  update: UpdateCamp,
  id: Id,
  token: string,
  socket: SocketReady<UpdateCampOut>,
) {
  const response = await fetch(
    `${getBackendUrl()}/admin/updateCamp/params/${id}`,
    {
      method: "PUT",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(update),
    }
  );
  const data: UpdateCampOut = await response.json();
  socket.trigger(data);
  return data
}
