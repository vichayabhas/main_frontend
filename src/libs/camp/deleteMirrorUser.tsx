import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { GetMirrorUser, Id, TriggerMirrorUser } from "../../../interface";

export default async function deleteMirrorUser(
  mirrorId: Id,
  token: string,
  senderSocket: SocketReady<GetMirrorUser[]>,
  receiverSocket: SocketReady<GetMirrorUser[]>
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
  if (!response.ok) {
    return data;
  }
  senderSocket.triggerToOther(data.senders, data.senderId.toString());
  receiverSocket.triggerToOther(data.receivers, data.receiverId.toString());
  return data;
}
