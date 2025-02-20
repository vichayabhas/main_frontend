import { getBackendUrl } from "@/components/utility/setup";
import { CreateCamp, InterCampFront } from "../../../interface";

export default async function createCamp(
  input: CreateCamp,
  token: string
): Promise<InterCampFront> {
  const response = await fetch(`${getBackendUrl()}/admin/createCamp`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });

  return await response.json();
}
