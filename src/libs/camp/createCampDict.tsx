import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { CreateCampDict, InterCampDict } from "../../../interface";

export default async function createCampDict(
  input: CreateCampDict,
  token: string,
  socket: SocketReady<InterCampDict[]>,
) {
  const response = await fetch(`${getBackendUrl()}/camp/createCampDict/`, {
    method: "POST",
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
