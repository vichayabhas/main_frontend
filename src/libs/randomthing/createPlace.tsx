import { getBackendUrl } from "@/components/setup";
import mongoose from "mongoose";

export default async function createPlace(
  floor: string,
  room: string,
  buildingId: mongoose.Types.ObjectId,
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
  return await res.json()
}
