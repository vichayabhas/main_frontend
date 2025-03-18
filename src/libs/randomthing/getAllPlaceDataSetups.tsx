import { getBackendUrl } from "@/components/utility/setup";
import { GetAllPlaceDataSetup } from "../../../interface";

export default async function getAllPlaceDataSetups(): Promise<
  GetAllPlaceDataSetup[]
> {
  const response = await fetch(
    `${getBackendUrl()}/randomthing/getAllPlaceDataSetups/`,
    {
      cache: "no-store",
    }
  );
  return await response.json();
}
