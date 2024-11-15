import { getBackendUrl } from "@/components/setup";

export default async function addCampName(name: string, token: string) {
  const res = await fetch(
    `${getBackendUrl()}/admin/addCampName/params/${name}`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await res.json()
}
