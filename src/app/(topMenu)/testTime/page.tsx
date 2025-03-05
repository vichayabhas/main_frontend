import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/utility/BackToHome";
import TestDateTime from "@/components/randomthing/TestDateTime";
import getTimeOffset from "@/libs/user/getTimeOffset";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import React from "react";
export default async function name() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const user = await getUserProfile(session.user.token);
  const select = await getTimeOffset(user.selectOffsetId);
  const display = await getTimeOffset(user.displayOffsetId);
  return (
    <TestDateTime
      selectOffset={select}
      displayOffset={display}
      token={session.user.token}
    />
  );
}
