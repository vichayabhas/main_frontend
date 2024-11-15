import { getBackendUrl } from "@/components/setup";
import { Id } from "../../../interface";

export default async function changePart(
  input: {
    userIds: Id[];
    partId: Id;
  },
  token: string
) {
  const res = await fetch(`${getBackendUrl()}/camp/changePart`, {
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
