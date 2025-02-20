import { getBackendUrl, userPath } from "@/components/utility/setup";

export default async function checkTel(
  tel: string,
  token: string
): Promise<{ relation: string[] }> {
  const response = await fetch(
    `${getBackendUrl()}/${userPath}/checkTel/params/${tel}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("Fail");
  }
  return await response.json();
}
