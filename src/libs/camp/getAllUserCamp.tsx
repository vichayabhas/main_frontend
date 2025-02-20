import { getBackendUrl } from "@/components/utility/setup";
import { MyMap } from "../../../interface";

export default async function getAllUserCamp(token: string): Promise<MyMap[]> {
  const response = await fetch(`${getBackendUrl()}/camp/getAllUserCamp`, {
    method: "GET",
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Fail");
  }

  return await response.json();
}
