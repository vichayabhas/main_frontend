import { getBackendUrl } from "@/components/utility/setup";

export default async function universityStaffLogin(
  userEmail: string,
  userPassword: string
) {
  const response = await fetch(`${getBackendUrl()}/api/v1/auth/universityStaffLogin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userEmail,
      password: userPassword,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Fail to log-in");
  }
  return await response.json();
}
