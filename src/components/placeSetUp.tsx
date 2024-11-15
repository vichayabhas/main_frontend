import getAllBuilding from "@/libs/randomthing/getAllBuilding";
import { AllPlaceData, Id, InterBuilding, InterPlace } from "../../interface";
import getPlaces from "@/libs/randomthing/getPlaces";
export async function getAllPlaceData(): Promise<AllPlaceData> {
  const allPlace = new Map<string, InterPlace[]>();
  const allBuildings = new Map<Id, InterBuilding>();
  const buildings = await getAllBuilding();
  let i = 0;
  while (i < buildings.length) {
    const places = await getPlaces(buildings[i]._id);
    allBuildings.set(buildings[i]._id, buildings[i]);
    allPlace.set(buildings[i++].name, places);
  }
  allPlace.set("-", []);
  return {
    allBuildings,
    allPlace,
  };
}
