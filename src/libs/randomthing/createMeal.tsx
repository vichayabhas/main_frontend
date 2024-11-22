import { getBackendUrl } from "@/components/setup";
import { CreateMeal } from "../../../interface";

export default async function createMeal(input: CreateMeal, token: string) {
  const response = await fetch(`${getBackendUrl()}/randomthing/createMeal/`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  return await response.json();
}
