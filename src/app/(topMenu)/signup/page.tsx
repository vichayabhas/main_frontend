"use client";
import SelectSize from "@/components/SelectSize";
import userSignup from "@/libs/user/userSignup";
import { Checkbox, Input, TextField } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import React from "react";
export default function signupPage() {
  const [name, setName] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [shirtSize, setShirtSize] = useState<
    "S" | "M" | "L" | "XL" | "XXL" | "3XL" | null
  >(null);
  const [gender, setGender] = useState<"Male" | "Female" | null>(null);
  const [haveBottle, setHaveBottle] = useState<boolean >(false);
  const [citizenId, setCitizenId] = useState<string | null>(null);
  const [likeToSleepAtCamp, setLikeToSleepAtCamp] = useState<boolean>(false);
  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      <div className="text-4xl font-bold"
      style={{
        color:"#961A1D"
      }}
      >Register</div>

      <form className="w-[70%] items-center p-10 rounded-3xl"
       style={{
        backgroundColor:"#961A1D"
      }}
      >
        <div className="flex flex-row items-center">
          <label className="w-2/5 text-2xl text-white">ชื่อจริง</label>
          <TextField
            name="Name"
            id="Name"
            className="w-3/5 bg-white rounded-2xl shadow-inner"
            sx={{
              backgroundColor: '#f5f5f5',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: ' 1rem',
                  borderColor: 'transparent', 
                },
                '&:hover fieldset': {
                  borderColor: '#5479FF',      
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#5479FF',      
                }
              }
            }}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">นามสกุล</label>
          <TextField
            name="LastName"
            id="LastName"
            className="w-3/5 bg-white rounded-2xl border-gray-200"
            sx={{
              backgroundColor: '#f5f5f5',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: ' 1rem',
                  borderColor: 'transparent', 
                },
                '&:hover fieldset': {
                  borderColor: '#5479FF',      
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#5479FF',      
                }
              }
            }}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center">
          <label className="w-2/5 text-2xl text-white">ชือเล่น</label>
          <TextField
            name="Nickname"
            id="Nickname"
            className="w-3/5 bg-white rounded-2xl border-gray-200"
            sx={{
              backgroundColor: '#f5f5f5',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: ' 1rem',
                  borderColor: 'transparent', 
                },
                '&:hover fieldset': {
                  borderColor: '#5479FF',      
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#5479FF',      
                }
              }
            }}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">Email</label>
          <TextField
            name="Email"
            id="Email"
            className="w-3/5 bg-white rounded-2xl border-gray-200"
            sx={{
              backgroundColor: '#f5f5f5',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: ' 1rem',
                  borderColor: 'transparent', 
                },
                '&:hover fieldset': {
                  borderColor: '#5479FF',      
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#5479FF',      
                }
              }
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">Password</label>
          <TextField
            name="Password"
            id="Password"
            className="w-3/5 bg-white rounded-2xl border-gray-200"
            sx={{
              backgroundColor: '#f5f5f5',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: ' 1rem',
                  borderColor: 'transparent', 
                },
                '&:hover fieldset': {
                  borderColor: '#5479FF',      
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#5479FF',      
                }
              }
            }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">Tel.</label>
          <TextField
            name="Tel"
            id="Tel"
            className="w-3/5 bg-white rounded-2xl border-gray-200"
            sx={{
              backgroundColor: '#f5f5f5',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: ' 1rem',
                  borderColor: 'transparent', 
                },
                '&:hover fieldset': {
                  borderColor: '#5479FF',      
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#5479FF',      
                }
              }
            }}
            onChange={(e) => setTel(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            รหัสประจำตัวประชาชน
          </label>
          <TextField
            name="citizenId"
            id="citizenId"
            className="w-3/5 bg-white rounded-2xl border-gray-200"
            sx={{
              backgroundColor: '#f5f5f5',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: ' 1rem',
                  borderColor: 'transparent', 
                },
                '&:hover fieldset': {
                  borderColor: '#5479FF',      
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#5479FF',      
                }
              }
            }}
            onChange={(e) => setCitizenId(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">เพศ</label>
          <Input
            type="radio"
            id="gender"
            value={"male"}
            onClick={() => setGender("Male")}
            className="h-4 w-4 rounded border-gray-300 focus:ring-indigo-600"
          />
          <label className="w-2/5 text-2xl text-white">ชาย</label>
          <Input
            type="radio"
            id="gender"
            value={"female"}
            onClick={() => setGender("Female")}
            className="h-4 w-4 rounded border-gray-300 focus:ring-indigo-600"
          />
          <label className="w-2/5 text-2xl text-white">หญิง</label>
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">
            เลือกขนาดเสื้อ
          </label>
          <SelectSize select={setShirtSize} def={null} />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            ประสงค์ใช้ในค่ายหรือไม่
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
          />
        </div>
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
          />
        </div>
        <div className="flex flex-row justify-end">
          <button
            className="bg-white p-3 rounded-lg font-medium shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
            style={{
              color:"#961A1D"
            }}
            onClick={async () => {
              if (
                name &&
                tel &&
                email &&
                password &&
                shirtSize &&
                gender &&
                lastname &&
                nickname &&
                citizenId
              ) {
                try {
                  await userSignup({
                    name,
                    tel,
                    email,
                    password,
                    nickname,
                    lastname,
                    shirtSize,
                    gender,
                    haveBottle,
                    citizenId,
                    likeToSleepAtCamp,
                  });
                } catch (error) {
                  console.log(error);
                }
              } else {
                alert("Please type in all the details!");
              }
            }}
          >
            Register
          </button>
        </div>
        <div className="text-gray-200 mt-5">
          Already have an account?
          <Link href="/api/auth/signin" className="mr-1 ml-1 underline">
            Sign-In
          </Link>
          now!
        </div>
      </form>
    </div>
  );
}
