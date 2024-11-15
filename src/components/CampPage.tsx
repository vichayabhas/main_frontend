/*import getBaan from "@/libs/camp/getBaan";
import getCamp from "@/libs/camp/getCamp";
import getNongCamp from "@/libs/camp/getNongCamp";
import getPart from "@/libs/camp/getPart";
import getPartName from "@/libs/camp/getPartName";
import getShertManageByCampId from "@/libs/user/getShertManageByCampId";
import getUserProfile from "@/libs/user/getUserProfile";
import { getSession } from "next-auth/react";
import Link from "next/link";
import BaanMembers from "./BaanMembers";
import LocationDateReserve from "./LocationDateReserve";
import NongRegisterPage from "./NongRegisterPage";
import PushToCamps from "./PushToCamps";

import Image from "next/image";

export default async function CampPage({
  token,
  campId,
}: {
  token: string;
  campId: string;
}) {
  const campDetail = await getCamp(campId);

  const user = await getUserProfile(token);
  console.log(user);
  if (!user) {
    //alert("ghggg");
    return <PushToCamps />;
  }
  var campRole: "nong" | "pee" | "peto" | null = null;
  const curentRole = user.role;
  const userId: string = user._id;
  const partMap: Map<string, string> = new Map();
  campDetail.partIds.forEach(async (partId: string) => {
    const part = await getPart(partId, token);
    const partName = await getPartName(part.nameId, token);
    partMap.set(partName.name, part._id);
  });

  if (campDetail.nongIds.includes(userId)) {
    campRole = "nong";
    const campMemberCard = await getShertManageByCampId(campDetail._id, token);
    const nongCamp = await getNongCamp(campMemberCard.campModelId, token);
    const baan = await getBaan(nongCamp.baanId);
    return <BaanMembers baan={baan} />;
  } else if (campDetail.peeIds.includes(userId)) {
    campRole = "pee";
  } else if (campDetail.petoIds.includes(userId)) {
    campRole = "peto";
  } else if (myMapToMapString(campDetail.nongPendingIds).has(user._id)) {
  } else if (campDetail.nongPaidIds.includes(user._id)) {
  } else if (myMapToMapString(campDetail.nongPassIds).has(user._id)) {
  } else if (myMapToMapString(campDetail.peePassIds).has(user._id)) {
  } else if (myMapToMapString(campDetail.nongInterviewIds).has(user._id)) {
  } else if (campDetail.open && user.role == "nong") {
    console.log(user.role);
    return <NongRegisterPage camp={campDetail} token={token} />;
  } else if (!campDetail.peeLock && user.role != "nong") {
    console.log("pee");
    console.log(user.role);
    return <LocationDateReserve partMap={partMap} token={token} />;
  } else {
    alert("this camp is close");
    return <PushToCamps />;
  }
  return (
    <main className="text-center p-5">
      <div>
        <Image
          src={campDetail.logoUrl}
          alt="htfugyy"
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-lg w-[30%]"
        />
        <div className="text-md mx-5">{}</div>
        <div className="text-md mx-5">{}</div>
        <div className="text-md mx-5">{}</div>
      </div>
    </main>
  );
}*/
