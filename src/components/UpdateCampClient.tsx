"use client";

import { useRouter } from "next/navigation";
import {
  Choice,
  GetAllQuestion,
  Id,
  InterCampFront,
  BasicPart,
  MyMap,
  SystemInfo,
  TriggerChoiceQuestion,
  TriggerTextQuestion,
} from "../../interface";
import { BasicBaan } from "../../interface";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { TextField, Checkbox, Select, MenuItem } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import updateCamp from "@/libs/admin/updateCamp";
import BackToHome from "./BackToHome";
import dayjs, { Dayjs } from "dayjs";
import FinishButton from "./FinishButton";
import addBaan from "@/libs/admin/addBaan";
import SelectTemplate from "./SelectTemplate";
import addPart from "@/libs/admin/addPart";
import createBaanByGroup from "@/libs/admin/createBaanByGroup";
import saveDeleteCamp from "@/libs/admin/saveDeleteCamp";
import TypingImageSource from "./TypingImageSource";
import {
  addItemInUseStateArray,
  modifyElementInUseStateArray,
  notEmpty,
  removeElementInUseStateArray,
  setBoolean,
  setMap,
  setSwop,
  setTextToFloat,
  setTextToInt,
  setTextToString,
  SetUpMiddleDownPack,
  UpMiddleDownPack,
} from "./setup";
import editQuestion from "@/libs/camp/editQuestion";
import getAllQuestion from "@/libs/camp/getAllQuestion";
import Waiting from "./Waiting";
import React from "react";
import deleteChoiceQuestion from "@/libs/camp/deleteChoiceQuestion";
import deleteTextQuestion from "@/libs/camp/deleteTextQuestion";
import AllInOneLock from "./AllInOneLock";
import Pusher from "pusher-js";
interface QuestionReady {
  element: React.ReactNode;
  order: number;
}
interface GetAllQuestionReady {
  choiceIds: (Id | null)[];
  choiceQuestions: string[];
  as: string[];
  bs: string[];
  cs: string[];
  ds: string[];
  es: string[];
  scoreAs: [number[]];
  scoreBs: [number[]];
  scoreCs: [number[]];
  scoreDs: [number[]];
  scoreEs: [number[]];
  corrects: (Choice | "-")[];
  choiceOrder: number[];
  textQuestions: [string[]];
  textIds: [(Id | null)[]];
  scores: [number[]];
  textOrder: [number[]];
}

