import { getBackendUrl } from "@/components/utility/setup";
import { CreateImageAndDescriptionContainer } from "../../../interface";

export default async function createImageAndDescriptionContainer(
  input: CreateImageAndDescriptionContainer,
  token: string
) {
  const response = await fetch(
    `${getBackendUrl()}/camp/createImageAndDescriptionContainer/`,
    {
      method: "POST",
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
