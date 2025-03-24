"use client";

import {
  Choice,
  GetAllQuestion,
  Id,
  BasicCamp,
  TriggerTextQuestion,
  QusetionType,
  TriggerChoiceQuestion,
  QuestionDeleteAction,
} from "../../../../interface";
import { TextField, Checkbox, Select, MenuItem } from "@mui/material";
import {
  getBackendUrl,
  setBoolean,
  setSwop,
  setTextToFloat,
  setTextToInt,
  setTextToString,
  SocketReady,
} from "../../utility/setup";
import editQuestion from "@/libs/camp/editQuestion";
//import getAllQuestion from "@/libs/camp/getAllQuestion";
import Waiting from "../../utility/Waiting";
import React from "react";
import deleteChoiceQuestion from "@/libs/camp/deleteChoiceQuestion";
import deleteTextQuestion from "@/libs/camp/deleteTextQuestion";
import FinishButton from "@/components/utility/FinishButton";
import { ChoiceQuestions, TextQuestions } from "./updateQuestionClass";
import { io } from "socket.io-client";
import getAllQuestion from "@/libs/camp/getAllQuestion";
import { RealTimeCamp } from "../authPart/UpdateCampClient";
const socket = io(getBackendUrl());
interface QuestionReady {
  element: React.ReactNode;
  order: number;
}
export default function UpdateQuestionClient({
  camp: campInput,
  questions,
  token,
}: {
  camp: BasicCamp;
  questions: GetAllQuestion;
  token: string;
}) {
  const [camp, setCamp] = React.useState(campInput);
  const room = camp._id.toString();
  type EditMode = "normal" | "edit" | "delete" | "wait";
  const actionSocket = new SocketReady<QusetionType>(socket, "questionAction");
  const textSocket = new SocketReady<TriggerTextQuestion>(
    socket,
    "trigTextQuestion"
  );
  const choiceSocket = new SocketReady<TriggerChoiceQuestion>(
    socket,
    "trigChoiceQuestion"
  );
  const deleteSocket = new SocketReady<QuestionDeleteAction>(
    socket,
    "deleteQuestion"
  );
  const updateSocket = new SocketReady<GetAllQuestion>(
    socket,
    "updateQuestion"
  );
  const realTimeCamp = new RealTimeCamp(camp._id, socket);
  const [editMode, setEditMode] = React.useState<EditMode>("normal");
  const [showCorrectAnswerAndScore, setShowCorrectAnswerAndScore] =
    React.useState(camp.showCorrectAnswerAndScore);
  const [canNongSeeAllAnswer, setCanNongSeeAllAnswer] = React.useState(
    camp.canNongSeeAllAnswer
  );
  const choiceIds = React.useState<(Id | null)[]>(
    questions.choices.map((choice) => choice._id)
  );
  const choiceQuestions = React.useState(
    questions.choices.map((choice) => choice.question)
  );
  const as = React.useState(questions.choices.map((choice) => choice.a));
  const bs = React.useState(questions.choices.map((choice) => choice.b));
  const cs = React.useState(questions.choices.map((choice) => choice.c));
  const ds = React.useState(questions.choices.map((choice) => choice.d));
  const es = React.useState(questions.choices.map((choice) => choice.e));
  const scoreAs = React.useState(
    questions.choices.map((choice) => choice.scoreA)
  );
  const scoreBs = React.useState(
    questions.choices.map((choice) => choice.scoreB)
  );
  const scoreCs = React.useState(
    questions.choices.map((choice) => choice.scoreC)
  );
  const scoreDs = React.useState(
    questions.choices.map((choice) => choice.scoreD)
  );
  const scoreEs = React.useState(
    questions.choices.map((choice) => choice.scoreE)
  );
  const corrects = React.useState<(Choice | "-")[]>(
    questions.choices.map((choice) => choice.correct)
  );
  const choiceOrder = React.useState(
    questions.choices.map((choice) => choice.order)
  );
  const choices = new ChoiceQuestions(
    choiceIds,
    choiceQuestions,
    as,
    bs,
    cs,
    ds,
    es,
    scoreAs,
    scoreBs,
    scoreCs,
    scoreDs,
    scoreEs,
    corrects,
    choiceOrder
  );
  const textQuestions = React.useState(
    questions.texts.map((text) => text.question)
  );
  const textIds = React.useState<(Id | null)[]>(
    questions.texts.map((text) => text._id)
  );
  const [deleteTextIds, setDeleteTextIds] = React.useState<Id[]>([]);
  const [deleteChoiceIds, setDeleteChoiceIds] = React.useState<Id[]>([]);
  const scores = React.useState(questions.texts.map((text) => text.score));
  const textOrder = React.useState(questions.texts.map((text) => text.order));
  const texts = new TextQuestions(textIds, textQuestions, scores, textOrder);
  function questionReady(
    isDelete: boolean,
    choices: ChoiceQuestions,
    texts: TextQuestions
  ): QuestionReady[] {
    return choices.indexes
      .map((i) => {
        return {
          element: (
            <>
              <div>{choices.getQuestion(i)}</div>
              <Select
                variant="standard"
                name="location"
                id="location"
                className="h-[2em] w-[200px] mb-5 text-white"
              >
                <MenuItem
                  value={`${choices.getA(i)} คะแนน ${choices.getScoreA(i)}`}
                >
                  {choices.getA(i)} คะแนน {choices.getScoreA(i)}
                </MenuItem>
                <MenuItem
                  value={`${choices.getB(i)} คะแนน ${choices.getScoreB(i)}`}
                >
                  {choices.getB(i)} คะแนน {choices.getScoreB(i)}
                </MenuItem>
                <MenuItem
                  value={`${choices.getC(i)} คะแนน ${choices.getScoreC(i)}`}
                >
                  {choices.getC(i)} คะแนน {choices.getScoreC(i)}
                </MenuItem>
                <MenuItem
                  value={`${choices.getD(i)} คะแนน ${choices.getScoreD(i)}`}
                >
                  {choices.getD(i)} คะแนน {choices.getScoreD(i)}
                </MenuItem>
                <MenuItem
                  value={`${choices.getE(i)} คะแนน ${choices.getScoreE(i)}`}
                >
                  {choices.getE(i)} คะแนน {choices.getScoreE(i)}
                </MenuItem>
              </Select>
              {deleteChoiceIds.length}
              {isDelete ? (
                <Checkbox
                  onChange={(e) => {
                    setSwop(choices.getId(i), setDeleteChoiceIds)(e);
                  }}
                />
              ) : null}
            </>
          ),
          order: choices.getOrder(i),
        };
      })
      .concat(
        texts.indexes.map((i) => ({
          element: (
            <div className="flex flex-row items-center mt-4">
              <label
                className="w-2/5 text-2xl text-white"
                style={{
                  textAlign: "left",
                }}
              >
                {texts.getQuestion(i)} คะแนน {texts.getScore(i)}
              </label>
              {deleteTextIds.length}
              {isDelete ? (
                <Checkbox
                  onChange={(e) => {
                    setSwop(texts.getId(i), setDeleteTextIds)(e);
                  }}
                />
              ) : null}
            </div>
          ),
          order: texts.getOrder(i),
        }))
      )
      .sort((a, b) => a.order - b.order);
  }
  const preview = questionReady(false, choices, texts).map((v) => v.element);
  const deletePreview = questionReady(true, choices, texts).map(
    (v) => v.element
  );
  function addTextQuestion() {
    texts.addOne(TextQuestions.new);
  }
  function addChoiceQuestion() {
    choices.addOne(ChoiceQuestions.new);
  }
  function clearAllCache() {
    choices.replace(questions.choices);
    texts.replace(questions.texts);
  }
  async function update() {
    await editQuestion(
      {
        texts: texts.export(),
        choices: choices.export(),
        campId: camp._id,
      },
      token
    );
    const newQuestions = await getAllQuestion(token, camp._id);
    updateSocket.trigger(newQuestions, room);
    setEditMode("normal");
  }
  async function deleteQuestion() {
    setEditMode("wait");
    let i = 0;
    while (i < deleteChoiceIds.length) {
      await deleteChoiceQuestion(deleteChoiceIds[i++], token);
    }
    i = 0;
    while (i < deleteTextIds.length) {
      await deleteTextQuestion(deleteTextIds[i++], token);
    }
    deleteSocket.trigger({ deleteChoiceIds, deleteTextIds }, room);
    setDeleteChoiceIds([]);
    setDeleteTextIds([]);
    setEditMode("normal");
  }
  React.useEffect(() => {
    textSocket.listen(room, (event: TriggerTextQuestion) => {
      const i = event.index;
      texts.modOrder(i)(event.order);
      texts.modQuestion(i)(event.question);
      texts.modScore(i)(event.score);
    });
    choiceSocket.listen(room, (event: TriggerChoiceQuestion) => {
      const i = event.index;
      choices.modQuestion(i)(event.question);
      choices.modA(i)(event.a);
      choices.modB(i)(event.b);
      choices.modC(i)(event.c);
      choices.modD(i)(event.d);
      choices.modE(i)(event.e);
      choices.modScoreA(i)(event.scoreA);
      choices.modScoreB(i)(event.scoreB);
      choices.modScoreC(i)(event.scoreC);
      choices.modScoreD(i)(event.scoreD);
      choices.modScoreE(i)(event.scoreE);
      choices.modOrder(i)(event.order);
      choices.modCorrect(i)(event.correct);
    });
    actionSocket.listen(room, (t) => {
      switch (t) {
        case "addText": {
          addTextQuestion();
          break;
        }
        case "addChoice": {
          addChoiceQuestion();
          break;
        }
        case "removeText": {
          texts.removeOne();
          break;
        }
        case "removeChoice": {
          choices.removeOne();
          break;
        }
      }
    });
    deleteSocket.listen(room, (set) => {
      texts.deletes(set.deleteTextIds);
      choices.deletes(set.deleteChoiceIds);
    });
    updateSocket.listen(room, (newData) => {
      texts.replace(newData.texts);
      choices.replace(newData.choices);
    });
    realTimeCamp.listen(setCamp);
    return () => {
      choiceSocket.disconnect();
      textSocket.disconnect();
      actionSocket.disconnect();
      deleteSocket.disconnect();
      updateSocket.disconnect();
      realTimeCamp.disconnect();
    };
  });
  switch (editMode) {
    case "normal": {
      return (
        <div>
          <div className="flex flex-row items-center my-5">
            <label className="w-2/5 text-2xl text-white">
              อนุญาติให้{camp.nongCall}ดูคำตอบทั้งหมดหรือไม่
            </label>
            <Checkbox
              sx={{
                "&.Mui-checked": {
                  color: "#FFFFFF", // Custom color when checked
                },
              }}
              onChange={setBoolean(setCanNongSeeAllAnswer)}
              checked={canNongSeeAllAnswer}
            />
          </div>
          <div className="flex flex-row items-center my-5">
            <label className="w-2/5 text-2xl text-white">
              เปิดเฉลยและคะแนนหรือไม่
            </label>
            <Checkbox
              sx={{
                "&.Mui-checked": {
                  color: "#FFFFFF", // Custom color when checked
                },
              }}
              onChange={setBoolean(setShowCorrectAnswerAndScore)}
              checked={showCorrectAnswerAndScore}
            />
          </div>
          {preview}
          {camp.lockChangeQuestion ? null : (
            <>
              <FinishButton
                text="edit question"
                onClick={() => {
                  setEditMode("edit");
                }}
              />
              <FinishButton
                text="delete question"
                onClick={() => setEditMode("delete")}
              />
            </>
          )}
        </div>
      );
    }
    case "edit": {
      return (
        <div
          className="w-[30%] items-center p-10 rounded-3xl "
          style={{
            backgroundColor: "#961A1D",
            width: "70%",
            marginTop: "20px",
          }}
        >
          {choices.indexes.map((i) => {
            function getChooseChoice(
              choices: ChoiceQuestions,
              i: number
            ): string {
              let chooseChoice: string;
              switch (choices.getCorrect(i)) {
                case "A": {
                  chooseChoice = `${choices.getA(i)} คะแนน ${choices.getScoreA(
                    i
                  )}`;
                  break;
                }
                case "B": {
                  chooseChoice = `${choices.getB(i)} คะแนน ${choices.getScoreB(
                    i
                  )}`;
                  break;
                }
                case "C": {
                  chooseChoice = `${choices.getC(i)} คะแนน ${choices.getScoreC(
                    i
                  )}`;
                  break;
                }
                case "D": {
                  chooseChoice = `${choices.getD(i)} คะแนน ${choices.getScoreD(
                    i
                  )}`;
                  break;
                }
                case "E": {
                  chooseChoice = `${choices.getE(i)} คะแนน ${choices.getScoreE(
                    i
                  )}`;
                  break;
                }
                case "-": {
                  chooseChoice = "-";
                  break;
                }
              }
              return chooseChoice;
            }
            return (
              <>
                <div className="flex flex-row items-center my-5">
                  <label className="w-2/5 text-2xl text-white">
                    คำถามข้อที่ {i + 1}
                  </label>
                  <TextField
                    name="Email"
                    id="Email"
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
                    onChange={setTextToString((set) => {
                      choiceSocket.trigger(
                        {
                          index: i,
                          question: set,
                          a: choices.getA(i),
                          b: choices.getB(i),
                          c: choices.getC(i),
                          d: choices.getD(i),
                          e: choices.getE(i),
                          scoreA: choices.getScoreA(i),
                          scoreB: choices.getScoreB(i),
                          scoreC: choices.getScoreC(i),
                          scoreD: choices.getScoreD(i),
                          scoreE: choices.getScoreE(i),
                          correct: choices.getCorrect(i),
                          order: choices.getOrder(i),
                        },
                        room
                      );
                    }, true)}
                    value={choices.getQuestion(i)}
                  />
                </div>
                <div className="flex flex-row items-center my-5">
                  <label className="w-2/5 text-2xl text-white">A</label>
                  <TextField
                    name="Email"
                    id="Email"
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
                    onChange={setTextToString((set) => {
                      choiceSocket.trigger(
                        {
                          index: i,
                          question: choices.getQuestion(i),
                          a: set,
                          b: choices.getB(i),
                          c: choices.getC(i),
                          d: choices.getD(i),
                          e: choices.getE(i),
                          scoreA: choices.getScoreA(i),
                          scoreB: choices.getScoreB(i),
                          scoreC: choices.getScoreC(i),
                          scoreD: choices.getScoreD(i),
                          scoreE: choices.getScoreE(i),
                          correct: choices.getCorrect(i),
                          order: choices.getOrder(i),
                        },
                        room
                      );
                    }, true)}
                    value={choices.getA(i)}
                  />
                </div>
                <div className="flex flex-row items-center my-5">
                  <label className="w-2/5 text-2xl text-white">B</label>
                  <TextField
                    name="Email"
                    id="Email"
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
                    onChange={setTextToString((set) => {
                      choiceSocket.trigger(
                        {
                          index: i,
                          question: choices.getQuestion(i),
                          a: choices.getA(i),
                          b: set,
                          c: choices.getC(i),
                          d: choices.getD(i),
                          e: choices.getE(i),
                          scoreA: choices.getScoreA(i),
                          scoreB: choices.getScoreB(i),
                          scoreC: choices.getScoreC(i),
                          scoreD: choices.getScoreD(i),
                          scoreE: choices.getScoreE(i),
                          correct: choices.getCorrect(i),
                          order: choices.getOrder(i),
                        },
                        room
                      );
                    }, true)}
                    value={choices.getB(i)}
                  />
                </div>
                <div className="flex flex-row items-center my-5">
                  <label className="w-2/5 text-2xl text-white">C</label>
                  <TextField
                    name="Email"
                    id="Email"
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
                    onChange={setTextToString((set) => {
                      choiceSocket.trigger(
                        {
                          index: i,
                          question: choices.getQuestion(i),
                          a: choices.getA(i),
                          b: choices.getB(i),
                          c: set,
                          d: choices.getD(i),
                          e: choices.getE(i),
                          scoreA: choices.getScoreA(i),
                          scoreB: choices.getScoreB(i),
                          scoreC: choices.getScoreC(i),
                          scoreD: choices.getScoreD(i),
                          scoreE: choices.getScoreE(i),
                          correct: choices.getCorrect(i),
                          order: choices.getOrder(i),
                        },
                        room
                      );
                    }, true)}
                    value={choices.getC(i)}
                  />
                </div>
                <div className="flex flex-row items-center my-5">
                  <label className="w-2/5 text-2xl text-white">D</label>
                  <TextField
                    name="Email"
                    id="Email"
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
                    onChange={setTextToString((set) => {
                      choiceSocket.trigger(
                        {
                          index: i,
                          question: choices.getQuestion(i),
                          a: choices.getA(i),
                          b: choices.getB(i),
                          c: choices.getC(i),
                          d: set,
                          e: choices.getE(i),
                          scoreA: choices.getScoreA(i),
                          scoreB: choices.getScoreB(i),
                          scoreC: choices.getScoreC(i),
                          scoreD: choices.getScoreD(i),
                          scoreE: choices.getScoreE(i),
                          correct: choices.getCorrect(i),
                          order: choices.getOrder(i),
                        },
                        room
                      );
                    }, true)}
                    value={choices.getD(i)}
                  />
                </div>
                <div className="flex flex-row items-center my-5">
                  <label className="w-2/5 text-2xl text-white">E</label>
                  <TextField
                    name="Email"
                    id="Email"
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
                    onChange={setTextToString((set) => {
                      choiceSocket.trigger(
                        {
                          index: i,
                          question: choices.getQuestion(i),
                          a: choices.getA(i),
                          b: choices.getB(i),
                          c: choices.getC(i),
                          d: choices.getD(i),
                          e: set,
                          scoreA: choices.getScoreA(i),
                          scoreB: choices.getScoreB(i),
                          scoreC: choices.getScoreC(i),
                          scoreD: choices.getScoreD(i),
                          scoreE: choices.getScoreE(i),
                          correct: choices.getCorrect(i),
                          order: choices.getOrder(i),
                        },
                        room
                      );
                    }, true)}
                    value={choices.getE(i)}
                  />
                </div>
                <div className="flex flex-row items-center my-5">
                  <label className="w-2/5 text-2xl text-white">คะแนน A</label>
                  <TextField
                    name="Email"
                    id="Email"
                    type="number"
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
                    onChange={setTextToFloat((set) => {
                      choiceSocket.trigger(
                        {
                          index: i,
                          question: choices.getQuestion(i),
                          a: choices.getA(i),
                          b: choices.getB(i),
                          c: choices.getC(i),
                          d: choices.getD(i),
                          e: choices.getE(i),
                          scoreA: set,
                          scoreB: choices.getScoreB(i),
                          scoreC: choices.getScoreC(i),
                          scoreD: choices.getScoreD(i),
                          scoreE: choices.getScoreE(i),
                          correct: choices.getCorrect(i),
                          order: choices.getOrder(i),
                        },
                        room
                      );
                    })}
                    value={choices.getScoreA(i).toString()}
                  />
                </div>
                <div className="flex flex-row items-center my-5">
                  <label className="w-2/5 text-2xl text-white">คะแนน B</label>
                  <TextField
                    name="Email"
                    id="Email"
                    type="number"
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
                    onChange={setTextToFloat((set) => {
                      choiceSocket.trigger(
                        {
                          index: i,
                          question: choices.getQuestion(i),
                          a: choices.getA(i),
                          b: choices.getB(i),
                          c: choices.getC(i),
                          d: choices.getD(i),
                          e: choices.getE(i),
                          scoreA: choices.getScoreA(i),
                          scoreB: set,
                          scoreC: choices.getScoreC(i),
                          scoreD: choices.getScoreD(i),
                          scoreE: choices.getScoreE(i),
                          correct: choices.getCorrect(i),
                          order: choices.getOrder(i),
                        },
                        room
                      );
                    })}
                    value={choices.getScoreB(i).toString()}
                  />
                </div>
                <div className="flex flex-row items-center my-5">
                  <label className="w-2/5 text-2xl text-white">คะแนน C</label>
                  <TextField
                    name="Email"
                    id="Email"
                    type="number"
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
                    onChange={setTextToFloat((set) => {
                      choiceSocket.trigger(
                        {
                          index: i,
                          question: choices.getQuestion(i),
                          a: choices.getA(i),
                          b: choices.getB(i),
                          c: choices.getC(i),
                          d: choices.getD(i),
                          e: choices.getE(i),
                          scoreA: choices.getScoreA(i),
                          scoreB: choices.getScoreB(i),
                          scoreC: set,
                          scoreD: choices.getScoreD(i),
                          scoreE: choices.getScoreE(i),
                          correct: choices.getCorrect(i),
                          order: choices.getOrder(i),
                        },
                        room
                      );
                    })}
                    value={choices.getScoreC(i).toString()}
                  />
                </div>
                <div className="flex flex-row items-center my-5">
                  <label className="w-2/5 text-2xl text-white">คะแนน D</label>
                  <TextField
                    name="Email"
                    id="Email"
                    type="number"
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
                    onChange={setTextToFloat((set) => {
                      choiceSocket.trigger(
                        {
                          index: i,
                          question: choices.getQuestion(i),
                          a: choices.getA(i),
                          b: choices.getB(i),
                          c: choices.getC(i),
                          d: choices.getD(i),
                          e: choices.getE(i),
                          scoreA: choices.getScoreA(i),
                          scoreB: choices.getScoreB(i),
                          scoreC: choices.getScoreC(i),
                          scoreD: set,
                          scoreE: choices.getScoreE(i),
                          correct: choices.getCorrect(i),
                          order: choices.getOrder(i),
                        },
                        room
                      );
                    })}
                    value={choices.getScoreD(i).toString()}
                  />
                </div>
                <div className="flex flex-row items-center my-5">
                  <label className="w-2/5 text-2xl text-white">คะแนน E</label>
                  <TextField
                    name="Email"
                    id="Email"
                    type="number"
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
                    onChange={setTextToFloat((set) => {
                      choiceSocket.trigger(
                        {
                          index: i,
                          question: choices.getQuestion(i),
                          a: choices.getA(i),
                          b: choices.getB(i),
                          c: choices.getC(i),
                          d: choices.getD(i),
                          e: choices.getE(i),
                          scoreA: choices.getScoreA(i),
                          scoreB: choices.getScoreB(i),
                          scoreC: choices.getScoreC(i),
                          scoreD: choices.getScoreD(i),
                          scoreE: set,
                          correct: choices.getCorrect(i),
                          order: choices.getOrder(i),
                        },
                        room
                      );
                    })}
                    value={choices.getScoreE(i).toString()}
                  />
                </div>
                <div>เลือกตัวเลือกที่ถูกต้อง</div>
                <Select
                  value={`${choices.getCorrect(i)} ${getChooseChoice(
                    choices,
                    i
                  )}`}
                  variant="standard"
                  name="location"
                  id="location"
                  className="h-[2em] w-[200px] mb-5 text-white"
                >
                  <MenuItem
                    onClick={() => {
                      choiceSocket.trigger(
                        {
                          index: i,
                          question: choices.getQuestion(i),
                          a: choices.getA(i),
                          b: choices.getB(i),
                          c: choices.getC(i),
                          d: choices.getD(i),
                          e: choices.getE(i),
                          scoreA: choices.getScoreA(i),
                          scoreB: choices.getScoreB(i),
                          scoreC: choices.getScoreC(i),
                          scoreD: choices.getScoreD(i),
                          scoreE: choices.getScoreE(i),
                          correct: "A",
                          order: choices.getOrder(i),
                        },
                        room
                      );
                    }}
                    value={`A ${choices.getA(i)} คะแนน ${choices.getScoreA(i)}`}
                  >
                    A {choices.getA(i)} คะแนน {choices.getScoreA(i)}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      choiceSocket.trigger(
                        {
                          index: i,
                          question: choices.getQuestion(i),
                          a: choices.getA(i),
                          b: choices.getB(i),
                          c: choices.getC(i),
                          d: choices.getD(i),
                          e: choices.getE(i),
                          scoreA: choices.getScoreA(i),
                          scoreB: choices.getScoreB(i),
                          scoreC: choices.getScoreC(i),
                          scoreD: choices.getScoreD(i),
                          scoreE: choices.getScoreE(i),
                          correct: "B",
                          order: choices.getOrder(i),
                        },
                        room
                      );
                    }}
                    value={`B ${choices.getB(i)} คะแนน ${choices.getScoreB(i)}`}
                  >
                    B {choices.getB(i)} คะแนน {choices.getScoreB(i)}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      choiceSocket.trigger(
                        {
                          index: i,
                          question: choices.getQuestion(i),
                          a: choices.getA(i),
                          b: choices.getB(i),
                          c: choices.getC(i),
                          d: choices.getD(i),
                          e: choices.getE(i),
                          scoreA: choices.getScoreA(i),
                          scoreB: choices.getScoreB(i),
                          scoreC: choices.getScoreC(i),
                          scoreD: choices.getScoreD(i),
                          scoreE: choices.getScoreE(i),
                          correct: "C",
                          order: choices.getOrder(i),
                        },
                        room
                      );
                    }}
                    value={`C ${choices.getC(i)} คะแนน ${choices.getScoreC(i)}`}
                  >
                    C {choices.getC(i)} คะแนน {choices.getScoreC(i)}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      choiceSocket.trigger(
                        {
                          index: i,
                          question: choices.getQuestion(i),
                          a: choices.getA(i),
                          b: choices.getB(i),
                          c: choices.getC(i),
                          d: choices.getD(i),
                          e: choices.getE(i),
                          scoreA: choices.getScoreA(i),
                          scoreB: choices.getScoreB(i),
                          scoreC: choices.getScoreC(i),
                          scoreD: choices.getScoreD(i),
                          scoreE: choices.getScoreE(i),
                          correct: "D",
                          order: choices.getOrder(i),
                        },
                        room
                      );
                    }}
                    value={`D ${choices.getD(i)} คะแนน ${choices.getScoreD(i)}`}
                  >
                    D {choices.getD(i)} คะแนน {choices.getScoreD(i)}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      choiceSocket.trigger(
                        {
                          index: i,
                          question: choices.getQuestion(i),
                          a: choices.getA(i),
                          b: choices.getB(i),
                          c: choices.getC(i),
                          d: choices.getD(i),
                          e: choices.getE(i),
                          scoreA: choices.getScoreA(i),
                          scoreB: choices.getScoreB(i),
                          scoreC: choices.getScoreC(i),
                          scoreD: choices.getScoreD(i),
                          scoreE: choices.getScoreE(i),
                          correct: "E",
                          order: choices.getOrder(i),
                        },
                        room
                      );
                    }}
                    value={`E ${choices.getE(i)} คะแนน ${choices.getScoreE(i)}`}
                  >
                    E {choices.getE(i)} คะแนน {choices.getScoreE(i)}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      choiceSocket.trigger(
                        {
                          index: i,
                          question: choices.getQuestion(i),
                          a: choices.getA(i),
                          b: choices.getB(i),
                          c: choices.getC(i),
                          d: choices.getD(i),
                          e: choices.getE(i),
                          scoreA: choices.getScoreA(i),
                          scoreB: choices.getScoreB(i),
                          scoreC: choices.getScoreC(i),
                          scoreD: choices.getScoreD(i),
                          scoreE: choices.getScoreE(i),
                          correct: "-",
                          order: choices.getOrder(i),
                        },
                        room
                      );
                    }}
                    value={"-"}
                  >
                    -
                  </MenuItem>
                </Select>
                <div className="flex flex-row items-center my-5">
                  <label className="w-2/5 text-2xl text-white">ลำดับ</label>
                  <TextField
                    name="Email"
                    id="Email"
                    type="number"
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
                    onChange={setTextToInt((set) => {
                      choiceSocket.trigger(
                        {
                          index: i,
                          question: choices.getQuestion(i),
                          a: choices.getA(i),
                          b: choices.getB(i),
                          c: choices.getC(i),
                          d: choices.getD(i),
                          e: choices.getE(i),
                          scoreA: choices.getScoreA(i),
                          scoreB: choices.getScoreB(i),
                          scoreC: choices.getScoreC(i),
                          scoreD: choices.getScoreD(i),
                          scoreE: choices.getScoreE(i),
                          correct: choices.getCorrect(i),
                          order: set,
                        },
                        room
                      );
                    })}
                    value={choices.getOrder(i).toString()}
                  />
                </div>
              </>
            );
          })}
          <FinishButton
            text="เพิ่มคำถามที่เป็นตัวเลือก"
            onClick={() => {
              actionSocket.trigger("addChoice", room);
            }}
          />
          <FinishButton
            text="ลบคำถามที่เป็นตัวเลือก"
            onClick={() => {
              actionSocket.trigger("removeChoice", room);
            }}
          />
          {texts.indexes.map((i) => (
            <>
              <div className="flex flex-row items-center my-5">
                <label className="w-2/5 text-2xl text-white">
                  คำถามข้อที่ {i + 1}
                </label>
                <TextField
                  name="Email"
                  id="Email"
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
                  onChange={setTextToString((set) => {
                    textSocket.trigger(
                      {
                        question: set,
                        index: i,
                        score: texts.getScore(i),
                        order: texts.getOrder(i),
                      },
                      room
                    );
                  }, true)}
                  value={texts.getQuestion(i)}
                />
              </div>
              <div className="flex flex-row items-center my-5">
                <label className="w-2/5 text-2xl text-white">คะแนน</label>
                <TextField
                  name="Email"
                  id="Email"
                  type="number"
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
                  onChange={setTextToFloat((set) => {
                    textSocket.trigger(
                      {
                        question: texts.getQuestion(i),
                        index: i,
                        score: set,
                        order: texts.getOrder(i),
                      },
                      room
                    );
                  })}
                  value={texts.getScore(i).toString()}
                />
              </div>
              <div className="flex flex-row items-center my-5">
                <label className="w-2/5 text-2xl text-white">ลำดับ</label>
                <TextField
                  name="Email"
                  id="Email"
                  type="number"
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
                  onChange={setTextToInt((set) => {
                    textSocket.trigger(
                      {
                        question: texts.getQuestion(i),
                        index: i,
                        score: texts.getScore(i),
                        order: set,
                      },
                      room
                    );
                  })}
                  value={texts.getOrder(i).toString()}
                />
              </div>
            </>
          ))}
          <FinishButton
            text="เพิ่มคำถามที่พิมพ์ตอบ"
            onClick={() => {
              actionSocket.trigger("addText", room);
            }}
          />
          <FinishButton
            text="ลบคำถามที่พิมพ์ตอบ"
            onClick={() => {
              actionSocket.trigger("removeText", room);
            }}
          />
          <FinishButton text="update" onClick={update} />
          <FinishButton
            text="clear"
            onClick={() => {
              clearAllCache();
              setEditMode("normal");
            }}
          />
        </div>
      );
    }
    case "delete": {
      return (
        <div
          className="w-[30%] items-center p-10 rounded-3xl "
          style={{
            backgroundColor: "#961A1D",
            width: "70%",
            marginTop: "20px",
          }}
        >
          {deletePreview}
          <FinishButton
            text="clear"
            onClick={() => {
              setDeleteChoiceIds([]);
              setDeleteTextIds([]);
              setEditMode("normal");
            }}
          />
          <FinishButton text="delete" onClick={deleteQuestion} />
        </div>
      );
    }
    case "wait": {
      return <Waiting />;
    }
  }
}
