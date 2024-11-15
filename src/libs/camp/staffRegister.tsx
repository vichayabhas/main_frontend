import { getBackendUrl } from "@/components/setup";
import { Id } from "../../../interface";

export default async function staffRegisterCamp(
  partId: Id,
  token: string
) {
  console.log(partId);
  const res = await fetch(
    `${getBackendUrl()}/camp/staffRegisterCamp/params/${partId}`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await res.json();
}
