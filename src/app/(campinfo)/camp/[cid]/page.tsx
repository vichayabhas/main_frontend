import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PushToCamps from "@/components/utility/PushToCamps";
import { stringToId } from "@/components/utility/setup";
import { getServerSession } from "next-auth";
import React from "react";
import CampServer from "@/components/camp/member/CampServer";

export default async function HospitalDetailPage({
  params,
}: {
  params: { cid: string };
}) {
  const session = await getServerSession(authOptions);
  if (session) {
    return (
      <CampServer token={session.user.token} campId={stringToId(params.cid)} />
    );
  } else {
    return <PushToCamps />;
  }
}
