import { getBackendUrl } from "@/components/setup";
import { ScoreEvent, SendData } from "../../../interface";

export default async function realTimeScoring(input: SendData<ScoreEvent>) {
  const response = await fetch(
    `${getBackendUrl()}/randomthing/realTimeScoring`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    }
  );
  return await response.json();
}
