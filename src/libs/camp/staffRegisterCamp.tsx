import { getBackendUrl } from "@/components/utility/setup";
import { StaffRegisterCamp } from "../../../interface";

export default async function staffRegisterCamp(
  input: StaffRegisterCamp,
  token: string
) {
  const res = await fetch(`${getBackendUrl()}/camp/staffRegisterCamp/`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  return await res.json();
}
