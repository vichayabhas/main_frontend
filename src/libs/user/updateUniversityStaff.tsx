import { getBackendUrl, userPath } from "@/components/utility/setup";
import { UpdateUniversityStaff } from "../../../interface";

export default async function updateUniversityStaff(
  input: UpdateUniversityStaff,
  token: string
) {
  const response = await fetch(
    `${getBackendUrl()}/${userPath}/updateUniversityStaff`,
    {
      method: "PUT",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    }
  );
  return await response.json();
}
