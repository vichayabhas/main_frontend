import getBaans from "@/libs/camp/getBaans";
import getCamp from "@/libs/camp/getCamp";
import getShowRegisters from "@/libs/camp/getShowRegisters";
import { Id, MyMap, RegisBaan, RegisPart } from "../../interface";
import getUserFromCamp from "@/libs/camp/getUserFromCamp";
import getPart from "@/libs/camp/getPart";
import RegisterPartClient from "./RegisPartClient";
import React from "react";
export default async function RegisterPartServer({
  campId,
  token,
  isBoard,
}: {
  campId: Id;
  token: string;
  isBoard: boolean;
}) {
  const camp = await getCamp(campId);
  const baans = await getBaans(campId);
  const peeRegister = await getShowRegisters(campId, token);
  let i = 0;
  const regisParts: RegisPart[] = [];
  const regisBaans: RegisBaan[] = [];
  while (i < baans.length) {
    const baan = baans[i++];
    regisBaans.push({
      baan,
      pees: await getUserFromCamp("getPeesFromBaanId", baan._id),
      nongs: await getUserFromCamp("getNongsFromBaanId", baan._id),
    });
  }
  i = 0;
  while (i < camp.partIds.length) {
    const part = await getPart(camp.partIds[i++]);
    regisParts.push({
      part,
      pees: await getUserFromCamp("getPeesFromPartId", part._id),
      petos: await getUserFromCamp("getPetosFromPartId", part._id),
    });
  }
  const partMap: MyMap[] = [];
   i = 0;
  while (i < camp.partIds.length) {
    const part = await getPart(camp.partIds[i++]);

    partMap.push({ key: part._id, value: part.partName });
  }
  return (
    <RegisterPartClient
      regisParts={regisParts}
      regisBaans={regisBaans}
      peeRegisters={peeRegister}
      campInput={camp}
      token={token}
      isBoard={isBoard}
      partMap={partMap}
    />
  );
}
