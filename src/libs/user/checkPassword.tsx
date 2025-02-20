import { getBackendUrl, userPath } from "@/components/utility/setup";

export default async function checkPassword(
  password: string,
  token: string,
  check: (isMatch: boolean) => void
) {
  const response = await fetch(`${getBackendUrl()}/${userPath}/checkPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      password,
    }),
    cache: "no-store",
  });
  check(response.ok);
}
