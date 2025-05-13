import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { GetGroupContainer, UpdateGroupContainer } from "../../../interface";

export default async function updateGroupContainer(
  input: UpdateGroupContainer,
  token: string,
  socket: SocketReady<GetGroupContainer[]>,
) {
  const response = await fetch(
    `${getBackendUrl()}/camp/updateGroupContainer/`,
    {
      method: "PUT",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    }
  );
  const data: GetGroupContainer[] = await response.json();
  socket.trigger(data);
  return data;
}
