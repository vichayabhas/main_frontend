"use client";

import { useState } from "react";
import { Choice, GetAllQuestion } from "../../interface";
import { Select, MenuItem, TextField } from "@mui/material";
import {
  modifyElementInUseStateArray,
  setMap,
  setTextToString,
  stringToId,
} from "./setup";
import React from "react";
import peeAnswerQuestion from "@/libs/camp/peeAnswerQuestion";
interface QuestionReady {
  element: React.ReactNode;
  order: number;
}
export default function PureQuestion({
  token,
  questions,
  campIdString,
}: {
  token: string;
  questions: GetAllQuestion;
  campIdString: string;
}) {
  const campId = stringToId(campIdString);
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
            <Select<string>
              defaultValue={chooseChoice}
              variant="standard"
              name="location"
              id="location"
              className="h-[2em] w-[200px] mb-5 text-white"
            >
              <MenuItem
                onClick={() =>
                  setMap(setChoiceAnswers, modifyElementInUseStateArray(i))("A")
                }
                value={choice.a}
              >
                {choice.a}
              </MenuItem>
              <MenuItem
                onClick={() =>
                  setMap(setChoiceAnswers, modifyElementInUseStateArray(i))("B")
                }
                value={choice.b}
              >
                {choice.b}
              </MenuItem>
              <MenuItem
                onClick={() =>
                  setMap(setChoiceAnswers, modifyElementInUseStateArray(i))("C")
                }
                value={choice.c}
              >
                {choice.c}
              </MenuItem>
              <MenuItem
                onClick={() =>
                  setMap(setChoiceAnswers, modifyElementInUseStateArray(i))("D")
                }
                value={choice.d}
              >
                {choice.d}
              </MenuItem>
              <MenuItem
                onClick={() =>
                  setMap(setChoiceAnswers, modifyElementInUseStateArray(i))("E")
                }
                value={choice.e}
              >
                {choice.e}
              </MenuItem>
              <MenuItem
                onClick={() =>
                  setMap(setChoiceAnswers, modifyElementInUseStateArray(i))("-")
                }
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
                setMap(setTextAnswers, modifyElementInUseStateArray(i))
              )}
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
      <form className="w-[30%] items-center bg-slate-600 p-10 rounded-3xl shadow-[25px_25px_40px_-10px_rgba(0,0,0,0.7)]">
        {questionReady.map((e) => e.element)}
        <div className="flex flex-row justify-end">
          {questions.canAnswerTheQuestion ? (
            <button
              className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
              onClick={async () => {
                peeAnswerQuestion(
                  {
                    campId,
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
                  },
                  token
                );
              }}
            >
              Register
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}