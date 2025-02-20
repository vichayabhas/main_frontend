import { getBackendUrl } from "@/components/utility/setup";
import { UpdateJobAssign } from "../../../interface";

export default async function updateJobAssign(
  input: UpdateJobAssign,
  token: string
) {
  const response = await fetch(`${getBackendUrl()}/camp/updateJobAssign/`, {
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
