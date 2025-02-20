import { ChatReady, GetChat, Id } from "../../../interface";
import { getBackendUrl } from "@/components/utility/setup";

export default async function getChat(
  id: Id,
  mode: GetChat,
  token: string
): Promise<ChatReady> {
  const response = await fetch(
    `${getBackendUrl()}/randomthing/${mode}/params/${id}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  return await response.json();
}
