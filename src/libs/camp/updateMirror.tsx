import { getBackendUrl } from "@/components/utility/setup";
import { UpdateMirror } from "../../../interface";

export default async function updateMirror(input: UpdateMirror, token: string) {
  const response = await fetch(`${getBackendUrl()}/camp/updateMirror/`, {
    method: "PUT",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  return await response.json();
}
