//'use server'
import { getBackendUrl, userPath } from "@/components/utility/setup";

export default async function verifyEmail(password: string, token: string) {
  const response = await fetch(`${getBackendUrl()}/${userPath}/verifyEmail/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    body: JSON.stringify({ password: password }),
  });
  return await response.json();
}
