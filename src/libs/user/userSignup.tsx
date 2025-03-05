import { getBackendUrl } from "@/components/utility/setup";
import { Register } from "../../../interface";

export default async function userSignup(signUp: Register) {
  try {
    const response = await fetch(`${getBackendUrl()}/api/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUp),
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to log-in");
    }
    return await response.json();
  } catch {
    console.log("error");
  }
}
