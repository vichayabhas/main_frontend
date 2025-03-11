import { getBackendUrl, userPath } from "@/components/utility/setup";
import { Id, OwnRegisterCampData } from "../../../interface";

export default async function getOwnRegisterCampDatas(
  userId: Id
): Promise<OwnRegisterCampData[]> {
  const response = await fetch(
    `${getBackendUrl()}/${userPath}/getOwnRegisterCampDatas/params/${userId}`,
    {
      cache: "no-store",
    }
  );
  return await response.json();
}
