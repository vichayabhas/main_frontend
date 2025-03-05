import { getBackendUrl } from "@/components/utility/setup";
import { GetAllAnswerAndQuestion, Id } from "../../../interface";

export default async function getAllAnswerAndQuestion(
  campId: Id,
  token: string
): Promise<GetAllAnswerAndQuestion> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getAllAnswerAndQuestion/params/${campId}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
