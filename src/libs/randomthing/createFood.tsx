import { getBackendUrl } from "@/components/utility/setup";
import { CreateFood } from "../../../interface";

export default async function createFood(
input: CreateFood,
token: string
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
return await response.json()
}