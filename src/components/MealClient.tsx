"use client";

import { useRouter } from "next/navigation";
import {
  FoodLimit,
  InterCampFront,
  InterFood,
  InterMeal,
  RoleCamp,
  UpdateTimeOffsetRaw,
} from "../../interface";
import React, { useState } from "react";
import GetTimeHtml from "./GetTimeHtml";
import { Checkbox, TextField } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FinishButton from "./FinishButton";
import {
  addTime,
  selectTimeToSystem,
  setBoolean,
  setTextToString,
  SetUpDownPack,
  stringToId,
} from "./setup";
import createFood from "@/libs/randomthing/createFood";
import updateMeal from "@/libs/randomthing/updateMeal";
import dayjs from "dayjs";
import deleteMeal from "@/libs/randomthing/deleteMeal";
import AllInOneLock from "./AllInOneLock";

export default function MealClient({
  params,
  foods,
  meal,
  groupName,
  camp,
  token,
  displayOffset,
  selectOffset,
}: {
  params: { pid: string; mid: string };
  foods: InterFood[];
  meal: InterMeal;
  groupName: string;
  camp: InterCampFront;
  token: string;
  selectOffset: UpdateTimeOffsetRaw;
  displayOffset: UpdateTimeOffsetRaw;
}) {
  const router = useRouter();
  const [nong, setNong] = useState(meal.roles.includes("nong"));
  const [pee, setPee] = useState(meal.roles.includes("pee"));
  const [peto, setPeto] = useState(meal.roles.includes("peto"));
  const [time, setTime] = useState<dayjs.Dayjs | null>(
    dayjs(addTime(meal.time.toString(), selectOffset))
  );
  const [name, setName] = useState("");
  const [isSpicy, setIsSpicy] = useState(true);
  const {
    up: isWhiteList,
    down: listPriority,
    setDown:setListPriority,
    setUp:setIsWhiteList,
  } = new SetUpDownPack(useState(SetUpDownPack.init(false, false)));
  const [มังสวิรัติ, setมังสวิรัติ] = useState(false);
  const [เจ, setเจ] = useState(false);
  const [อิสลาม, setอิสลาม] = useState(false);
  return (
    <div>
      {foods.map((food, i) => (
        <div
          key={i}
          onClick={() =>
            router.push(
              `/authPart/${params.pid}/welfare/${params.mid}/${food._id}`
            )
          }
        >
          {food.name}
        </div>
      ))}
      <div>
        <div>วันเวลา</div>
        <div>
          <GetTimeHtml input={meal.time} offset={displayOffset} />
        </div>
      </div>
      <form
        className="w-[70%] items-center p-10 rounded-3xl"
        style={{
          backgroundColor: "#961A1D",
        }}
      >
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            ข้าวมื้อนี้ให้น้องค่ายหรือไม่
          </label>
          <Checkbox
            onChange={setBoolean(setNong)}
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            checked={nong}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            ข้าวมื้อนี้ให้พี่{groupName}หรือไม่
          </label>
          <Checkbox
            onChange={setBoolean(setPee)}
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            checked={pee}
          />
        </div>
        {camp.memberStructure == "nong->highSchool,pee->1year,peto->2upYear" ? (
          <div className="flex flex-row items-center my-5">
            <label className="w-2/5 text-2xl text-white">
              ข้าวมื้อนี้ให้ปีโตหรือไม่
            </label>
            <Checkbox
              onChange={setBoolean(setPeto)}
              sx={{
                "&.Mui-checked": {
                  color: "#FFFFFF", // Custom color when checked
                },
              }}
              checked={peto}
            />
          </div>
        ) : null}
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            ข้าวมื้อนี้กินเวลาไหน
          </label>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              className="bg-white m-10"
              value={time}
              onChange={setTime}
            />
          </LocalizationProvider>
        </div>
        <div className="flex flex-row justify-end">
          <FinishButton
            text="สร้างมื้ออาหาร"
            onClick={() => {
              if (!time) {
                alert("please select time");
              } else {
                const roles: RoleCamp[] = [];
                if (nong) {
                  roles.push("nong");
                }
                if (pee) {
                  roles.push("pee");
                }
                if (peto) {
                  roles.push("peto");
                }
                updateMeal(
                  {
                    mealId: meal._id,
                    roles,
                    time: selectTimeToSystem(time, selectOffset),
                  },
                  token
                );
              }
            }}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">อาหารอะไร</label>
          <TextField
            name="Email"
            id="Email"
            className="w-3/5 bg-white rounded-2xl border-gray-200"
            sx={{
              backgroundColor: "#f5f5f5",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: " 1rem",
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "#5479FF",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#5479FF",
                },
              },
            }}
            onChange={setTextToString(setName)}
            value={name}
            required
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">เผ็ดหรือไม่</label>
          <Checkbox
            onChange={setBoolean(setIsSpicy)}
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            defaultChecked
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            อาหารนี้สำหรับคนที่แพ้อาหารหรือไม่
          </label>
          <Checkbox
            onChange={setBoolean(setIsWhiteList)}
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            checked={isWhiteList}
          />
        </div>

        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            อาหารนี้เฉพาะเจาะจงหรือไม่
          </label>
          <Checkbox
            onChange={setBoolean(setListPriority)}
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            checked={listPriority}
          />
        </div>

        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">อิสลาม</label>
          <Checkbox
            onChange={setBoolean(setอิสลาม)}
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">มังสวิรัติ</label>
          <Checkbox
            onChange={setBoolean(setมังสวิรัติ)}
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
          />
        </div>

        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">เจ</label>
          <Checkbox
            onChange={setBoolean(setเจ)}
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
          />
        </div>

        <FinishButton
          text="bypass"
          onClick={() => {
            const lists: FoodLimit[] = [];
            if (อิสลาม) {
              lists.push("อิสลาม");
            }
            if (มังสวิรัติ) {
              lists.push("มังสวิรัติ");
            }
            if (เจ) {
              lists.push("เจ");
            }
            createFood(
              {
                lists,
                listPriority,
                isSpicy,
                isWhiteList,
                name,
                campId: camp._id,
                mealId: stringToId(params.mid),
              },
              token
            );
          }}
        />
      </form>
      <AllInOneLock token={token}>
        <FinishButton
          text="delete"
          onClick={() => deleteMeal(meal._id, token)}
        />
      </AllInOneLock>
    </div>
  );
}
