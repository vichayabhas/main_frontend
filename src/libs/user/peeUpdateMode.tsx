import { getBackendUrl, userPath } from "@/components/utility/setup";
import { PeeUpdateMode } from "../../../interface";
export default async function peeUpdateMode(
  input: PeeUpdateMode,
  token: string
) {
  const response = await fetch(`${getBackendUrl()}/${userPath}/updateMode`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",

      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
    cache: "no-store",
  });
  return await response.json();
}
