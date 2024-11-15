import { Id, InterCampFront } from "../../../interface";

export default function getCampName(
  camps: InterCampFront[]
): Map<Id, string> {
  const out: Map<Id, string> = new Map();

  camps.forEach((camp: InterCampFront) => {
    //const nameContainer = await getName(camp.nameId);
    out.set(camp._id, `${camp.campName} ${camp.round}`);
  });
  return out;
}
/*async function getName(id: string): Promise<InterNameContainer> {
  const res = await fetch(`${backendUrl}/camp/getCampName/params/${id}`);
  return await res.json();
} //${nameContainer.name}*/
