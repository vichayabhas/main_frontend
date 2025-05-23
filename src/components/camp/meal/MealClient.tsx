"use client";

import AllInOneLock from "@/components/utility/AllInOneLock";
import FinishButton from "@/components/utility/FinishButton";
import GetTimeHtml from "@/components/utility/GetTimeHtml";
import {
  addTime,
  SetUpDownPack,
  setBoolean,
  selectTimeToSystem,
  setTextToString,
  stringToId,
  getBackendUrl,
  SocketReady,
} from "@/components/utility/setup";
import createFood from "@/libs/randomthing/createFood";
import deleteMeal from "@/libs/randomthing/deleteMeal";
import updateMeal from "@/libs/randomthing/updateMeal";
import { Checkbox, TextField } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React from "react";
import {
  RoleCamp,
  FoodLimit,
  GetMealForUpdate,
  InterMeal,
  InterFood,
} from "../../../../interface";
import { io } from "socket.io-client";
import { RealTimeCamp } from "../authPart/UpdateCampClient";

const socket = io(getBackendUrl());
export default function MealClient({
  params,
  data,
  token,
}: {
  params: { pid: string; mid: string };
  token: string;
  data: GetMealForUpdate;
}) {
  const { displayOffset, selectOffset, meal } = data;
  const router = useRouter();
  const [foods, setFoods] = React.useState(data.foods);
  const [nong, setNong] = React.useState(meal.roles.includes("nong"));
  const [pee, setPee] = React.useState(meal.roles.includes("pee"));
  const [peto, setPeto] = React.useState(meal.roles.includes("peto"));
  const [time, setTime] = React.useState<dayjs.Dayjs | null>(
    dayjs(addTime(meal.time.toString(), selectOffset))
  );
  const [name, setName] = React.useState("");
  const [isSpicy, setIsSpicy] = React.useState(true);
  const {
    up: isWhiteList,
    down: listPriority,
    setDown: setListPriority,
    setUp: setIsWhiteList,
  } = new SetUpDownPack(React.useState(SetUpDownPack.init(false, false)));
  const [มังสวิรัติ, setมังสวิรัติ] = React.useState(false);
  const [เจ, setเจ] = React.useState(false);
  const [อิสลาม, setอิสลาม] = React.useState(false);
  const updateMealSocket = new SocketReady<InterMeal>(
    socket,
    "updateMeal",
    meal._id
  );
  const createFoodSocket = new SocketReady<InterFood[]>(
    socket,
    "createFood",
    meal._id
  );
  const [camp, setCamp] = React.useState(data.camp);
  const realTimeCamp = new RealTimeCamp(camp._id, socket);
  React.useEffect(() => {
    updateMealSocket.listen((newData) => {
      setNong(newData.roles.includes("nong"));
      setPee(newData.roles.includes("pee"));
      setPeto(newData.roles.includes("peto"));
      setTime(dayjs(addTime(newData.time.toString(), selectOffset)));
    });
    createFoodSocket.listen(setFoods);
    realTimeCamp.listen(setCamp);
    return () => {
      updateMealSocket.disconnect();
      createFoodSocket.disconnect();
      realTimeCamp.disconnect();
    };
  });
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
      <div
        className="w-[70%] items-center p-10 rounded-3xl"
        style={{
          backgroundColor: "#961A1D",
        }}
      >
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            ข้าวมื้อนี้ให้{camp.nongCall}หรือไม่
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
            ข้าวมื้อนี้ให้พี่{camp.groupName}หรือไม่
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
            text="update มื้ออาหาร"
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
                  token,
                  updateMealSocket,
                  socket
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
          text="create food"
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
              token,
              createFoodSocket,
              socket
            );
          }}
        />
      </div>
      <AllInOneLock token={token}>
        <FinishButton
          text="delete"
          onClick={() => deleteMeal(meal._id, token)}
        />
      </AllInOneLock>
    </div>
  );
}
