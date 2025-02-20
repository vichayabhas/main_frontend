import { getBackendUrl } from "@/components/utility/setup";
import { Id } from "../../../interface";

export default async function deleteChoiceQuestion(id: Id, token: string) {
  const response = await fetch(
    `${getBackendUrl()}/camp/deleteChoiceQuestion/params/${id}`,
    {
      method: "DELETE",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
