import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import {
  GetGroupContainer,
  GroupContainerPack,
  Id,
  RegisterGroup,
} from "../../../interface";

export default async function registerGroup(
  input: RegisterGroup,
  token: string,
  socket: SocketReady<GetGroupContainer>,
  room: string,
  setSubGroupIds: React.Dispatch<React.SetStateAction<Id[]>>
) {
  const response = await fetch(`${getBackendUrl()}/camp/registerGroup/`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  const data: GroupContainerPack = await response.json();
  setSubGroupIds(data.subGroupIds);
  socket.trigger(data.group, room);
  return data;
}
