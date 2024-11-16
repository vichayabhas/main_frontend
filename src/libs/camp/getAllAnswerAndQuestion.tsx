import { getBackendUrl } from "@/components/setup";
import { GetAllAnswerAndQuestion, Id } from "../../../interface";

export default async function getAllAnswerAndQuestion(
  campId: Id
): Promise<GetAllAnswerAndQuestion> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getAllAnswerAndQuestion/params/${campId}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
}
