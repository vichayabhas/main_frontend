import { getBackendUrl } from "@/components/utility/setup";
import { GetGewertzSquareBooking } from "../../../interface";

export default async function getGewertzSquareBooking(
  token: string | undefined
): Promise<GetGewertzSquareBooking> {
  const response = await fetch(
    `${getBackendUrl()}/gewertzSquare/getGewertzSquareBooking/`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
