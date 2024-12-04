import getAuthSongs from "@/libs/randomthing/getAuthSongs";
import { Id } from "../../interface";
import PrStudioClient from "./PrStudioClient";
import React from "react";

export default async function PrStudioServer({
  token,
  campId,
  partIdString
}: {
  token: string;
  campId: Id;
  partIdString:string
}) {
  const authSong = await getAuthSongs(campId, token);
  return <PrStudioClient authSong={authSong} token={token} partIdString={partIdString}/>;
}
