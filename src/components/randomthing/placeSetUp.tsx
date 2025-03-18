import { AllPlaceData, InterPlace, Id, ShowPlace } from "../../../interface";
import getAllPlaceDataSetups from "@/libs/randomthing/getAllPlaceDataSetups";
export async function getAllPlaceData(): Promise<AllPlaceData> {
  const allPlace = new Map<string, InterPlace[]>();
  const allBuildings = new Map<Id, string>();
  const allPlaceDataSetup = await getAllPlaceDataSetups();
  let i = 0;
  while (i < allPlaceDataSetup.length) {
    allBuildings.set(allPlaceDataSetup[i]._id, allPlaceDataSetup[i].name);
    allPlace.set(allPlaceDataSetup[i].name, allPlaceDataSetup[i].places);
    i++;
  }
  allPlace.set("-", []);
  return {
    allBuildings,
    allPlace,
  };
}
export function getShowPlaceFromInterPlace(
  input: InterPlace | null,
  allPlaceData: AllPlaceData
): ShowPlace | null {
  if (!input) {
    return null;
  }
  const { _id, buildingId, floor, room } = input;
  const buildingName = allPlaceData.allBuildings.get(buildingId) as string;
  return { _id, buildingName, floor, room };
}
