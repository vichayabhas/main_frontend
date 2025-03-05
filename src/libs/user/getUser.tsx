import { getBackendUrl, userPath } from "@/components/utility/setup";
import { Id, InterUser } from "../../../interface";

export default async function getUser(userIds: Id): Promise<InterUser> {
  const response = await fetch(
    `${getBackendUrl()}/${userPath}/getUser/params/${userIds}`,
    {
      cache: "no-store",
    }
  );
  //console.log(`${backendUrl}/${userPath}/getUser/params/${userIds}`);
  //alert (response.status)
  return await response.json();
}
