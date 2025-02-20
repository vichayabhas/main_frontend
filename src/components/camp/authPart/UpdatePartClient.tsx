"use client";
import React from "react";

import { getId } from "../../utility/setup";
import PlaceSelect from "@/components/randomthing/PlaceSelect";
import updatePart from "@/libs/admin/updatePart";
import { GetPartForPlan, AllPlaceData, InterPlace } from "../../../../interface";
export default function UpdatePartClient({
  data,
  allPlaceData,
  token,
}: {
  data: GetPartForPlan;
  allPlaceData: AllPlaceData;
  token: string;
}) {
  // dispatch = useDispatch<AppDispatch>();
  //const update = useAppSelector((state) => state.bookSlice.bookItem);

  const [place, setPlace] = React.useState<InterPlace | null>(data.place);

  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      <div className="text-4xl font-medium">Update Part</div>

      <form className="w-[30%] items-center bg-slate-600 p-10 rounded-3xl shadow-[25px_25px_40px_-10px_rgba(0,0,0,0.7)]">
        <PlaceSelect
          buildingText="เลือกตึกที่ใช้เป็นห้องฝ่าย"
          placeText="เลือกชั้นและห้องที่ใช้เป็นห้องฝ่าย"
          allPlaceData={allPlaceData}
          place={data.place}
          onClick={setPlace}
        />
        

        <div className="flex flex-row justify-end">
          <button
            className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
            onClick={() => {
              
                try {
                  updatePart(data._id, getId(place), token);
                } catch (error) {
                  console.log(error);
                }
              
            }}
          >
            update all
          </button>
        </div>
      </form>
    </div>
  );
}
