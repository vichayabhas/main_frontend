import getAllBuilding from "@/libs/randomthing/getAllBuilding";
import getPlaces from "@/libs/randomthing/getPlaces";
import {
  AllPlaceData,
  InterPlace,
  Id,
  InterBuilding,
} from "../../../interface";
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
