import { getBackendUrl } from "@/components/utility/setup";
import { Id } from "../../../configTypes";
import { GetAuthPartForPage } from "../../../interface";

export default async function getAuthPartForPage(
  partId: Id,
  token: string
): Promise<GetAuthPartForPage> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getAuthPartForPage/params/${partId}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
