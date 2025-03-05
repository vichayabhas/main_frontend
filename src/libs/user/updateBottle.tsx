import { getBackendUrl, userPath } from "@/components/utility/setup";
import getUserProfile from "./getUserProfile";

export async function updateBottle(haveBottle: boolean, token: string) {
  const user = await getUserProfile(token);
  if (user.haveBottle != haveBottle) {
    const response = await fetch(
      `${getBackendUrl()}/${userPath}/updateBottle`,
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );
    return await response.json();
  }
}
