import { getBackendUrl } from "@/components/utility/setup";
import { RegisterJob } from "../../../interface";

export default async function registerJob(input: RegisterJob, token: string) {
  const response = await fetch(`${getBackendUrl()}/camp/registerJob/`, {
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
