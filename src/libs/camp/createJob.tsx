import { getBackendUrl } from "@/components/setup";
import { CreateJobAssign } from "../../../interface";

export default async function createJob(input: CreateJobAssign, token: string) {
  const response = await fetch(`${getBackendUrl()}/camp/createJob/`, {
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
