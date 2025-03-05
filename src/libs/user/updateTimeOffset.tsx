import { getBackendUrl, userPath } from "@/components/utility/setup";
import { UpdateTimeOffset } from "../../../interface";

export default async function updateTimeOffset(
  input: UpdateTimeOffset,
  token: string
) {
  const response = await fetch(
    `${getBackendUrl()}/${userPath}/updateTimeOffset`,
    {
      method: "PUT",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    }
  );
  return await response.json();
}
