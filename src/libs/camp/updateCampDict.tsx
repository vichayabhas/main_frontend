import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { InterCampDict, UpdateCampDict } from "../../../interface";

export default async function updateCampDict(
  input: UpdateCampDict,
  token: string,
  socket: SocketReady<InterCampDict[]>,
) {
  const response = await fetch(`${getBackendUrl()}/camp/updateCampDict/`, {
    method: "PUT",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  const data = await response.json();
  socket.trigger(data);
  return data;
}
