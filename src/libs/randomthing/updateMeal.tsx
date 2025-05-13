import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { InterMeal, UpdateMeal, UpdateMealOut } from "../../../interface";
import { triggerMeals } from "../../components/camp/meal/setup";
import { Socket } from "socket.io-client";

export default async function updateMeal(
  input: UpdateMeal,
  token: string,
  socketReady: SocketReady<InterMeal>,
  socket: Socket
) {
  const response = await fetch(`${getBackendUrl()}/randomthing/updateMeal/`, {
    method: "PUT",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  const data: UpdateMealOut = await response.json();
  if (!response.ok) {
    return data;
  }
  socketReady.trigger(data.meal);
  triggerMeals(data.triggers, socket);
  return data;
}
