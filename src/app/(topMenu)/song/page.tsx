import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SongClient from "@/components/SongClient";
import getMenuSongs from "@/libs/randomthing/getMenuSongs";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);
  const data = await getMenuSongs(session ? session.user.token : null);
  return <SongClient data={data} />;
}
