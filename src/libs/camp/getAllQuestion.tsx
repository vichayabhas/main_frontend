import { getBackendUrl } from "@/components/setup";
import { GetAllQuestion, Id } from "../../../interface";

export default async function getAllQuestion(
  token: string,
  campId: Id
): Promise<GetAllQuestion> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getAllQuestion/params/${campId}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
