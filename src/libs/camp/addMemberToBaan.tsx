import { Id, Mode } from "../../../interface";
import { getBackendUrl } from "@/components/setup";

export default async function addMemberToBaan(
  input: {
    members: Id[];
    baanId: Id;
  },
  mode: Mode,
  token: string,
  aOrK: "add" | "kick"
) {
  const res = await fetch(`${getBackendUrl()}/camp/${aOrK}/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    body: JSON.stringify(input),
  });
  return await res.json()
}

//addNong
