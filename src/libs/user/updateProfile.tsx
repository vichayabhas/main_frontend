import { getBackendUrl, userPath } from "@/components/utility/setup";

export async function updateProfile(
  email: string,
  tel: string,
  name: string,
  nickname: string,
  lastname: string,
  citizenId: string,
  token: string
) {
  const response = await fetch(`${getBackendUrl()}/${userPath}/updateProfile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",

      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email, tel, name, nickname, lastname, citizenId }),
    cache: "no-store",
  });
  return await response.json();
}
