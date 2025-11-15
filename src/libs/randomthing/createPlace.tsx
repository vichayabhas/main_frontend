import { getBackendUrl } from "@/components/utility/setup";
import { Id } from "../../../interface";

export default async function createPlace(
  floor: string,
  room: string,
  buildingId: Id,
  token: string
) {
  const res = await fetch(`${getBackendUrl()}/randomthing/createPlace`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      floor,
      room,
      buildingId,
    }),
  });
  return await res.json();
}
