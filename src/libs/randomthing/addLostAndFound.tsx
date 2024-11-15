import { getBackendUrl } from "@/components/setup";
import { AddLostAndFound } from "../../../interface";

export default async function addLostAndFound(
  input: AddLostAndFound,
  token: string
) {
  const res = await fetch(`${getBackendUrl}/randomthing/addLostAndFound`, {
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
