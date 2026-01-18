import { getBackendUrl } from "@/components/utility/setup";
import { StaffRegisterCamp } from "../../../interface";

export default async function updateStaffRegister(
  input: StaffRegisterCamp,
  token: string
) {
  const response = await fetch(`${getBackendUrl()}/camp/updateStaffRegister/`, {
    method: "PUT",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  return await response.json();
}
