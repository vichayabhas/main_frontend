import { getBackendUrl } from "@/components/setup";
import { EditImageAndDescriptionContainer } from "../../../interface";

export default async function editImageAndDescription(
  input: EditImageAndDescriptionContainer,
  token: string
) {
  const response = await fetch(
    `${getBackendUrl()}/camp/editImageAndDescription/`,
    {
      method: "PUT",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    }
  );
  return await response.json();
}
