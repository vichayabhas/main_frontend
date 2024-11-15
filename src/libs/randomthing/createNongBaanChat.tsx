import { getBackendUrl } from "@/components/setup";
import { CreateBaanChat } from "../../../interface";

export default async function createNongBaanChat(
  input: CreateBaanChat,
  token: string
) {
  const res = await fetch(`${getBackendUrl()}/randomthing/createNongBaanChat`, {
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
