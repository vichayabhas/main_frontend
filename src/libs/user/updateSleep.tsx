import { getBackendUrl, userPath } from "@/components/utility/setup";
import getUserProfile from "./getUserProfile";

export default async function updateSleep(sleep: boolean, token: string) {
  const user = await getUserProfile(token);
  if (user.likeToSleepAtCamp != sleep) {
    const response = await fetch(`${getBackendUrl()}/${userPath}/updateSleep`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    return await response.json();
  }
}
