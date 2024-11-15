import getAllPlanData from "@/libs/camp/getAllPlanData";
import { getAllPlaceData } from "./placeSetUp";
import PlanClient from "./PlanClient";
import { Id } from "../../interface";
import React from "react";

export default async function PlanServer({
  token,
  campId,
}: {
  token: string;
  campId: Id;
}) {
  const data = await getAllPlanData(campId);
  const allPlaceData = await getAllPlaceData();
  return <PlanClient token={token} allPlaceData={allPlaceData} data={data} />;
}
