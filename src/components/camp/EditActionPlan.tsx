"use client";
import React from "react";
import { TextField } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  AllPlaceData,
  GetActionPlanForEdit,
  InterPlace,
  MyMap,
} from "../../../interface";
import SelectTemplate from "../utility/SelectTemplate";
import {
  addItemInUseStateArray,
  addTime,
  modifyElementInUseStateArray,
  notEmpty,
  removeElementInUseStateArray,
  selectTimeToSystem,
  setMap,
  setTextToString,
} from "../utility/setup";
import updateActionPlan from "@/libs/camp/updateActionPlan";
import dayjs, { Dayjs } from "dayjs";
import deleteActionPlan from "@/libs/camp/deleteActionPlan";
import PlaceSelect from "../randomthing/PlaceSelect";
import FinishButton from "../utility/FinishButton";

export default function EditActionPlan({
  data,
  allPlaceData,
  token,
}: {
  allPlaceData: AllPlaceData;
  data: GetActionPlanForEdit;
  token: string;
}) {
  const [action, setAction] = React.useState<string | null>(
    data.actionPlan.action
  );
  const [places, setPlaces] = React.useState<(InterPlace | null)[]>(
    data.places
  );
  const [start, setStart] = React.useState<Dayjs | null>(
    dayjs(addTime(data.actionPlan.start, data.selectOffset))
  );
  const [end, setEnd] = React.useState<Dayjs | null>(
    dayjs(addTime(data.actionPlan.end, data.selectOffset))
  );
  const [body, setBody] = React.useState<string | null>(data.actionPlan.body);
  const maps: MyMap[] = [];
  let i = 0;
  while (i < data.pees.length) {
    const { _id, nickname, name, lastname } = data.pees[i++];
    maps.push({ key: _id, value: `${nickname} ${name} ${lastname}` });
  }
  i = 0;
  while (i < data.petos.length) {
    const { _id, nickname, name, lastname } = data.petos[i++];
    maps.push({ key: _id, value: `${nickname} ${name} ${lastname}` });
  }

  return (
    <main
      className="text-center p-5  rounded-3xl"
      style={{
        border: "solid",
        color: "#373737",
        borderColor: "#373737",
        borderWidth: "2px",
        width: "80%",
        marginLeft: "10%",
        marginTop: "20px",
      }}
    >
      <div
        className="w-[70%] items-center p-10 rounded-3xl"
        style={{
          backgroundColor: "#961A1D",
        }}
      >
        <div className=" rounded-lg ">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              className="bg-white m-10"
              value={start}
              onChange={(newValue) => {
                setStart(newValue);
              }}
            />
          </LocalizationProvider>
        </div>
        <div className=" rounded-lg ">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              className="bg-white m-10"
              value={end}
              onChange={(newValue) => {
                setEnd(newValue);
              }}
            />
          </LocalizationProvider>
        </div>
        <FinishButton
          text={"add"}
          onClick={() => {
            setPlaces(addItemInUseStateArray<InterPlace | null>(null));
          }}
        />
        <FinishButton
          text={"remove"}
          onClick={() => setPlaces(removeElementInUseStateArray)}
        />
        {places.map((v, i) => (
          <PlaceSelect
            key={i}
            place={v}
            allPlaceData={allPlaceData}
            onClick={setMap(setPlaces, modifyElementInUseStateArray(i))}
            buildingText={`ตึกที่${i + 1}`}
            placeText={`ชั้นและห้องที่${i + 1}`}
          />
        ))}
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">
            ทำอะไร กริยาขึ้นก่อน
          </label>
          <TextField
            name="Tel"
            id="Tel"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={setTextToString(setAction, true)}
            value={action}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">รายละเอียด</label>
          <TextField
            name="Email"
            id="Email"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={setTextToString(setBody, true)}
            value={body}
          />
        </div>
        <SelectTemplate
          mapIn={maps}
          select={(headId) => {
            if (headId && body && action && start && end) {
              updateActionPlan(
                {
                  action,
                  placeIds: places.filter(notEmpty).map((e) => e._id),
                  start: selectTimeToSystem(start, data.selectOffset),
                  end: selectTimeToSystem(end, data.selectOffset),
                  headId,
                  body,
                },
                data.actionPlan._id,
                token
              );
            }
          }}
          buttonText={"update"}
        />
        <FinishButton
          onClick={() => deleteActionPlan(data.actionPlan._id, token)}
          text={"delete"}
        />
      </div>
    </main>
  );
}
