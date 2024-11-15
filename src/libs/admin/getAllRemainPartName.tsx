import { Id, MyMap } from "../../../interface";
import { getBackendUrl } from "@/components/setup";

export default async function getAllRemainPartName(
  id: Id,
  token: string
): Promise<MyMap[]> {
  const response = await fetch(
    `${getBackendUrl()}/admin/getAllRemainPartName/params/${id}`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Fail");
  }
  return await response.json();
}
