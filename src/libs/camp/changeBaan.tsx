import { getBackendUrl } from "@/components/setup";
import { Id } from "../../../interface";

export default async function changeBaan(
  input: {
    userIds: Id[];
    baanId: Id;
  },
  token: string
) {
  const res = await fetch(`${getBackendUrl()}/camp/changeBaan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    body: JSON.stringify(input),
  });
  return await res.json()
}
