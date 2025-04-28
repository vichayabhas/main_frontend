import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { GetMirrorBaan, Id, TriggerMirrorBaan } from "../../../interface";

export default async function deleteMirrorBaan(
  mirrorId: Id,
  token: string,
  senderSocket: SocketReady<GetMirrorBaan[]>,
  receiverSocket: SocketReady<GetMirrorBaan[]>
) {
  const response = await fetch(
    `${getBackendUrl()}/camp/deleteMirrorBaan/params/${mirrorId}`,
    {
      method: "DELETE",
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  const data: TriggerMirrorBaan = await response.json();
  if (!response.ok) {
    return data;
  }
  senderSocket.trigger(data.senders, data.senderId.toString());
  receiverSocket.trigger(data.receivers, data.receiverId.toString());
  return data;
}
