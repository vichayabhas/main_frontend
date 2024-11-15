import { getBackendUrl } from "@/components/setup";
import { AnswerPack, Id } from "../../../interface";

export default async function nongRegisterCamp(
  campId: Id,
  link: string,
  token: string,
  answer:AnswerPack
) {
  const res = await fetch(`${getBackendUrl()}/camp/nongRegisterCamp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    body: JSON.stringify({
      campId,
      link,
      answer,
    }),
  });
  return await res.json()
}
