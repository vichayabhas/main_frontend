"use client";
import nongRegisterCamp from "@/libs/camp/nongRegisterCamp";
import { MenuItem, Select, TextField } from "@mui/material";
import { useRef, useState } from "react";
import {
  Choice,
  GetAllQuestion,
  InterCampFront,
  InterUser,
} from "../../interface";
import { getValue, modifyElementInUseStateArray } from "./setup";
import Link from "next/link";
import React from "react";

interface QuestionReady {
  element: React.ReactNode;
  order: number;
}
export default function NongPendingPage({
  camp,
  token,
  user,
  questions,
}: {
  camp: InterCampFront;
  token: string;
  user: InterUser;
  questions: GetAllQuestion;
}) {
  const userRef = useRef("");
  const [link, setLink] = useState<string | null>("");
  const [choiceAnswers, setChoiceAnswers] = useState<(Choice | "-")[]>(
    questions.choices.map((choice) => choice.answer)
  );
  const [textAnswers, setTextAnswers] = useState(
    questions.texts.map((text) => text.answer)
  );
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
              defaultValue={chooseChoice}
              variant="standard"
              name="location"
              id="location"
              className="h-[2em] w-[200px] mb-5 text-white"
            >
              <MenuItem
                onClick={() => {
                  setChoiceAnswers(
                    choiceAnswers.map(
                      modifyElementInUseStateArray<Choice | "-">("A", i)
                    )
                  );
                }}
                value={choice.a}
              >
                {choice.a}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setChoiceAnswers(
                    choiceAnswers.map(
                      modifyElementInUseStateArray<Choice | "-">("B", i)
                    )
                  );
                }}
                value={choice.b}
              >
                {choice.b}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setChoiceAnswers(
                    choiceAnswers.map(
                      modifyElementInUseStateArray<Choice | "-">("C", i)
                    )
                  );
                }}
                value={choice.c}
              >
                {choice.c}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setChoiceAnswers(
                    choiceAnswers.map(
                      modifyElementInUseStateArray<Choice | "-">("D", i)
                    )
                  );
                }}
                value={choice.d}
              >
                {choice.d}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setChoiceAnswers(
                    choiceAnswers.map(
                      modifyElementInUseStateArray<Choice | "-">("E", i)
                    )
                  );
                }}
                value={choice.e}
              >
                {choice.e}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setChoiceAnswers(
                    choiceAnswers.map(
                      modifyElementInUseStateArray<Choice | "-">("-", i)
                    )
                  );
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
              onChange={(e) => {
                setTextAnswers(textAnswers.map(modifyElementInUseStateArray(e.target.value,i)))
              }}
              defaultValue={textAnswers[i]}
            />
          </div>
        ),
        order: text.order,
      }))
    )
    .sort((a, b) => a.order - b.order);
  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      <div className="text-4xl font-medium">Register</div>
      {camp.registerSheetLink ? (
        <Link href={`${camp.registerSheetLink}${user._id}`}>ใบรับสมัคร</Link>
      ) : null}
      {camp.registerSheetLink ? (
        <Link href={`${getValue(camp.nongPendingIds, user._id)}${user._id}`}>
          ใบรับสมัคร
        </Link>
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
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          {questionReady.map((e) => e.element)}
          <div className="flex flex-row justify-end">
            <button
              className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
              onClick={async () => {
                console.log(userRef);
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
