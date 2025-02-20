import { getBackendUrl, userPath } from "@/components/utility/setup";

export default async function signId(
  token: string
): Promise<{ success: boolean }> {
  const response = await fetch(`${getBackendUrl()}/${userPath}/signId`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  return await response.json();
}
