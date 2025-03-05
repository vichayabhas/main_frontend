import { getBackendUrl, userPath } from "@/components/utility/setup";

export default async function updateSize(
  size: "S" | "M" | "L" | "XL" | "XXL" | "3XL",
  token: string
) {
  const response = await fetch(
    `${getBackendUrl()}/${userPath}/updateSize/params/${size}`,
    {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  if (!response.ok) {
    alert(response.status);
  }
}
