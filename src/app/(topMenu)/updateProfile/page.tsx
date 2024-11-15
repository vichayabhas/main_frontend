import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import getUserProfile from "@/libs/user/getUserProfile";
import UpdateProfileRaw from "@/components/UpdateProfileRaw";
import PasswordLock from "@/components/PasswordLock";
import React from "react";
export default async function updateProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const user = await getUserProfile(session.user.token);
  return (
    <PasswordLock token={session.user.token} bypass={false}>
      <UpdateProfileRaw session={session} user={user} />
    </PasswordLock>
  );
}
