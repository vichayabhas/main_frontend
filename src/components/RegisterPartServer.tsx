import { Id } from "../../interface";
import RegisterPartClient from "./RegisPartClient";
import React from "react";
import getRegisterData from "@/libs/camp/getRegisterData";
export default async function RegisterPartServer({
  campId,
  token,
  isBoard,
}: {
  campId: Id;
  token: string;
  isBoard: boolean;
}) {
  const data=await getRegisterData(campId)
  return (
    <RegisterPartClient
     isBoard={isBoard}
     data={data}
     token={token}
    />
  );
}
