import { getBackendUrl } from "@/components/setup";
import { AnswerPack } from "../../../interface";

export default async function peeAnswerQuestion(
  input: AnswerPack,
  token: string
) {
  const response = await fetch(`${getBackendUrl()}/camp/peeAnswerQuestion/`, {
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
