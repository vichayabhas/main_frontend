import { getBackendUrl } from "@/components/setup";
import { EditQuestionPack } from "../../../interface";

export default async function editQuestion(
  input: EditQuestionPack,
  token: string
) {
  const response = await fetch(`${getBackendUrl()}/camp/editQuestion/`, {
    method: "PUT",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  return await response.json();
}
