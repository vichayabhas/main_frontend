import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import GewertzSquarePageClient from "@/components/gewertzSquare/GewertzSquarePageClient";
import getGewertzSquareBooking from "@/libs/gewertzSquare/getGewertzSquareBooking";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import React from "react";
export default async function page() {
  const session = await getServerSession(authOptions);
  const user = session ? await getUserProfile(session.user.token) : null;
  const data = await getGewertzSquareBooking(session?.user.token);
  return (
    <GewertzSquarePageClient
      data={data}
      user={user}
      token={session?.user.token}
    />
  );
}
