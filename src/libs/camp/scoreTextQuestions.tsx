import { getBackendUrl } from "@/components/setup";
import { ScoreTextQuestions } from "../../../interface";

export default async function scoreTextQuestions(
  input: ScoreTextQuestions,
  token: string
) {
  const response = await fetch(`${getBackendUrl()}/camp/scoreTextQuestions/`, {
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
