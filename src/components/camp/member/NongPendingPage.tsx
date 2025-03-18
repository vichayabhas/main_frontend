"use client";
import nongRegisterCamp from "@/libs/camp/nongRegisterCamp";
import { MenuItem, Select, TextField } from "@mui/material";
import { Choice, CampState } from "../../../../interface";
import {
  getBackendUrl,
  modifyElementInUseStateArray,
  setMap,
  setTextToString,
} from "../../utility/setup";
import Link from "next/link";
import React from "react";
import ImagesFromUrl from "../../utility/ImagesFromUrl";
import { RealTimeCamp } from "../authPart/UpdateCampClient";
import { io } from "socket.io-client";

const socket = io(getBackendUrl());
interface QuestionReady {
  element: React.ReactNode;
  order: number;
}
export default function NongPendingPage({
  token,
  campState,
}: {
  token: string;
  campState: CampState;
}) {
  const { user, questions } = campState;
  const [link, setLink] = React.useState<string | null>(campState.link);
  const [choiceAnswers, setChoiceAnswers] = React.useState<(Choice | "-")[]>(
    questions.choices.map((choice) => choice.answer)
  );
  const [textAnswers, setTextAnswers] = React.useState(
    questions.texts.map((text) => text.answer)
  );
  const [camp, setCamp] = React.useState(campState.camp);
  const realTimeCamp = new RealTimeCamp(camp._id, socket);
  React.useEffect(() => {
    realTimeCamp.listen(setCamp);
    return () => {
      realTimeCamp.disconect();
    };
  });
  const questionReady: QuestionReady[] = questions.choices
    .map((choice, i) => {
      let chooseChoice: string;
      switch (choiceAnswers[i]) {
        case "A": {
          chooseChoice = choice.a;
          break;
        }
        case "B": {
          chooseChoice = choice.b;
          break;
        }
        case "C": {
          chooseChoice = choice.c;
          break;
        }
        case "D": {
          chooseChoice = choice.d;
          break;
        }
        case "E": {
          chooseChoice = choice.e;
          break;
        }
        case "-": {
          chooseChoice = "-";
          break;
        }
      }
      return {
        element: (
          <>
            <div>{choice.question}</div>
            <Select
              value={chooseChoice}
              variant="standard"
              name="location"
              id="location"
              className="h-[2em] w-[200px] mb-5 text-white"
            >
              <MenuItem
                onClick={() => {
                  setMap(
                    setChoiceAnswers,
                    modifyElementInUseStateArray(i)
                  )("A");
                }}
                value={choice.a}
              >
                {choice.a}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setMap(
                    setChoiceAnswers,
                    modifyElementInUseStateArray(i)
                  )("B");
                }}
                value={choice.b}
              >
                {choice.b}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setMap(
                    setChoiceAnswers,
                    modifyElementInUseStateArray(i)
                  )("C");
                }}
                value={choice.c}
              >
                {choice.c}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setMap(
                    setChoiceAnswers,
                    modifyElementInUseStateArray(i)
                  )("D");
                }}
                value={choice.d}
              >
                {choice.d}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setMap(
                    setChoiceAnswers,
                    modifyElementInUseStateArray(i)
                  )("E");
                }}
                value={choice.e}
              >
                {choice.e}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setMap(
                    setChoiceAnswers,
                    modifyElementInUseStateArray(i)
                  )("-");
                }}
                value={"-"}
              >
                -
              </MenuItem>
            </Select>
          </>
        ),
        order: choice.order,
      };
    })
    .concat(
      questions.texts.map((text, i) => ({
        element: (
          <div className="flex flex-row items-center mt-4">
            <label
              className="w-2/5 text-2xl text-white"
              style={{
                textAlign: "left",
              }}
            >
              {text.question}
            </label>
            <TextField
              name="Name"
              id="Name"
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
              className="w-3/5 bg-white rounded-2xl shadow-inner"
              onChange={setTextToString(
                setMap(setTextAnswers, modifyElementInUseStateArray(i)),
                true
              )}
              value={textAnswers[i]}
            />
          </div>
        ),
        order: text.order,
      }))
    )
    .sort((a, b) => a.order - b.order);
  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      <ImagesFromUrl urls={camp.pictureUrls} />

      <div className="text-4xl font-medium">Register</div>
      {camp.registerSheetLink ? (
        <Link href={`${camp.registerSheetLink}${user._id}`}>ใบรับสมัคร</Link>
      ) : null}
      {camp.registerSheetLink ? (
        <Link href={campState.link}>ใบรับสมัคร</Link>
      ) : null}
      {camp.open ? (
        <form className="w-[30%] items-center bg-slate-600 p-10 rounded-3xl shadow-[25px_25px_40px_-10px_rgba(0,0,0,0.7)]">
          <div className="flex flex-row items-center">
            <label className="w-2/5 text-2xl text-slate-200">
              Link googleDrive
            </label>
            <TextField
              name="Name"
              id="Name"
              className="w-3/5 bg-slate-100 rounded-2xl shadow-inner"
              onChange={setTextToString(setLink)}
              value={link}
            />
          </div>
          {questionReady.map((e) => e.element)}
          <div className="flex flex-row justify-end">
            <button
              className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
              onClick={async () => {
                if (link) {
                  try {
                    nongRegisterCamp(camp._id, link, token, {
                      campId: camp._id,
                      textAnswers: textAnswers.map((text, i) => ({
                        answer: text,
                        questionId: questions.texts[i]._id,
                        answerId: questions.texts[i].answerId,
                      })),
                      choiceAnswers: choiceAnswers.map((choice, i) => ({
                        answer: choice,
                        questionId: questions.choices[i]._id,
                        answerId: questions.choices[i].answerId,
                      })),
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
        </form>
      ) : null}
    </div>
  );
}
