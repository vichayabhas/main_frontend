import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/utility/BackToHome";
import { stringToId } from "@/components/utility/setup";
import UpdateCampClient from "@/components/camp/authPart/UpdateCampClient";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import React from "react";
import getCampForUpdate from "@/libs/admin/getCampForUpdate";
export default async function HospitalDetailPage({
  params,
}: {
  params: { cid: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const user = await getUserProfile(session.user.token);
  if (user.role !== "admin") {
    return <BackToHome />;
  }
  const token = session.user.token;
  const data = await getCampForUpdate(stringToId(params.cid), token);
  return (
    <>
      <UpdateCampClient data={data} token={token} />
    </>
  );
}
