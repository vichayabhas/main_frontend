"use client";
import { updateBottle } from "@/libs/user/updateBottle";
import { updateProfile } from "@/libs/user/updateProfile";
import updateSize from "@/libs/user/updateSize";

import { Checkbox, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { InterUser } from "../../interface";
import { Session } from "next-auth";
import SelectSize from "./SelectSize";
import updateSleep from "@/libs/user/updateSleep";
import { Size } from "../../interface";
import FinishButton from "./FinishButton";
import bypassRole from "@/libs/user/bypassRole";
import React from "react";
// note fixed text box border bg-white ,width to 60%, title color ,button color &  mx-2, checkbox color

export default function UpdateProfileRaw({
  user,
  session,
}: {
  user: InterUser;
  session: Session | null;
}) {
  const [name, setName] = useState<string>(user.name);
  const [tel, setTel] = useState<string>(user.tel);
  const [email, setEmail] = useState<string>(user.email);
  const [nickname, setNickname] = useState<string>(user.nickname);
  const [lastname, setLastname] = useState<string>(user.lastname);
  const [citizenId, setCitizenId] = useState<string>(user.citizenId);
  const [shirtSize, setShirtSize] = useState<Size>(user.shirtSize);
  const [haveBottle, setHaveBottle] = useState<boolean>(user.haveBottle);
  const [likeToSleepAtCamp, setLikeToSleepAtCamp] = useState<boolean>(
    user.likeToSleepAtCamp
  );
  const [key, setKey] = useState<string>("");
  const router = useRouter();
  if (!session) {
    router.push("/");
    return <></>;
  }
  //console.log(user)
  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      <div
        className="text-4xl font-bold"
        style={{
          color: "#961A1D",
        }}
      >
        Update Profile{" "}
      </div>

      <form
        className="w-[70%] items-center p-10 rounded-3xl"
        style={{
          backgroundColor: "#961A1D",
        }}
      >
        <div className="flex flex-row items-center">
          <label className="w-2/5 text-2xl text-white">ชื่อจริง</label>
          <TextField
            name="Name"
            id="Name"
            defaultValue={name}
            className="w-3/5 bg-white rounded-2xl "
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
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">นามสกุล</label>
          <TextField
            name="LastName"
            id="LastName"
            defaultValue={lastname}
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
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-row items-center">
          <label className="w-2/5 text-2xl text-white">ชือเล่น</label>
          <TextField
            name="Nickname"
            id="Nickname"
            defaultValue={nickname}
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
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">Email</label>
          <TextField
            name="Email"
            id="Email"
            type="email"
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
            onChange={(e) => setEmail(e.target.value)}
            defaultValue={email}
            required
          />
        </div>

        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">เบอร์โทรศัพท์</label>
          <TextField
            name="Tel"
            id="Tel"
            type="number"
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
            onChange={(e) => setTel(e.target.value)}
            defaultValue={tel}
            required
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            รหัสประจำตัวประชาชน
          </label>
          <TextField
            name="citizenId"
            id="citizenId"
            type="number"
            required
            defaultValue={citizenId}
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
            onChange={(e) => setCitizenId(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">เลือกขนาดเสื้อ</label>

          <SelectSize select={setShirtSize} def={user.shirtSize} />
        </div>

        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            มีกระติกน้ำหรือไม่
          </label>
          <Checkbox
            onChange={(e, state) => {
              setHaveBottle(state);
            }}
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            defaultChecked={user.haveBottle}
          />
        </div>

        <div className="flex flex-row justify-end"></div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            ประสงค์นอนในค่ายหรือไม่
          </label>
          <Checkbox
            onChange={(e, state) => {
              setLikeToSleepAtCamp(state);
            }}
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            defaultChecked={user.likeToSleepAtCamp}
          />
        </div>
        <div className="flex flex-row justify-end">
          <button
            className="bg-white p-3 mx-2 font-medium rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700"
            style={{
              color: "#961A1D",
            }}
            onClick={() => {
              alert(user._id);
            }}
          >
            รหัส mongo
          </button>
          <button
            className="bg-white p-3 mx-2 font-medium rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700"
            style={{
              color: "#961A1D",
            }}
            onClick={() => {
              console.log(tel);
              console.log(email);

              try {
                updateProfile(
                  email,
                  tel,
                  name,
                  nickname,
                  lastname,
                  citizenId,
                  session.user.token
                );
                updateSize(shirtSize, session.user.token);
                updateBottle(haveBottle, session.user.token);
                updateSleep(likeToSleepAtCamp, session.user.token);
              } catch (error) {
                console.log(error);
              }
            }}
          >
            update all
          </button>
        </div>
        {user.fridayActEn ? (
          <>
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-white">bypass</label>
              <TextField
                name="citizenId"
                id="citizenId"
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
                onChange={(e) => setKey(e.target.value)}
              />
            </div>
            <FinishButton
              text="bypass"
              onClick={() => bypassRole(key, session.user.token)}
            />
          </>
        ) : null}
      </form>
    </div>
  );
}
