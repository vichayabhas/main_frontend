import { getBackendUrl, userPath } from "@/components/utility/setup";

export default async function bypassRole(key: string, token: string) {
  const response = await fetch(`${getBackendUrl()}/${userPath}/bypassRole`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      key,
    }),
  });
  return await response.json();
}
