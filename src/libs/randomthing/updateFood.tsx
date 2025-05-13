import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { InterFood, UpdateFood, UpdateFoodOut } from "../../../interface";
import { triggerMeals } from "../../components/camp/meal/setup";
import { Socket } from "socket.io-client";

export default async function updateFood(
  input: UpdateFood,
  token: string,
  socketReady: SocketReady<InterFood>,
  socket: Socket
) {
  const response = await fetch(`${getBackendUrl()}/randomthing/updateFood/`, {
    method: "PUT",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  const data: UpdateFoodOut = await response.json();
  if (!response.ok) {
    return data;
  }
  socketReady.trigger(data.food);
  triggerMeals(data.triggers, socket);
  return data;
}
