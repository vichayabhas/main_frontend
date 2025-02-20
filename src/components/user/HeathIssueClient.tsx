"use client";

import updateHeath from "@/libs/user/updateHeath";
import { TextField, Select, MenuItem, Checkbox } from "@mui/material";
import React from "react";
import { HeathIssueBody, FoodLimit, foodLimits } from "../../../interface";
import FinishButton from "../utility/FinishButton";
import { setTextToString, setBoolean } from "../utility/setup";

export default function HeathIssueClient({
  heathIssue,
  token,
}: {
  heathIssue: HeathIssueBody;
  token: string;
}) {
  const [food, set1] = React.useState<string>(heathIssue.food);
  const [medicine, set2] = React.useState<string>(heathIssue.medicine);
  const [chronicDisease, set3] = React.useState<string>(
    heathIssue.chronicDisease
  );
  const [spicy, set4] = React.useState<boolean>(heathIssue.spicy);
  const [extra, set5] = React.useState<string>(heathIssue.extra);
  const [isWearing, set6] = React.useState<boolean>(heathIssue.isWearing);
  const [mode, setMode] = React.useState<boolean>(false);
  const [foodConcern, set7] = React.useState<string>(heathIssue.foodConcern);
  const [foodLimit, set8] = React.useState<FoodLimit>(heathIssue.foodLimit);
  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      <div
        className="text-4xl font-medium"
        style={{
          color: "#961A1D",
        }}
      >
        ปัญหาสุขภาพ
      </div>

      <form
        className="w-[70%] items-center  p-10 rounded-3xl"
        style={{
          backgroundColor: "#961A1D",
        }}
      >
        <div className="flex flex-row items-center">
          <label className="w-2/5 text-2xl text-white">แพ้อาหารอะไรบ้าง</label>
          <TextField
            name="Name"
            id="Name"
            className="w-3/5 bg-white rounded-2xl shadow-inner"
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
            onChange={setTextToString(set1, true)}
            value={food}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">แพ้ยาอะไรบ้าง</label>
          <TextField
            name="LastName"
            id="LastName"
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
            onChange={setTextToString(set2, true)}
            value={medicine}
          />
        </div>
        <div className="flex flex-row items-center">
          <label className="w-2/5 text-2xl text-white">
            มีโรคประจำตัวอะไรบ้าง
          </label>
          <TextField
            name="Nickname"
            id="Nickname"
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
            onChange={setTextToString(set3, true)}
            value={chronicDisease}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            ต้องการเน้นย้ำเรื่องอาหารว่าอะไรบ้าง
          </label>
          <TextField
            name="Nickname"
            id="Nickname"
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
            onChange={setTextToString(set7, true)}
            value={foodConcern}
          />
        </div>
        <label
          className="w-2/5 text-2xl mb-5 text-white"
          style={{
            textAlign: "left",
          }}
        >
          ข้อจำกัดด้านความเชื่อ
        </label>
        <Select
          variant="standard"
          name="location"
          id="location"
          className="h-[2em] w-[200px] mb-5 mx-3 text-white"
          value={foodLimit}
          sx={{
            color: "white",
          }}
        >
          {foodLimits.map((value, i) => {
            return (
              <MenuItem
                key={i}
                onClick={() => {
                  set8(value);
                }}
                value={value}
              >
                {value}
              </MenuItem>
            );
          })}
        </Select>
        <div>
          <label className="w-2/5 text-2xl text-white">
            กินเผ็ดไม่ได้ใช่หรือไม่
          </label>
          <Checkbox
            onChange={setBoolean(set4)}
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            checked={spicy}
          />
        </div>

        {mode ? (
          <>
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-slate-200">
                มีอะไรเพิ่มเติม
              </label>
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
                onChange={setTextToString(set5, true)}
                value={extra}
              />
            </div>
            <div>
              <label className="w-2/5 text-2xl text-slate-200">
                ใส่แพมเพิสหรือไม่
              </label>
              <Checkbox
                onChange={setBoolean(set6)}
                sx={{
                  "&.Mui-checked": {
                    color: "#FFFFFF", // Custom color when checked
                  },
                }}
                checked={isWearing}
              />
            </div>
          </>
        ) : null}
        <div>
          <label className="w-2/5 text-2xl text-white">advance</label>
          <Checkbox
            onChange={setBoolean(setMode)}
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
          />
        </div>
        <FinishButton
          text="update"
          onClick={() => {
            updateHeath(
              {
                food,
                chronicDisease,
                medicine,
                spicy,
                extra,
                isWearing,
                foodConcern,
                foodLimit,
              },
              token
            );
          }}
        />
      </form>
    </div>
  );
}
