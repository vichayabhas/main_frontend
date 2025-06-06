import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { GetGroupContainer, UpdateSubGroup } from "../../../interface";

export default async function updateSubGroupByAnyone(
  input: UpdateSubGroup,
  token: string,
  socket: SocketReady<GetGroupContainer>,
) {
  const response = await fetch(
    `${getBackendUrl()}/camp/updateSubGroupByAnyone/`,
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
  const data: GetGroupContainer = await response.json();
  if (!response.ok) {
    return data;
  }
  socket.trigger(data);
  return data;
}
