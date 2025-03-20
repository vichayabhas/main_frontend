import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import {
  GetMirrorBaan,
  TriggerMirrorBaan,
  UpdateMirror,
} from "../../../interface";

export default async function updateMirrorBaan(
  input: UpdateMirror,
  token: string,
  senderSocket: SocketReady<GetMirrorBaan[]>,
  reciverSocket: SocketReady<GetMirrorBaan[]>
) {
  const response = await fetch(`${getBackendUrl()}/camp/updateMirrorBaan/`, {
    method: "PUT",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  const data: TriggerMirrorBaan = await response.json();
  senderSocket.trigger(data.senders, data.senderId.toString());
  reciverSocket.trigger(data.recivers, data.reciverId.toString());
  return data;
}
