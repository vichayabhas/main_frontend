import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { Id } from "../../../configTypes";
import { InterCampDict } from "../../../interface";

export default async function deleteCampDict(
  id: Id,
  token: string,
  socket: SocketReady<InterCampDict[]>,
) {
  const response = await fetch(
    `${getBackendUrl()}/camp/deleteCampDict/params/${id}`,
    {
      method: "DELETE",
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await response.json();
  socket.trigger(data);
  return data;
}
