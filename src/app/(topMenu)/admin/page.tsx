import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/user/getUserProfile";
import BackToHome from "@/components/utility/BackToHome";
import getCamps from "@/libs/camp/getCamps";
import HospitalCatalog from "@/components/camp/HospitalCatalog";
import { LinearProgress } from "@mui/material";
import React from "react";
import { Suspense } from "react";
import PasswordLock from "@/components/utility/PasswordLock";
import AdminClient from "@/components/admin/AdminClient";
import getAdminData from "@/libs/admin/getAdminData";

export default async function adminPage() {
  //const router=useRouter()
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }

  const user = await getUserProfile(session.user.token as string);
  if (user.mode == "nong" || user.role != "admin") {
    return <BackToHome />;
  }
  const camps = await getCamps();
  const data = await getAdminData();

  return (
    <PasswordLock token={session.user.token} bypass={false}>
      <main className="text-center p-5">
        <Suspense
          fallback={
            <p>
              Loading ... <LinearProgress />
            </p>
          }
        >
          <HospitalCatalog
            hospitalsJson={camps}
            university={true}
            url="admin/camp"
          />
          <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
            <div className="text-4xl font-medium">สร้างค่าย</div>
            <AdminClient
              token={session.user.token}
              data={data}
            />
          </div>
        </Suspense>
      </main>
    </PasswordLock>
  );
} /* <HospitalCatalog


function getPartNames() {
  throw new Error("Function not implemented.");
}
        hospitalsJson={camps}
        mapName={names}
        onRating={(link: string) => {}}
      />*/
