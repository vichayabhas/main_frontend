import { getBackendUrl } from "@/components/utility/setup";
import { CreateMirror } from "../../../interface";

export default async function createMirror(input: CreateMirror, token: string) {
  const response = await fetch(`${getBackendUrl()}/camp/createMirror/`, {
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
