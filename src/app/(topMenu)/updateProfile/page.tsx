import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import BackToHome from "@/components/utility/BackToHome";
import getUserProfile from "@/libs/user/getUserProfile";
import PasswordLock from "@/components/utility/PasswordLock";
import React from "react";
import UpdateProfileRaw from "@/components/user/UpdateProfileRaw";
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
