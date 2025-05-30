import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { CreateMeal, CreateMealOut, InterMeal } from "../../../interface";
import { triggerMeals } from "../../components/camp/meal/setup";
import { Socket } from "socket.io-client";

export default async function createMeal(
  input: CreateMeal,
  token: string,
  socketReady: SocketReady<InterMeal[]>,
  socket: Socket
) {
  const response = await fetch(`${getBackendUrl()}/randomthing/createMeal/`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  const data: CreateMealOut = await response.json();
  if (!response.ok) {
    return data;
  }
  socketReady.trigger(data.meals);
  triggerMeals(data.triggers, socket);
  return data;
}
