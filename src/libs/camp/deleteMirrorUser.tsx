import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { GetMirrorUser, Id, TriggerMirrorUser } from "../../../interface";

export default async function deleteMirrorUser(
  mirrorId: Id,
  token: string,
  senderSocket: SocketReady<GetMirrorUser[]>,
  reciverSocket: SocketReady<GetMirrorUser[]>
) {
  const response = await fetch(
    `${getBackendUrl()}/camp/deleteMirrorUser/params/${mirrorId}`,
    {
      method: "DELETE",
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  const data: TriggerMirrorUser = await response.json();
  senderSocket.trigger(data.senders, data.senderId.toString());
  reciverSocket.trigger(data.recivers, data.reciverId.toString());
  return data;
}
