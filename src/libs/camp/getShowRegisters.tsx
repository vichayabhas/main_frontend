import { getBackendUrl } from "@/components/setup";
import { Id, ShowRegister } from "../../../interface";

export default async function getShowRegisters(
  id: Id,
  token: string
): Promise<ShowRegister[]> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getShowRegisters/params/${id}`,
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
