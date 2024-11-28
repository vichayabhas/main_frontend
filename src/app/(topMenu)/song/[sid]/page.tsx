import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { stringToId } from "@/components/setup";
import SongPageClient from "@/components/SongPageClient";
import getShowSong from "@/libs/randomthing/getShowSong";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page({ params }: { params: { sid: string } }) {
  const session = await getServerSession(authOptions);
  const show = await getShowSong(
    stringToId(params.sid),
    session ? session.user.token : null
  );
  return <SongPageClient show={show} />;
}
