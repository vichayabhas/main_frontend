import { getBackendUrl } from "@/components/setup";

export default async function addPartName(name: string, token: string) {
  const res = await fetch(
    `${getBackendUrl()}/admin/addPartName/params/${name}`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await res.json()
}
