import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import {
  EditImageAndDescriptionContainer,
  ShowImageAndDescriptions,
} from "../../../interface";

export default async function editImageAndDescription(
  input: EditImageAndDescriptionContainer,
  token: string,
  socket: SocketReady<ShowImageAndDescriptions[]>,
  room: string
) {
  const response = await fetch(
    `${getBackendUrl()}/camp/editImageAndDescription/`,
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
  const data: ShowImageAndDescriptions[] = await response.json();
  socket.trigger(data, room);
  return data;
}
