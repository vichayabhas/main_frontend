import { getBackendUrl } from "@/components/setup";
import { CreateNongChat } from "../../../interface";

export default async function createNongChat(
  input: CreateNongChat,
  token: string
) {
  const res = await fetch(`${getBackendUrl()}/randomthing/createNongChat`, {
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