export default function UpdateCampClient({
  baans,
  camp,
  parts,
  remainPartName,
  questions,
  systemInfo,
}: {
  baans: BasicBaan[];
  camp: InterCampFront;
  parts: BasicPart[];
  remainPartName: MyMap[];
  questions: GetAllQuestion;
  systemInfo: SystemInfo;
}) {
  const { data: session } = useSession();
  if (!session) {
    return <BackToHome />;
  }
  type EditMode = "normal" | "edit" | "delete" | "wait";
  const [editMode, setEditMode] = useState<EditMode>("normal");
  const router = useRouter();
  const [newBaanName, setNewBaanName] = useState<string | null>(null);
  const [registerSheetLink, setRegisterSheetLink] = useState<string | null>(
    camp.registerSheetLink
  );
  const [link, setLink] = useState<string | null>(camp.link);
  const pictureUrls = useState<(string | null)[]>(camp.pictureUrls);
  const [logoUrl, setLogoUrl] = useState<string | null>(camp.logoUrl);
  const [nongDataLock, setDataLock] = useState<boolean>(camp.nongDataLock);
  const [peeLock, setPeeLock] = useState<boolean>(!camp.peeLock);
  const [lockChangePickup, setLockChangePickup] = useState<boolean>(
    camp.lockChangePickup
  );
  const [allDone, setAllDone] = useState<boolean>(camp.allDone);
  const [dateStart, setDateStart] = useState<Dayjs | null>(
    dayjs(camp.dateStart)
  );
  const [dateEnd, setDateEnd] = useState<Dayjs | null>(dayjs(camp.dateEnd));
  const [groupName, setGroupName] = useState<string>(camp.groupName);
  const [peeDataLock, setPeeDataLock] = useState<boolean>(camp.peeDataLock);
  const [petoDataLock, setPetoDataLock] = useState<boolean>(camp.petoDataLock);
  const [haveCloth, setHaveCloth] = useState<boolean>(camp.haveCloth);
  const [showCorrectAnswerAndScore, setShowCorrectAnswerAndScore] = useState(
    camp.showCorrectAnswerAndScore
  );
  const [
    { up: lockChangeQuestion, middle: canAnswerTheQuestion, down: open },
    set,
  ] = useState<UpMiddleDownPack>({
    up: camp.lockChangeQuestion,
    middle: camp.canAnswerTheQuestion,
    down: camp.open,
  });
  const setLockChangeQuestionCanAnswerTheQuestionOpenPack=new SetUpMiddleDownPack(set)
  const [canNongSeeAllAnswer, setCanNongSeeAllAnswer] = useState(
    camp.canNongSeeAllAnswer
  );
  const [canNongSeeAllActionPlan, setCanNongSeeAllActionPlan] = useState(
    camp.canNongSeeAllActionPlan
  );
  const [canNongSeeAllTrackingSheet, setCanNongSeeAllTrackingSheet] = useState(
    camp.canNongSeeAllTrackingSheet
  );
  const [canNongAccessDataWithRoleNong, setCanNongAccessDataWithRoleNong] =
    useState(camp.canNongAccessDataWithRoleNong);
  const [choiceIds, setChoiceIds] = useState<(Id | null)[]>(
    questions.choices.map((choice) => choice._id)
  );
  const [choiceQuestions, setChoiceQuestions] = useState(
    questions.choices.map((choice) => choice.question)
  );
  const [as, setAs] = useState(questions.choices.map((choice) => choice.a));
  const [bs, setBs] = useState(questions.choices.map((choice) => choice.b));
  const [cs, setCs] = useState(questions.choices.map((choice) => choice.c));
  const [ds, setDs] = useState(questions.choices.map((choice) => choice.d));
  const [es, setEs] = useState(questions.choices.map((choice) => choice.e));
  const scoreAs = useState(questions.choices.map((choice) => choice.scoreA));
  const scoreBs = useState(questions.choices.map((choice) => choice.scoreB));
  const scoreCs = useState(questions.choices.map((choice) => choice.scoreC));
  const scoreDs = useState(questions.choices.map((choice) => choice.scoreD));
  const scoreEs = useState(questions.choices.map((choice) => choice.scoreE));
  const [corrects, setCorrect] = useState<(Choice | "-")[]>(
    questions.choices.map((choice) => choice.correct)
  );
  const [choiceOrder, setChoiceOrder] = useState(
    questions.choices.map((choice) => choice.order)
  );
  const textQuestions = useState(questions.texts.map((text) => text.question));
  const textIds = useState<(Id | null)[]>(
    questions.texts.map((text) => text._id)
  );
  const [deleteTextIds, setDeleteTextIds] = useState<Id[]>([]);
  const [deleteChoiceIds, setDeleteChoiceIds] = useState<Id[]>([]);
  const scores = useState(questions.texts.map((text) => text.score));
  const textOrder = useState(questions.texts.map((text) => text.order));
  const isHaveNongInGeneralRoleNong =
    camp.memberStructure == "nong->highSchool,pee->1year,peto->2upYear" ||
    camp.memberStructure == "nong->highSchool,pee->2upYear" ||
    camp.memberStructure == "nong->highSchool,pee->allYear";

  function questionReady(
    isDelete: boolean,
    data: GetAllQuestionReady
  ): QuestionReady[] {
    return data.choiceQuestions
      .map((choice, i) => {
        return {
          element: (
            <>
              <div>{choice}</div>
              <Select
                variant="standard"
                name="location"
                id="location"
                className="h-[2em] w-[200px] mb-5 text-white"
              >
                <MenuItem value={`${data.as[i]} คะแนน ${data.scoreAs[0][i]}`}>
                  {data.as[i]} คะแนน {data.scoreAs[0][i]}
                </MenuItem>
                <MenuItem value={`${data.bs[i]} คะแนน ${data.scoreBs[0][i]}`}>
                  {data.bs[i]} คะแนน {data.scoreBs[0][i]}
                </MenuItem>
                <MenuItem value={`${data.cs[i]} คะแนน ${data.scoreCs[0][i]}`}>
                  {data.cs[i]} คะแนน {data.scoreCs[0][i]}
                </MenuItem>
                <MenuItem value={`${data.ds[i]} คะแนน ${data.scoreDs[0][i]}`}>
                  {data.ds[i]} คะแนน {data.scoreDs[0][i]}
                </MenuItem>
                <MenuItem value={`${data.es[i]} คะแนน ${data.scoreEs[0][i]}`}>
                  {data.es[i]} คะแนน {data.scoreEs[0][i]}
                </MenuItem>
              </Select>
              {deleteChoiceIds.length}
              {isDelete ? (
                <Checkbox
                  onChange={setSwop(data.choiceIds[i], setDeleteChoiceIds)}
                />
              ) : null}
            </>
          ),
          order: data.choiceOrder[i],
        };
      })
      .concat(
        data.textQuestions[0].map((text, i) => ({
          element: (
            <div className="flex flex-row items-center mt-4">
              <label
                className="w-2/5 text-2xl text-white"
                style={{
                  textAlign: "left",
                }}
              >
                {text} คะแนน {data.scores[0][i]}
              </label>
              {deleteTextIds.length}
              {isDelete ? (
                <Checkbox
                  onChange={setSwop(data.textIds[0][i], setDeleteTextIds)}
                />
              ) : null}
            </div>
          ),
          order: data.textOrder[0][i],
        }))
      )
      .sort((a, b) => a.order - b.order);
  }
  const [preview, setPreview] = useState<React.ReactNode>(
    questionReady(false, {
      choiceIds,
      choiceQuestions,
      as,
      bs,
      cs,
      ds,
      es,
      scoreAs: [scoreAs[0]],
      scoreBs: [scoreBs[0]],
      scoreCs: [scoreCs[0]],
      scoreDs: [scoreDs[0]],
      scoreEs: [scoreEs[0]],
      corrects,
      choiceOrder,
      textQuestions: [textQuestions[0]],
      textIds: [textIds[0]],
      scores: [scores[0]],
      textOrder: [textOrder[0]],
    }).map((v) => v.element)
  );
  const [deletePreview, setDeletePreview] = useState<React.ReactNode>(
    questionReady(true, {
      choiceIds,
      choiceQuestions,
      as,
      bs,
      cs,
      ds,
      es,
      scoreAs: [scoreAs[0]],
      scoreBs: [scoreBs[0]],
      scoreCs: [scoreCs[0]],
      scoreDs: [scoreDs[0]],
      scoreEs: [scoreEs[0]],
      corrects,
      choiceOrder,
      textQuestions: [textQuestions[0]],
      textIds: [textIds[0]],
      scores: [scores[0]],
      textOrder: [textOrder[0]],
    }).map((v) => v.element)
  );
  function safeToDeleteTextQuestion() {
    if (textIds[0][textIds[0].length - 1]) {
      return;
    }
    textQuestions[1](removeElementInUseStateArray);
    textIds[1](removeElementInUseStateArray);
    scores[1](removeElementInUseStateArray);
    textOrder[1](removeElementInUseStateArray);
  }
  function safeToDeleteChoiceQuestion() {
    if (choiceIds[choiceIds.length - 1]) {
      return;
    }
    setChoiceIds(removeElementInUseStateArray);
    setChoiceQuestions(removeElementInUseStateArray);
    setAs(removeElementInUseStateArray);
    setBs(removeElementInUseStateArray);
    setCs(removeElementInUseStateArray);
    setDs(removeElementInUseStateArray);
    setEs(removeElementInUseStateArray);
    scoreAs[1](removeElementInUseStateArray);
    scoreBs[1](removeElementInUseStateArray);
    scoreCs[1](removeElementInUseStateArray);
    scoreDs[1](removeElementInUseStateArray);
    scoreEs[1](removeElementInUseStateArray);
    setCorrect(removeElementInUseStateArray);
    setChoiceOrder(removeElementInUseStateArray);
  }
  function addTextQuestion() {
    textIds[1](addItemInUseStateArray<Id | null>(null));
    textQuestions[1](addItemInUseStateArray("-"));
    scores[1](addItemInUseStateArray(0));
    textOrder[1](addItemInUseStateArray(0));
  }
  function addChoiceQuestion() {
    setChoiceIds(addItemInUseStateArray<Id | null>(null));
    setChoiceQuestions(addItemInUseStateArray("-"));
    setAs(addItemInUseStateArray("-"));
    setBs(addItemInUseStateArray("-"));
    setCs(addItemInUseStateArray("-"));
    setDs(addItemInUseStateArray("-"));
    setEs(addItemInUseStateArray("-"));
    scoreAs[1](addItemInUseStateArray(0));
    scoreBs[1](addItemInUseStateArray(0));
    scoreCs[1](addItemInUseStateArray(0));
    scoreDs[1](addItemInUseStateArray(0));
    scoreEs[1](addItemInUseStateArray(0));
    setCorrect(addItemInUseStateArray<Choice | "-">("-"));
    setChoiceOrder(addItemInUseStateArray(0));
  }
  function clearAllCache() {
    setChoiceIds(questions.choices.map((choice) => choice._id));
    setChoiceQuestions(questions.choices.map((choice) => choice.question));
    setAs(questions.choices.map((choice) => choice.a));
    setBs(questions.choices.map((choice) => choice.b));
    setCs(questions.choices.map((choice) => choice.c));
    setDs(questions.choices.map((choice) => choice.d));
    setEs(questions.choices.map((choice) => choice.e));
    scoreAs[1](questions.choices.map((choice) => choice.scoreA));
    scoreBs[1](questions.choices.map((choice) => choice.scoreB));
    scoreCs[1](questions.choices.map((choice) => choice.scoreC));
    scoreDs[1](questions.choices.map((choice) => choice.scoreD));
    scoreEs[1](questions.choices.map((choice) => choice.scoreE));
    setCorrect(questions.choices.map((choice) => choice.correct));
    setChoiceOrder(questions.choices.map((choice) => choice.order));
    textQuestions[1](questions.texts.map((text) => text.question));
    textIds[1](questions.texts.map((text) => text._id));
    scores[1](questions.texts.map((text) => text.score));
    textOrder[1](questions.texts.map((text) => text.order));
  }
  async function update() {
    if (!session) {
      router.push("/");
      return;
    }
    await editQuestion(
      {
        texts: textIds[0].map((_id, i) => ({
          _id,
          question: textQuestions[0][i],
          score: scores[0][i],
          order: textOrder[0][i],
        })),
        choices: choiceIds.map((_id, i) => ({
          _id,
          question: choiceQuestions[i],
          a: as[i],
          b: bs[i],
          c: cs[i],
          d: ds[i],
          e: es[i],
          scoreA: scoreAs[0][i],
          scoreB: scoreBs[0][i],
          scoreC: scoreCs[0][i],
          scoreD: scoreDs[0][i],
          scoreE: scoreEs[0][i],
          correct: corrects[i],
          order: choiceOrder[i],
        })),
        campId: camp._id,
      },
      session.user.token
    );
    const newQuestions = await getAllQuestion(session.user.token, camp._id);
    setChoiceIds(newQuestions.choices.map((choice) => choice._id));
    setChoiceQuestions(newQuestions.choices.map((choice) => choice.question));
    setAs(newQuestions.choices.map((choice) => choice.a));
    setBs(newQuestions.choices.map((choice) => choice.b));
    setCs(newQuestions.choices.map((choice) => choice.c));
    setDs(newQuestions.choices.map((choice) => choice.d));
    setEs(newQuestions.choices.map((choice) => choice.e));
    scoreAs[1](newQuestions.choices.map((choice) => choice.scoreA));
    scoreBs[1](newQuestions.choices.map((choice) => choice.scoreB));
    scoreCs[1](newQuestions.choices.map((choice) => choice.scoreC));
    scoreDs[1](newQuestions.choices.map((choice) => choice.scoreD));
    scoreEs[1](newQuestions.choices.map((choice) => choice.scoreE));
    setCorrect(newQuestions.choices.map((choice) => choice.correct));
    setChoiceOrder(newQuestions.choices.map((choice) => choice.order));
    textQuestions[1](newQuestions.texts.map((text) => text.question));
    textIds[1](newQuestions.texts.map((text) => text._id));
    scores[1](newQuestions.texts.map((text) => text.score));
    textOrder[1](newQuestions.texts.map((text) => text.order));
    setPreview(
      questionReady(false, {
        choiceIds: newQuestions.choices.map((choice) => choice._id),
        choiceQuestions: newQuestions.choices.map((choice) => choice.question),
        as: newQuestions.choices.map((choice) => choice.a),
        bs: newQuestions.choices.map((choice) => choice.b),
        cs: newQuestions.choices.map((choice) => choice.c),
        ds: newQuestions.choices.map((choice) => choice.d),
        es: newQuestions.choices.map((choice) => choice.e),
        scoreAs: [newQuestions.choices.map((choice) => choice.scoreA)],
        scoreBs: [newQuestions.choices.map((choice) => choice.scoreB)],
        scoreCs: [newQuestions.choices.map((choice) => choice.scoreC)],
        scoreDs: [newQuestions.choices.map((choice) => choice.scoreD)],
        scoreEs: [newQuestions.choices.map((choice) => choice.scoreE)],
        corrects: newQuestions.choices.map((choice) => choice.correct),
        choiceOrder: newQuestions.choices.map((choice) => choice.order),
        textQuestions: [newQuestions.texts.map((text) => text.question)],
        textIds: [newQuestions.texts.map((text) => text._id)],
        scores: [newQuestions.texts.map((text) => text.score)],
        textOrder: [newQuestions.texts.map((text) => text.order)],
      }).map((v) => v.element)
    );
    setDeletePreview(
      questionReady(true, {
        choiceIds: newQuestions.choices.map((choice) => choice._id),
        choiceQuestions: newQuestions.choices.map((choice) => choice.question),
        as: newQuestions.choices.map((choice) => choice.a),
        bs: newQuestions.choices.map((choice) => choice.b),
        cs: newQuestions.choices.map((choice) => choice.c),
        ds: newQuestions.choices.map((choice) => choice.d),
        es: newQuestions.choices.map((choice) => choice.e),
        scoreAs: [newQuestions.choices.map((choice) => choice.scoreA)],
        scoreBs: [newQuestions.choices.map((choice) => choice.scoreB)],
        scoreCs: [newQuestions.choices.map((choice) => choice.scoreC)],
        scoreDs: [newQuestions.choices.map((choice) => choice.scoreD)],
        scoreEs: [newQuestions.choices.map((choice) => choice.scoreE)],
        corrects: newQuestions.choices.map((choice) => choice.correct),
        choiceOrder: newQuestions.choices.map((choice) => choice.order),
        textQuestions: [newQuestions.texts.map((text) => text.question)],
        textIds: [newQuestions.texts.map((text) => text._id)],
        scores: [newQuestions.texts.map((text) => text.score)],
        textOrder: [newQuestions.texts.map((text) => text.order)],
      }).map((v) => v.element)
    );
    setEditMode("normal");
  }
  async function deleteQuestion() {
    if (!session) {
      router.push("/");
      return;
    }
    setEditMode("wait");
    let i = 0;
    while (i < deleteChoiceIds.length) {
      await deleteChoiceQuestion(deleteChoiceIds[i++], session.user.token);
    }
    i = 0;
    while (i < deleteTextIds.length) {
      await deleteTextQuestion(deleteTextIds[i++], session.user.token);
    }
    setDeleteChoiceIds([]);
    setDeleteTextIds([]);
    const newQuestions = await getAllQuestion(session.user.token, camp._id);
    setChoiceIds(newQuestions.choices.map((choice) => choice._id));
    setChoiceQuestions(newQuestions.choices.map((choice) => choice.question));
    setAs(newQuestions.choices.map((choice) => choice.a));
    setBs(newQuestions.choices.map((choice) => choice.b));
    setCs(newQuestions.choices.map((choice) => choice.c));
    setDs(newQuestions.choices.map((choice) => choice.d));
    setEs(newQuestions.choices.map((choice) => choice.e));
    scoreAs[1](newQuestions.choices.map((choice) => choice.scoreA));
    scoreBs[1](newQuestions.choices.map((choice) => choice.scoreB));
    scoreCs[1](newQuestions.choices.map((choice) => choice.scoreC));
    scoreDs[1](newQuestions.choices.map((choice) => choice.scoreD));
    scoreEs[1](newQuestions.choices.map((choice) => choice.scoreE));
    setCorrect(newQuestions.choices.map((choice) => choice.correct));
    setChoiceOrder(newQuestions.choices.map((choice) => choice.order));
    textQuestions[1](newQuestions.texts.map((text) => text.question));
    textIds[1](newQuestions.texts.map((text) => text._id));
    scores[1](newQuestions.texts.map((text) => text.score));
    textOrder[1](newQuestions.texts.map((text) => text.order));
    setPreview(
      questionReady(false, {
        choiceIds: newQuestions.choices.map((choice) => choice._id),
        choiceQuestions: newQuestions.choices.map((choice) => choice.question),
        as: newQuestions.choices.map((choice) => choice.a),
        bs: newQuestions.choices.map((choice) => choice.b),
        cs: newQuestions.choices.map((choice) => choice.c),
        ds: newQuestions.choices.map((choice) => choice.d),
        es: newQuestions.choices.map((choice) => choice.e),
        scoreAs: [newQuestions.choices.map((choice) => choice.scoreA)],
        scoreBs: [newQuestions.choices.map((choice) => choice.scoreB)],
        scoreCs: [newQuestions.choices.map((choice) => choice.scoreC)],
        scoreDs: [newQuestions.choices.map((choice) => choice.scoreD)],
        scoreEs: [newQuestions.choices.map((choice) => choice.scoreE)],
        corrects: newQuestions.choices.map((choice) => choice.correct),
        choiceOrder: newQuestions.choices.map((choice) => choice.order),
        textQuestions: [newQuestions.texts.map((text) => text.question)],
        textIds: [newQuestions.texts.map((text) => text._id)],
        scores: [newQuestions.texts.map((text) => text.score)],
        textOrder: [newQuestions.texts.map((text) => text.order)],
      }).map((v) => v.element)
    );
    setDeletePreview(
      questionReady(true, {
        choiceIds: newQuestions.choices.map((choice) => choice._id),
        choiceQuestions: newQuestions.choices.map((choice) => choice.question),
        as: newQuestions.choices.map((choice) => choice.a),
        bs: newQuestions.choices.map((choice) => choice.b),
        cs: newQuestions.choices.map((choice) => choice.c),
        ds: newQuestions.choices.map((choice) => choice.d),
        es: newQuestions.choices.map((choice) => choice.e),
        scoreAs: [newQuestions.choices.map((choice) => choice.scoreA)],
        scoreBs: [newQuestions.choices.map((choice) => choice.scoreB)],
        scoreCs: [newQuestions.choices.map((choice) => choice.scoreC)],
        scoreDs: [newQuestions.choices.map((choice) => choice.scoreD)],
        scoreEs: [newQuestions.choices.map((choice) => choice.scoreE)],
        corrects: newQuestions.choices.map((choice) => choice.correct),
        choiceOrder: newQuestions.choices.map((choice) => choice.order),
        textQuestions: [newQuestions.texts.map((text) => text.question)],
        textIds: [newQuestions.texts.map((text) => text._id)],
        scores: [newQuestions.texts.map((text) => text.score)],
        textOrder: [newQuestions.texts.map((text) => text.order)],
      }).map((v) => v.element)
    );
    setEditMode("normal");
  }

  React.useEffect(() => {
    const pusherData = questions.pusherData;
    if (!pusherData) {
      return;
    }
    const pusher = new Pusher(pusherData.first, pusherData.second);
    const textChanel = pusher.subscribe(
      `${systemInfo.textQuestionText}${camp._id}`
    );
    const choiceChanel = pusher.subscribe(
      `${systemInfo.choiceQuestionText}${camp._id}`
    );
    textChanel.bind(systemInfo.newText, (event: TriggerTextQuestion) => {
      textIds[1](addItemInUseStateArray<Id | null>(event._id));
      textQuestions[1](addItemInUseStateArray(event.question));
      scores[1](addItemInUseStateArray(event.score));
      textOrder[1](addItemInUseStateArray(event.order));
    });
    textChanel.bind(systemInfo.updateText, (event: TriggerTextQuestion) => {
      textIds[0].forEach((id, i) => {
        if (!id) {
          return;
        }
        if (event._id.toString() == id.toString()) {
          setMap(
            textQuestions[1],
            modifyElementInUseStateArray(i)
          )(event.question);
          setMap(scores[1], modifyElementInUseStateArray(i))(event.score);
          setMap(textOrder[1], modifyElementInUseStateArray(i))(event.order);
        }
      });
    });
    choiceChanel.bind(systemInfo.newText, (event: TriggerChoiceQuestion) => {
      setChoiceIds(addItemInUseStateArray<Id | null>(event._id));
      setChoiceQuestions(addItemInUseStateArray(event.question));
      setAs(addItemInUseStateArray(event.a));
      setBs(addItemInUseStateArray(event.b));
      setCs(addItemInUseStateArray(event.c));
      setDs(addItemInUseStateArray(event.d));
      setEs(addItemInUseStateArray(event.e));
      scoreAs[1](addItemInUseStateArray(event.scoreA));
      scoreBs[1](addItemInUseStateArray(event.scoreB));
      scoreCs[1](addItemInUseStateArray(event.scoreC));
      scoreDs[1](addItemInUseStateArray(event.scoreD));
      scoreEs[1](addItemInUseStateArray(event.scoreE));
      setCorrect(addItemInUseStateArray(event.correct));
      setChoiceOrder(addItemInUseStateArray(event.order));
    });
    choiceChanel.bind(systemInfo.updateText, (event: TriggerChoiceQuestion) => {
      choiceIds.forEach((id, i) => {
        if (!id) {
          return;
        }
        if (id.toString() == event._id.toString()) {
          setMap(
            setChoiceQuestions,
            modifyElementInUseStateArray(i)
          )(event.question);
          setMap(setAs, modifyElementInUseStateArray(i))(event.a);
          setMap(setBs, modifyElementInUseStateArray(i))(event.b);
          setMap(setCs, modifyElementInUseStateArray(i))(event.c);
          setMap(setDs, modifyElementInUseStateArray(i))(event.d);
          setMap(setEs, modifyElementInUseStateArray(i))(event.e);
          setMap(scoreAs[1], modifyElementInUseStateArray(i))(event.scoreA);
          setMap(scoreBs[1], modifyElementInUseStateArray(i))(event.scoreB);
          setMap(scoreCs[1], modifyElementInUseStateArray(i))(event.scoreC);
          setMap(scoreDs[1], modifyElementInUseStateArray(i))(event.scoreD);
          setMap(scoreEs[1], modifyElementInUseStateArray(i))(event.scoreE);
          setMap(setCorrect, modifyElementInUseStateArray(i))(event.correct);
          setMap(setChoiceOrder, modifyElementInUseStateArray(i))(event.order);
        }
      });
    });
    return () => {
      textChanel.unbind_all();
      choiceChanel.unbind_all();
      textChanel.unsubscribe();
      choiceChanel.unsubscribe();
    };
  });
  switch (editMode) {
    case "normal": {
      return (
        <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
          <div>บ้าน</div>
          {baans.map((baan, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  router.push(`/admin/baan/${baan._id}`);
                }}
              >
                {baan.name}
              </div>
            );
          })}
          <div>ฝ่าย</div>
          {parts.map((part, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  router.push(`/admin/part/${part._id}`);
                }}
              >
                {part.partName}
              </div>
            );
          })}
          <div
            className="text-4xl font-bold"
            style={{
              color: "#961A1D",
            }}
          >
            Update Camp
          </div>
          <div
            className="w-[30%] items-center p-10 rounded-3xl "
            style={{
              backgroundColor: "#961A1D",
              width: "70%",
              marginTop: "20px",
            }}
          >
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-white">ชื่อบ้านใหม่</label>
              <TextField
                name="Tel"
                id="Tel"
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
                onChange={setTextToString(setNewBaanName)}
                defaultValue={null}
              />
            </div>
            <FinishButton
              text="สร้างบ้านจากกรุ๊ป"
              onClick={() => {
                createBaanByGroup(camp._id, session.user.token);
              }}
            />
            <FinishButton
              text="สร้างบ้าน"
              onClick={() => {
                if (newBaanName) {
                  addBaan(newBaanName, camp._id, session.user.token);
                }
              }}
            />
            <SelectTemplate
              mapIn={remainPartName}
              select={(e: Id) => {
                addPart(e, camp._id, session.user.token);
              }}
              buttonText="สร้างฝ่าย"
            />
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-white">
                link ใบสมัคร ถ้าไม่ต้องการให้ใส่ id ตามหลังให้ใส่ ~ ตามหลัง link
                ด้วย
              </label>
              <TextField
                name="Tel"
                id="Tel"
                type="url"
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
                onChange={setTextToString(setRegisterSheetLink)}
                value={registerSheetLink}
              />
            </div>
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-white">
                link frontend รอง
              </label>
              <TextField
                name="Email"
                id="Email"
                type="url"
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
                onChange={setTextToString(setLink)}
                value={link}
              />
            </div>
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-white">link รูปภาพ</label>
              {pictureUrls[0].map((pictureUrl, i) => (
                <div key={i}>
                  <TypingImageSource
                    onChange={setMap(
                      pictureUrls[1],
                      modifyElementInUseStateArray(i)
                    )}
                    defaultSrc={pictureUrl}
                  />
                </div>
              ))}
            </div>
            <FinishButton
              text="add photo"
              onClick={() => {
                pictureUrls[1]([...pictureUrls[0], null]);
              }}
            />
            <FinishButton
              text="remove photo"
              onClick={() => {
                pictureUrls[1](removeElementInUseStateArray);
              }}
            />
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-white">link logo</label>
              <TypingImageSource defaultSrc={logoUrl} onChange={setLogoUrl} />
            </div>
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-white">
                คำเรียกชื่อกลุ่ม
              </label>
              <TextField
                name="Tel"
                id="Tel"
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
                onChange={setTextToString(setGroupName)}
                value={groupName}
              />
            </div>
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-white">
                ล็อกข้อมูลน้องหรือไม่
              </label>
              <Checkbox
                sx={{
                  "&.Mui-checked": {
                    color: "#FFFFFF", // Custom color when checked
                  },
                }}
                onChange={setBoolean(setDataLock)}
                checked={nongDataLock}
              />
            </div>
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-white">
                ล็อกข้อมูลพี่บ้านหรือไม่
              </label>
              <Checkbox
                sx={{
                  "&.Mui-checked": {
                    color: "#FFFFFF", // Custom color when checked
                  },
                }}
                onChange={setBoolean(setPeeDataLock)}
                checked={peeDataLock}
              />
            </div>
            {camp.memberStructure ===
            "nong->highSchool,pee->1year,peto->2upYear" ? (
              <div className="flex flex-row items-center my-5">
                <label className="w-2/5 text-2xl text-white">
                  ล็อกข้อมูลปีโตหรือไม่
                </label>
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "#FFFFFF", // Custom color when checked
                    },
                  }}
                  onChange={setBoolean(setPetoDataLock)}
                  checked={petoDataLock}
                />
              </div>
            ) : null}
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-white">
                เปิดให้น้องค่ายลงทะเบียนหรือไม่
              </label>
              <Checkbox
                sx={{
                  "&.Mui-checked": {
                    color: "#FFFFFF", // Custom color when checked
                  },
                }}
                onChange={setLockChangeQuestionCanAnswerTheQuestionOpenPack.setDown()}
                checked={open}
              />
            </div>
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-white">
                เปิดให้พี่{groupName}ลงทะเบียนหรือไม่
              </label>
              <Checkbox
                sx={{
                  "&.Mui-checked": {
                    color: "#FFFFFF", // Custom color when checked
                  },
                }}
                onChange={setBoolean(setPeeLock)}
                checked={peeLock}
              />
            </div>
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-white">
                มีเสื้อแจกหรือไม่
              </label>
              <Checkbox
                sx={{
                  "&.Mui-checked": {
                    color: "#FFFFFF", // Custom color when checked
                  },
                }}
                onChange={setBoolean(setHaveCloth)}
                checked={haveCloth}
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
            <div className="flex flex-row justify-end"></div>
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-white">
                ล็อกข้อมูลการรับเสื้อของพี่บ้านหรือไม่
              </label>
              <Checkbox
                sx={{
                  "&.Mui-checked": {
                    color: "#FFFFFF", // Custom color when checked
                  },
                }}
                onChange={(e, state) => {
                  setLockChangePickup(state);
                }}
                checked={lockChangePickup}
              />
            </div>
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-white">
                เปิดให้ตอบคำถามหรือไม่
              </label>
              <Checkbox
                sx={{
                  "&.Mui-checked": {
                    color: "#FFFFFF", // Custom color when checked
                  },
                }}
                onChange={setLockChangeQuestionCanAnswerTheQuestionOpenPack.setMiddle()}
                checked={canAnswerTheQuestion}
              />
            </div>
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-white">
                ล็อกการเปลี่ยนโจทย์หรือไม่
              </label>
              <Checkbox
                sx={{
                  "&.Mui-checked": {
                    color: "#FFFFFF", // Custom color when checked
                  },
                }}
                onChange={setLockChangeQuestionCanAnswerTheQuestionOpenPack.setUp()}
                checked={lockChangeQuestion}
              />
            </div>
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-white">
                ค่ายเสร็จหรือยัง
              </label>
              <Checkbox
                sx={{
                  "&.Mui-checked": {
                    color: "#FFFFFF", // Custom color when checked
                  },
                }}
                onChange={setBoolean(setAllDone)}
                checked={allDone}
              />
            </div>
            <AllInOneLock
              token={session.user.token}
              bypass={camp.canNongAccessDataWithRoleNong}
            >
              <div className="flex flex-row items-center my-5">
                <label className="w-2/5 text-2xl text-white">
                  อนุญาติให้น้องค่ายดูคำตอบทั้งหมดหรือไม่
                </label>
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "#FFFFFF", // Custom color when checked
                    },
                  }}
                  onChange={setBoolean(setCanNongSeeAllAnswer)}
                  checked={allDone}
                />
              </div>
              <div className="flex flex-row items-center my-5">
                <label className="w-2/5 text-2xl text-white">
                  อนุญาติให้น้องค่ายดู action plan ทั้งหมดหรือไม่
                </label>
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "#FFFFFF", // Custom color when checked
                    },
                  }}
                  onChange={setBoolean(setCanNongSeeAllActionPlan)}
                  checked={allDone}
                />
              </div>
              <div className="flex flex-row items-center my-5">
                <label className="w-2/5 text-2xl text-white">
                  อนุญาติให้น้องค่ายดู tracking sheet ทั้งหมดหรือไม่
                </label>
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "#FFFFFF", // Custom color when checked
                    },
                  }}
                  onChange={setBoolean(setCanNongSeeAllTrackingSheet)}
                  checked={allDone}
                />
              </div>
              {isHaveNongInGeneralRoleNong ? (
                <div className="flex flex-row items-center my-5">
                  <label className="w-2/5 text-2xl text-white">
                    อนุญาติให้น้องค่ายดูข้อมูลค่ายเบื้องหลังโดยบทบาททั่วไปยังเป็นน้องหรือไม่
                  </label>
                  <Checkbox
                    sx={{
                      "&.Mui-checked": {
                        color: "#FFFFFF", // Custom color when checked
                      },
                    }}
                    onChange={setBoolean((c) => {
                      setCanNongAccessDataWithRoleNong(
                        c &&
                          (canNongSeeAllActionPlan ||
                            canNongSeeAllTrackingSheet)
                      );
                    })}
                    checked={allDone}
                  />
                </div>
              ) : null}
            </AllInOneLock>
            <div className=" rounded-lg ">
              <div
                style={{
                  color: "white",
                }}
              >
                วันเริ่มค่าย
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  className="bg-white m-10 rounded-2xl"
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
                  value={dateStart}
                  onChange={setDateStart}
                  disablePast
                />
              </LocalizationProvider>
            </div>
            <div className=" rounded-lg ">
              <div
                style={{
                  color: "white",
                }}
              >
                วันจบค่าย
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  className="bg-white m-10 rounded-2xl"
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
                  value={dateEnd}
                  onChange={setDateEnd}
                  disablePast
                />
              </LocalizationProvider>
            </div>
            {preview}
            <div className="flex flex-row justify-end">
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
              <button
                className="bg-white p-3 font-bold rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
                style={{
                  color: "#961A1D",
                }}
                onClick={() => {
                  if (dateStart && dateEnd && dateStart.isBefore(dateEnd)) {
                    try {
                      updateCamp(
                        {
                          link,
                          lockChangePickup,
                          logoUrl,
                          peeLock: !peeLock,
                          nongDataLock,
                          dateEnd: dateEnd.toDate(),
                          dateStart: dateStart.toDate(),
                          pictureUrls: pictureUrls[0].filter(notEmpty),
                          open,
                          allDone,
                          registerSheetLink,
                          groupName,
                          peeDataLock,
                          petoDataLock,
                          haveCloth,
                          showCorrectAnswerAndScore,
                          canAnswerTheQuestion,
                          canNongSeeAllAnswer,
                          canNongSeeAllActionPlan,
                          canNongSeeAllTrackingSheet,
                          canNongAccessDataWithRoleNong,
                          lockChangeQuestion,
                        },
                        camp._id,
                        session.user.token
                      );
                    } catch (error) {
                      console.log(error);
                    }
                  } else {
                    alert("Please type in all the details!");
                  }
                }}
              >
                update all
              </button>
              <FinishButton
                text="delete"
                onClick={() => saveDeleteCamp(camp._id, session.user.token)}
              />
            </div>
          </div>
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
          {choiceIds.map((v, i) => {
            function getChooseChoice(input: Choice | "-"): string {
              let chooseChoice: string;
              switch (input) {
                case "A": {
                  chooseChoice = `${as[i]} คะแนน ${scoreAs[0][i]}`;
                  break;
                }
                case "B": {
                  chooseChoice = `${bs[i]} คะแนน ${scoreBs[0][i]}`;
                  break;
                }
                case "C": {
                  chooseChoice = `${cs[i]} คะแนน ${scoreCs[0][i]}`;
                  break;
                }
                case "D": {
                  chooseChoice = `${ds[i]} คะแนน ${scoreDs[0][i]}`;
                  break;
                }
                case "E": {
                  chooseChoice = `${es[i]} คะแนน ${scoreEs[0][i]}`;
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
                    onChange={setTextToString(
                      setMap(
                        setChoiceQuestions,
                        modifyElementInUseStateArray(i)
                      ),
                      true
                    )}
                    value={choiceQuestions[i]}
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
                    onChange={setTextToString(
                      setMap(setAs, modifyElementInUseStateArray(i)),
                      true
                    )}
                    value={as[i]}
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
                    onChange={setTextToString(
                      setMap(setBs, modifyElementInUseStateArray(i)),
                      true
                    )}
                    value={bs[i]}
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
                    onChange={setTextToString(
                      setMap(setCs, modifyElementInUseStateArray(i)),
                      true
                    )}
                    value={cs[i]}
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
                    onChange={setTextToString(
                      setMap(setDs, modifyElementInUseStateArray(i)),
                      true
                    )}
                    value={ds[i]}
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
                    onChange={setTextToString(
                      setMap(setEs, modifyElementInUseStateArray(i)),
                      true
                    )}
                    value={es[i]}
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
                    onChange={setTextToFloat(
                      setMap(scoreAs[1], modifyElementInUseStateArray(i))
                    )}
                    defaultValue={scoreAs[0][i]}
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
                    onChange={setTextToFloat(
                      setMap(scoreBs[1], modifyElementInUseStateArray(i))
                    )}
                    defaultValue={scoreBs[0][i]}
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
                    onChange={setTextToFloat(
                      setMap(scoreCs[1], modifyElementInUseStateArray(i))
                    )}
                    defaultValue={scoreCs[0][i]}
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
                    onChange={setTextToFloat(
                      setMap(scoreDs[1], modifyElementInUseStateArray(i))
                    )}
                    defaultValue={scoreDs[0][i]}
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
                    onChange={setTextToFloat(
                      setMap(scoreEs[1], modifyElementInUseStateArray(i))
                    )}
                    defaultValue={scoreEs[0][i]}
                  />
                </div>
                <div>เลือกตัวเลือกที่ถูกต้อง</div>
                <Select
                  defaultValue={`${corrects[i]} ${getChooseChoice(
                    corrects[i]
                  )}`}
                  variant="standard"
                  name="location"
                  id="location"
                  className="h-[2em] w-[200px] mb-5 text-white"
                  value={`${corrects[i]} ${getChooseChoice(corrects[i])}`}
                >
                  <MenuItem
                    onClick={() => {
                      setMap(setCorrect, modifyElementInUseStateArray(i))("A");
                    }}
                    value={`A ${as[i]} คะแนน ${scoreAs[0][i]}`}
                  >
                    A {as[i]} คะแนน {scoreAs[0][i]}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setMap(setCorrect, modifyElementInUseStateArray(i))("B");
                    }}
                    value={`B ${bs[i]} คะแนน ${scoreBs[0][i]}`}
                  >
                    B {bs[i]} คะแนน {scoreBs[0][i]}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setMap(setCorrect, modifyElementInUseStateArray(i))("C");
                    }}
                    value={`C ${cs[i]} คะแนน ${scoreCs[0][i]}`}
                  >
                    C {cs[i]} คะแนน {scoreCs[0][i]}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setMap(setCorrect, modifyElementInUseStateArray(i))("D");
                    }}
                    value={`D ${ds[i]} คะแนน ${scoreDs[0][i]}`}
                  >
                    D {ds[i]} คะแนน {scoreDs[0][i]}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setMap(setCorrect, modifyElementInUseStateArray(i))("E");
                    }}
                    value={`E ${es[i]} คะแนน ${scoreEs[0][i]}`}
                  >
                    E {es[i]} คะแนน {scoreEs[0][i]}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setMap(setCorrect, modifyElementInUseStateArray(i))("-");
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
                    onChange={setTextToInt(
                      setMap(setChoiceOrder, modifyElementInUseStateArray(i))
                    )}
                    defaultValue={as[i]}
                  />
                </div>
              </>
            );
          })}
          <FinishButton
            text="เพิ่มคำถามที่เป็นตัวเลือก"
            onClick={addChoiceQuestion}
          />
          <FinishButton
            text="ลบคำถามที่เป็นตัวเลือก"
            onClick={safeToDeleteChoiceQuestion}
          />
          {textIds[0].map((v, i) => (
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
                  onChange={setTextToString(
                    setMap(textQuestions[1], modifyElementInUseStateArray(i)),
                    true
                  )}
                  value={textQuestions[0][i]}
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
                  onChange={setTextToFloat(
                    setMap(scores[1], modifyElementInUseStateArray(i))
                  )}
                  defaultValue={scores[0][i]}
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
                  onChange={setTextToInt(
                    setMap(textOrder[1], modifyElementInUseStateArray(i))
                  )}
                  defaultValue={textOrder[0][i]}
                />
              </div>
            </>
          ))}
          <FinishButton
            text="เพิ่มคำถามที่พิมพ์ตอบ"
            onClick={addTextQuestion}
          />
          <FinishButton
            text="ลบคำถามที่พิมพ์ตอบ"
            onClick={safeToDeleteTextQuestion}
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
