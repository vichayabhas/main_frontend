import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { CreateFood, CreateFoodOut, InterFood } from "../../../interface";
import { triggerMeals } from "../../components/camp/meal/setup";
import { Socket } from "socket.io-client";

export default async function createFood(
  input: CreateFood,
  token: string,
  socketReady: SocketReady<InterFood[]>,
  room: string,
  socket: Socket
) {
  const response = await fetch(`${getBackendUrl()}/randomthing/createFood/`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  const data: CreateFoodOut = await response.json();
  if (!response.ok) {
    return data;
  }
  socketReady.trigger(data.foods, room);
  triggerMeals(data.triggers, socket);
  return data;
}
