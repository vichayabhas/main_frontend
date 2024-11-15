"use client";
import { ChatReady } from "../../interface";
import { useState } from "react";
import GetTimeHtml from "./GetTimeHtml";
import { TextField } from "@mui/material";
import createNongBaanChat from "@/libs/randomthing/createNongBaanChat";
import createPartChat from "@/libs/randomthing/createPartChat";
import createNongChat from "@/libs/randomthing/createNongChat";
import createPeeBaanChat from "@/libs/randomthing/createPeeBaanChat";
import StringToHtml from "./StringToHtml";
import React from "react";
export default function ChatClient({
  data,
  token,
}: {
  data: ChatReady;
  token: string;
}) {
  const [message, setMessage] = useState<string | null>(null);
  const sendType = data.sendType;
  return (
    <div>
      <div
        className="text-4xl font-bold"
        style={{
          color: "#961A1D",
          width: "100%",
          textAlign: "center",
          marginTop: "100px",
          marginBottom: "20px",
        }}
      >
        {data.roomName}
      </div>
      <div
        style={{
          // chat container
          width: "100%",
          position: "absolute",
          bottom: "0",
          top: "145px",
          overflowY: "scroll",
        }}
      >
        <table
          style={{
            width: "70%",
            position: "absolute",
            left: "50%",
            marginLeft: "-35%",
          }}
        >
          {data.chats.map((chat,i) => (
            <tr key={i}>
              <tr>
                <StringToHtml input={chat.message} />
              </tr>
              <tr>
                <td>
                  <tr
                    style={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      display: "inline-block",
                      border: "solid",
                      borderColor: "#707070",
                      color: "#707070",
                      padding: "5px",
                      paddingLeft: "18px",
                      paddingRight: "18px",
                      borderRadius: "6px 18px 18px 18px",
                      marginBottom: "8px",
                    }}
                  >
                    {data.mode == "pee" ? (
                      <td>
                        {chat.nickname} {chat.partName}
                      </td> // part
                    ) : chat.role == "nong" ? (
                      <td>{chat.nickname} น้องค่าย</td> // lable
                    ) : (
                      <td>
                        {chat.nickname} พี่ {data.groupName}
                      </td> // group
                    )}
                  </tr>
                  <tr>
                    <td
                      style={{
                        fontSize: "12px",
                        color: "gray",
                      }}
                    >
                      {chat.typeChat} : ห้อง {chat.roomName}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        fontSize: "12px",
                        color: "gray",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      ---- {chat.baanName}
                      <span
                        style={{
                          marginTop: "4px",
                        }}
                      >
                        <GetTimeHtml
                          input={chat.date}
                          offset={data.timeOffset}
                        />
                      </span>
                      ----
                    </td>
                  </tr>
                </td>
              </tr>
            </tr>
          ))}
          <div style={{ height: "100px" }}></div>
        </table>
      </div>
      {sendType ? (
        <form
          style={{
            backgroundColor: "#961A1D",
            left: "20%",
            right: "20%",
            bottom: "10px",
            position: "absolute",
            height: "85px",
            borderRadius: "30px",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "15px",
              right: "0px",
              top: "15px",
            }}
          >
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
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div
            style={{
              position: "absolute",
              right: "20px",
              top: "20px",
            }}
          >
            <button
              className="bg-white p-3 rounded-lg font-medium shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
              style={{
                color: "#961A1D",
              }}
              onClick={() => {
                if (message) {
                  try {
                    switch (sendType.roomType) {
                      case "คุยกันในบ้าน": {
                        createNongBaanChat(
                          { baanId: sendType.id, message },
                          token
                        );
                        break;
                      }
                      case "คุยกันในฝ่าย": {
                        createPartChat({ partId: sendType.id, message }, token);
                        break;
                      }
                      case "น้องคุยส่วนตัวกับพี่": {
                        createNongChat(
                          { CampMemberCard: sendType.id, message },
                          token
                        );
                        break;
                      }
                      case "พี่คุยกันในบ้าน": {
                        createPeeBaanChat(
                          { baanId: sendType.id, message },
                          token
                        );
                        break;
                      }
                      case "พี่บ้านคุยกัน": {
                        createPartChat({ partId: sendType.id, message }, token);
                        break;
                      }
                    }
                  } catch (error) {
                    console.log(error);
                  }
                } else {
                  alert("Please type in all the details!");
                }
              }}
            >
              send message
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
