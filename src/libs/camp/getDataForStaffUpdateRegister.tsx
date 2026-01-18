import { getBackendUrl } from "@/components/utility/setup";
import { Id } from "../../../configTypes";
import { GetDataForStaffUpdateRegister } from "../../../interface";

export default async function getDataForStaffUpdateRegister(
  campId: Id,
  token: string
): Promise<GetDataForStaffUpdateRegister> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getDataForStaffUpdateRegister/params/${campId}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
