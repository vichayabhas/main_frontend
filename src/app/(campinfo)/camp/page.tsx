//import CardPanel from "@/components/CardPanel";

import HospitalCatalog from "@/components/HospitalCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import getCamps from "@/libs/camp/getCamps";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/user/getUserProfile";
import React from "react";
export default async function Hospital() {
  const camps = await getCamps();
  let university = false;
  const session = await getServerSession(authOptions);
  if (session) {
    const user = await getUserProfile(session.user.token);
    university = user.fridayActEn;
  }
  //console.log(session)
  //console.log(camps)
  //console.log(names);
  return (
    <main className="text-center p-5">
      <Suspense
        fallback={
          <p>
            Loading ... <LinearProgress />
          </p>
        }
      >
        <HospitalCatalog hospitalsJson={camps}  university={university} url="camp"/>
      </Suspense>
    </main>
  );
}
/*
<CardPanel/>
*/
