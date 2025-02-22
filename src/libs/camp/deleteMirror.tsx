import { getBackendUrl } from "@/components/utility/setup";
import { Id } from "../../../interface";

export default async function deleteMirror(mirrorId: Id, token: string) {
  const response = await fetch(
    `${getBackendUrl()}/camp/deleteMirror/params/${mirrorId}`,
    {
      method: "DELETE",
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
