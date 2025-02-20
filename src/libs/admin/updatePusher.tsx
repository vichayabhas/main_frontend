import { getBackendUrl } from "@/components/utility/setup";
import { CreatePusherData } from "../../../interface";

export default async function updatePusher(
  input: CreatePusherData,
  token: string
) {
  const response = await fetch(`${getBackendUrl()}/admin/updatePusher/`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  return await response.json();
}
