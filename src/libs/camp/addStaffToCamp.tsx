import { getBackendUrl, SocketReady } from "@/components/utility/setup";
import { AddStaffToCamp, RegisterData } from "../../../interface";

export default async function addStaffToCamp(
  input: AddStaffToCamp,
  token: string,
  socket: SocketReady<RegisterData>,
) {
  const res = await fetch(`${getBackendUrl()}/camp/addStaffToCamp/`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) {
    return data;
  }
  socket.trigger(data);
  return data;
}
