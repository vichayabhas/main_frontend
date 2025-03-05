import { getBackendUrl, userPath } from "@/components/utility/setup";

export default async function changeModeToPee(password: string, token: string) {
  const response = await fetch(
    `${getBackendUrl()}/${userPath}/changeModeToPee`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        password,
      }),
    }
  );
  return await response.json();
}
