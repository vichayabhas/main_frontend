import { getBackendUrl } from "@/components/utility/setup";
import { GetOrderForAdmin, Id } from "../../../interface";

export default async function getOrderForAdmin(
  campId: Id,
  token: string
): Promise<GetOrderForAdmin> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getOrderForAdmin/params/${campId}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
