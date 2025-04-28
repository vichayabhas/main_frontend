import { getBackendUrl, userPath } from "@/components/utility/setup";
import { UniversityStaffRegister } from "../../../interface";

export default async function universityStaffRegister(
  input: UniversityStaffRegister
) {
  const response = await fetch(
    `${getBackendUrl()}/${userPath}/universityStaffRegister/`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    }
  );
  return await response.json();
}
