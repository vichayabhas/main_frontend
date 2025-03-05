import { getBackendUrl, userPath } from "@/components/utility/setup";
import { Id } from "../../../interface";
export default async function peeUpdateMode(
  token: string,
  mode: "pee" | "nong",
  filterIds: Id[],
  linkHash: string
) {
  const response = await fetch(`${getBackendUrl()}/${userPath}/updateMode`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",

      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mode, filterIds, linkHash }),
    cache: "no-store",
  });
  return await response.json();
}
