import { getBackendUrl, userPath } from "@/components/utility/setup";
import { BasicUser } from "../../../interface";
export default async function getUserProfile(
  token: string
): Promise<BasicUser> {
  const response = await fetch(`${getBackendUrl()}/${userPath}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  return await response.json();
}
