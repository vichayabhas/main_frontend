import { getBackendUrl } from "@/components/setup";
import { Id } from "../../../interface";

export default async function admission(
  input: {
    members: Id[];
    campId: Id;
  },
  mode: "interview" | "pass" | "sure" | "kick/pee" | "kick/nong",
  token: string
) {
  const res = await fetch(`${getBackendUrl()}/camp/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    body: JSON.stringify(input),
  });
  return await res.json();
}
