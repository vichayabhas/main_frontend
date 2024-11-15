import { getBackendUrl } from "@/components/setup";
import { CreatePeeChat } from "../../../interface";

export default async function createPartChat(
  input: CreatePeeChat,
  token: string
) {
  const res = await fetch(`${getBackendUrl()}/randomthing/createPartChat`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  return await res.json()
}
