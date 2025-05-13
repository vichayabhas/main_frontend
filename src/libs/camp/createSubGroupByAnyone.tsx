import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { CreateSubGroupByAnyone, GetGroupContainer } from "../../../interface";

export default async function createSubGroupByAnyone(
  input: CreateSubGroupByAnyone,
  token: string,
  socket: SocketReady<GetGroupContainer>
) {
  const response = await fetch(
    `${getBackendUrl()}/camp/createSubGroupByAnyone/`,
    {
      method: "POST",
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
