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
  InterPusherData,
  EditChoiceQuestion,
  EditTextQuestion,
} from "../../interface";
import { BasicBaan } from "../../interface";
import { useState } from "react";
import { TextField, Checkbox, Select, MenuItem } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import updateCamp from "@/libs/admin/updateCamp";
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
} from "./setup";
import editQuestion from "@/libs/camp/editQuestion";
import getAllQuestion from "@/libs/camp/getAllQuestion";
import Waiting from "./Waiting";
import React from "react";
import deleteChoiceQuestion from "@/libs/camp/deleteChoiceQuestion";
import deleteTextQuestion from "@/libs/camp/deleteTextQuestion";
import AllInOneLock from "./AllInOneLock";
import Pusher from "pusher-js";
import updatePusher from "@/libs/admin/updatePusher";
type UseStateReady<T> = [T, React.Dispatch<React.SetStateAction<T>>];
class ChoiceQuestions {
  private ids: UseStateReady<(Id | null)[]>;
  private questions: UseStateReady<string[]>;
  private as: UseStateReady<string[]>;
  private bs: UseStateReady<string[]>;
  private cs: UseStateReady<string[]>;
  private ds: UseStateReady<string[]>;
  private es: UseStateReady<string[]>;
  private scoreAs: UseStateReady<number[]>;
  private scoreBs: UseStateReady<number[]>;
  private scoreCs: UseStateReady<number[]>;
  private scoreDs: UseStateReady<number[]>;
  private scoreEs: UseStateReady<number[]>;
  private corrects: UseStateReady<(Choice | "-")[]>;
  private orders: UseStateReady<number[]>;
  public readonly indexes: number[];
  constructor(
    ids: UseStateReady<(Id | null)[]>,
    questions: UseStateReady<string[]>,
    as: UseStateReady<string[]>,
    bs: UseStateReady<string[]>,
    cs: UseStateReady<string[]>,
    ds: UseStateReady<string[]>,
    es: UseStateReady<string[]>,
    scoreAs: UseStateReady<number[]>,
    scoreBs: UseStateReady<number[]>,
    scoreCs: UseStateReady<number[]>,
    scoreDs: UseStateReady<number[]>,
    scoreEs: UseStateReady<number[]>,
    corrects: UseStateReady<(Choice | "-")[]>,
    orders: UseStateReady<number[]>
  ) {
    this.indexes = [];
    this.ids = [
      ids[0].map((id, index) => {
        this.indexes.push(index);
        return id;
      }),
      ids[1],
    ];
    this.questions = questions;
    this.as = as;
    this.bs = bs;
    this.cs = cs;
    this.ds = ds;
    this.es = es;
    this.scoreAs = scoreAs;
    this.scoreBs = scoreBs;
    this.scoreCs = scoreCs;
    this.scoreDs = scoreDs;
    this.scoreEs = scoreEs;
    this.corrects = corrects;
    this.orders = orders;
  }
  public getId(i: number) {
    return this.ids[0][i];
  }
  public getA(i: number) {
    return this.as[0][i];
  }
  public getB(i: number) {
    return this.bs[0][i];
  }
  public getC(i: number) {
    return this.cs[0][i];
  }
  public getD(i: number) {
    return this.ds[0][i];
  }
  public getE(i: number) {
    return this.es[0][i];
  }
  public getScoreA(i: number) {
    return this.scoreAs[0][i];
  }
  public getScoreB(i: number) {
    return this.scoreBs[0][i];
  }
  public getScoreC(i: number) {
    return this.scoreCs[0][i];
  }
  public getScoreD(i: number) {
    return this.scoreDs[0][i];
  }
  public getScoreE(i: number) {
    return this.scoreEs[0][i];
  }
  public getCorrect(i: number) {
    return this.corrects[0][i];
  }
  public getOrder(i: number) {
    return this.orders[0][i];
  }
  public export(): EditChoiceQuestion[] {
    return this.ids[0].map((_id, i) => ({
      _id,
      question: this.questions[0][i],
      a: this.as[0][i],
      b: this.bs[0][i],
      c: this.cs[0][i],
      d: this.ds[0][i],
      e: this.es[0][i],
      scoreA: this.scoreAs[0][i],
      scoreB: this.scoreBs[0][i],
      scoreC: this.scoreCs[0][i],
      scoreD: this.scoreDs[0][i],
      scoreE: this.scoreEs[0][i],
      correct: this.corrects[0][i],
      order: this.orders[0][i],
    }));
  }
  public removeOne() {
    if (this.ids[0].length == 0) {
      return;
    }
    if (!this.ids[0][this.ids[0].length - 1]) {
      this.ids[1](removeElementInUseStateArray);
      this.questions[1](removeElementInUseStateArray);
      this.as[1](removeElementInUseStateArray);
      this.bs[1](removeElementInUseStateArray);
      this.cs[1](removeElementInUseStateArray);
      this.ds[1](removeElementInUseStateArray);
      this.es[1](removeElementInUseStateArray);
      this.scoreAs[1](removeElementInUseStateArray);
      this.scoreBs[1](removeElementInUseStateArray);
      this.scoreCs[1](removeElementInUseStateArray);
      this.scoreDs[1](removeElementInUseStateArray);
      this.scoreEs[1](removeElementInUseStateArray);
      this.corrects[1](removeElementInUseStateArray);
      this.orders[1](removeElementInUseStateArray);
      this.indexes.pop();
    }
  }
  public static readonly new: EditChoiceQuestion = {
    _id: null,
    question: "-",
    a: "-",
    b: "-",
    c: "-",
    d: "-",
    e: "-",
    scoreA: 0,
    scoreB: 0,
    scoreC: 0,
    scoreD: 0,
    scoreE: 0,
    correct: "-",
    order: 0,
  };
  public addOne(add: EditChoiceQuestion) {
    this.ids[1](addItemInUseStateArray(add._id));
    this.questions[1](addItemInUseStateArray(add.question));
    this.as[1](addItemInUseStateArray(add.a));
    this.bs[1](addItemInUseStateArray(add.b));
    this.cs[1](addItemInUseStateArray(add.c));
    this.ds[1](addItemInUseStateArray(add.d));
    this.es[1](addItemInUseStateArray(add.e));
    this.scoreAs[1](addItemInUseStateArray(add.scoreA));
    this.scoreBs[1](addItemInUseStateArray(add.scoreB));
    this.scoreCs[1](addItemInUseStateArray(add.scoreC));
    this.scoreDs[1](addItemInUseStateArray(add.scoreD));
    this.scoreEs[1](addItemInUseStateArray(add.scoreE));
    this.corrects[1](addItemInUseStateArray(add.correct));
    this.orders[1](addItemInUseStateArray(add.order));
    this.indexes.push(this.indexes.length);
  }
  public modA(i: number): (set: string) => void {
    return setMap(this.as[1], modifyElementInUseStateArray(i));
  }
  public modB(i: number): (set: string) => void {
    return setMap(this.bs[1], modifyElementInUseStateArray(i));
  }
  public modC(i: number): (set: string) => void {
    return setMap(this.cs[1], modifyElementInUseStateArray(i));
  }
  public modD(i: number): (set: string) => void {
    return setMap(this.ds[1], modifyElementInUseStateArray(i));
  }
  public modE(i: number): (set: string) => void {
    return setMap(this.es[1], modifyElementInUseStateArray(i));
  }
  public modScoreA(i: number): (set: number) => void {
    return setMap(this.scoreAs[1], modifyElementInUseStateArray(i));
  }
  public modScoreB(i: number): (set: number) => void {
    return setMap(this.scoreBs[1], modifyElementInUseStateArray(i));
  }
  public modScoreC(i: number): (set: number) => void {
    return setMap(this.scoreCs[1], modifyElementInUseStateArray(i));
  }
  public modScoreD(i: number): (set: number) => void {
    return setMap(this.scoreDs[1], modifyElementInUseStateArray(i));
  }
  public modScoreE(i: number): (set: number) => void {
    return setMap(this.scoreEs[1], modifyElementInUseStateArray(i));
  }
  public modQuestion(i: number): (set: string) => void {
    return setMap(this.questions[1], modifyElementInUseStateArray(i));
  }
  public modCorrect(i: number): (set: Choice | "-") => void {
    return setMap(this.corrects[1], modifyElementInUseStateArray(i));
  }
  public modOrder(i: number): (set: number) => void {
    return setMap(this.orders[1], modifyElementInUseStateArray(i));
  }
  public replace(replacers: EditChoiceQuestion[]) {
    this.ids[1](replacers.map((choice) => choice._id));
    this.questions[1](replacers.map((choice) => choice.question));
    this.as[1](replacers.map((choice) => choice.a));
    this.bs[1](replacers.map((choice) => choice.b));
    this.cs[1](replacers.map((choice) => choice.c));
    this.ds[1](replacers.map((choice) => choice.d));
    this.es[1](replacers.map((choice) => choice.e));
    this.scoreAs[1](replacers.map((choice) => choice.scoreA));
    this.scoreBs[1](replacers.map((choice) => choice.scoreB));
    this.scoreCs[1](replacers.map((choice) => choice.scoreC));
    this.scoreDs[1](replacers.map((choice) => choice.scoreD));
    this.scoreEs[1](replacers.map((choice) => choice.scoreE));
    this.corrects[1](replacers.map((choice) => choice.correct));
    this.orders[1](replacers.map((choice) => choice.order));
  }
  public getQuestion(i: number) {
    return this.questions[0][i];
  }
}
class TextQuestions {
  private ids: UseStateReady<(Id | null)[]>;
  private questions: UseStateReady<string[]>;
  private scores: UseStateReady<number[]>;
  private orders: UseStateReady<number[]>;
  public readonly indexes: number[];
  constructor(
    ids: UseStateReady<(Id | null)[]>,
    questions: UseStateReady<string[]>,
    scores: UseStateReady<number[]>,
    orders: UseStateReady<number[]>
  ) {
    this.indexes = [];
    this.ids = [
      ids[0].map((id, index) => {
        this.indexes.push(index);
        return id;
      }),
      ids[1],
    ];
    this.questions = questions;
    this.scores = scores;
    this.orders = orders;
  }
  public modOrder(i: number): (set: number) => void {
    return setMap(this.orders[1], modifyElementInUseStateArray(i));
  }
  public modQuestion(i: number): (set: string) => void {
    return setMap(this.questions[1], modifyElementInUseStateArray(i));
  }
  public modScore(i: number): (set: number) => void {
    return setMap(this.scores[1], modifyElementInUseStateArray(i));
  }
  public static readonly new: EditTextQuestion = {
    question: "-",
    _id: null,
    score: 0,
    order: 0,
  };
  public replace(replacers: EditTextQuestion[]) {
    this.questions[1](replacers.map((text) => text.question));
    this.ids[1](replacers.map((text) => text._id));
    this.scores[1](replacers.map((text) => text.score));
    this.orders[1](replacers.map((text) => text.order));
  }
  public addOne(add: EditTextQuestion) {
    this.indexes.push(this.indexes.length);
    this.ids[1](addItemInUseStateArray(add._id));
    this.questions[1](addItemInUseStateArray(add.question));
    this.scores[1](addItemInUseStateArray(add.score));
    this.orders[1](addItemInUseStateArray(add.order));
  }
  public getId(i: number) {
    return this.ids[0][i];
  }
  public getScore(i: number) {
    return this.scores[0][i];
  }
  public getOrder(i: number) {
    return this.orders[0][i];
  }
  public getQuestion(i: number) {
    return this.questions[0][i];
  }
  public removeOne() {
    if (this.ids[0].length == 0) {
      return;
    }
    if (!this.ids[0][this.ids[0].length - 1]) {
      this.ids[1](removeElementInUseStateArray);
      this.questions[1](removeElementInUseStateArray);
      this.scores[1](removeElementInUseStateArray);
      this.orders[1](removeElementInUseStateArray);
      this.indexes.pop();
    }
  }
  public export(): EditTextQuestion[] {
    return this.ids[0].map((_id, i) => ({
      _id,
      question: this.questions[0][i],
      score: this.scores[0][i],
      order: this.orders[0][i],
    }));
  }
}
interface QuestionReady {
  element: React.ReactNode;
  order: number;
}
export default function UpdateCampClient({
  baans,
  camp,
  parts,
  remainPartName,
  questions,
  systemInfo,
  pusherData,
  token,
}: {
  baans: BasicBaan[];
  camp: InterCampFront;
  parts: BasicPart[];
  remainPartName: MyMap[];
  questions: GetAllQuestion;
  systemInfo: SystemInfo;
  pusherData: InterPusherData | null;
  token: string;
}) {
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
  const {
    up: lockChangeQuestion,
    middle: canAnswerTheQuestion,
    down: open,
    setUp: setLockChangeQuestion,
    setMiddle: setCanAnswerTheQuestion,
    setDown: setOpen,
  } = new SetUpMiddleDownPack(
    useState(
      SetUpMiddleDownPack.init(
        camp.lockChangeQuestion,
        camp.canAnswerTheQuestion,
        camp.open
      )
    )
  );
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
  const [appId, setAppId] = useState<string | null>(
    pusherData ? pusherData.appId : null
  );
  const [key, setKey] = useState<string | null>(
    pusherData ? pusherData.key : null
  );
  const [secret, setSecret] = useState<string | null>(
    pusherData ? pusherData.secret : null
  );
  const [cluster, setCluster] = useState<string | null>(
    pusherData ? pusherData.cluster : null
  );
  const choiceIds = useState<(Id | null)[]>(
    questions.choices.map((choice) => choice._id)
  );
  const choiceQuestions = useState(
    questions.choices.map((choice) => choice.question)
  );
  const as = useState(questions.choices.map((choice) => choice.a));
  const bs = useState(questions.choices.map((choice) => choice.b));
  const cs = useState(questions.choices.map((choice) => choice.c));
  const ds = useState(questions.choices.map((choice) => choice.d));
  const es = useState(questions.choices.map((choice) => choice.e));
  const scoreAs = useState(questions.choices.map((choice) => choice.scoreA));
  const scoreBs = useState(questions.choices.map((choice) => choice.scoreB));
  const scoreCs = useState(questions.choices.map((choice) => choice.scoreC));
  const scoreDs = useState(questions.choices.map((choice) => choice.scoreD));
  const scoreEs = useState(questions.choices.map((choice) => choice.scoreE));
  const corrects = useState<(Choice | "-")[]>(
    questions.choices.map((choice) => choice.correct)
  );
  const choiceOrder = useState(questions.choices.map((choice) => choice.order));
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
  const textQuestions = useState(questions.texts.map((text) => text.question));
  const textIds = useState<(Id | null)[]>(
    questions.texts.map((text) => text._id)
  );
  const [deleteTextIds, setDeleteTextIds] = useState<Id[]>([]);
  const [deleteChoiceIds, setDeleteChoiceIds] = useState<Id[]>([]);
  const scores = useState(questions.texts.map((text) => text.score));
  const textOrder = useState(questions.texts.map((text) => text.order));
  const texts = new TextQuestions(textIds, textQuestions, scores, textOrder);
  const isHaveNongInGeneralRoleNong =
    camp.memberStructure == "nong->highSchool,pee->1year,peto->2upYear" ||
    camp.memberStructure == "nong->highSchool,pee->2upYear" ||
    camp.memberStructure == "nong->highSchool,pee->allYear";
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
                  onChange={setSwop(choices.getId(i), setDeleteChoiceIds)}
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
                  onChange={setSwop(texts.getId(i), setDeleteTextIds)}
                />
              ) : null}
            </div>
          ),
          order: texts.getOrder(i),
        }))
      )
      .sort((a, b) => a.order - b.order);
  }
  const [preview, setPreview] = useState<React.ReactNode>(
    questionReady(false, choices, texts).map((v) => v.element)
  );
  const [deletePreview, setDeletePreview] = useState<React.ReactNode>(
    questionReady(true, choices, texts).map((v) => v.element)
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
    choices.replace(newQuestions.choices);
    texts.replace(newQuestions.texts);
    setPreview(questionReady(false, choices, texts).map((v) => v.element));
    setDeletePreview(questionReady(true, choices, texts).map((v) => v.element));
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
    setDeleteChoiceIds([]);
    setDeleteTextIds([]);
    const newQuestions = await getAllQuestion(token, camp._id);
    choices.replace(newQuestions.choices);
    texts.replace(newQuestions.texts);
    setPreview(questionReady(false, choices, texts).map((v) => v.element));
    setDeletePreview(questionReady(true, choices, texts).map((v) => v.element));
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
    textChanel.bind(systemInfo.newText, (event: TriggerTextQuestion) =>
      texts.addOne(event)
    );
    textChanel.bind(systemInfo.updateText, (event: TriggerTextQuestion) => {
      texts.indexes.forEach((i) => {
        const id = texts.getId(i);
        if (!id) {
          return;
        }
        if (event._id.toString() == id.toString()) {
          texts.modOrder(i)(event.order);
          texts.modQuestion(i)(event.question);
          texts.modScore(i)(event.score);
        }
      });
    });
    choiceChanel.bind(systemInfo.newText, (event: TriggerChoiceQuestion) =>
      choices.addOne(event)
    );
    choiceChanel.bind(systemInfo.updateText, (event: TriggerChoiceQuestion) => {
      choices.indexes.forEach((i) => {
        const id = choices.getId(i);
        if (!id) {
          return;
        }
        if (id.toString() == event._id.toString()) {
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
                value={null}
              />
            </div>
            <FinishButton
              text="สร้างบ้านจากกรุ๊ป"
              onClick={() => {
                createBaanByGroup(camp._id, token);
              }}
            />
            <FinishButton
              text="สร้างบ้าน"
              onClick={() => {
                if (newBaanName) {
                  addBaan(newBaanName, camp._id, token);
                }
              }}
            />
            <SelectTemplate
              mapIn={remainPartName}
              select={(e: Id) => {
                addPart(e, camp._id, token);
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
                onChange={setOpen}
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
                onChange={(_e, state) => {
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
                onChange={setCanAnswerTheQuestion}
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
                onChange={setLockChangeQuestion}
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
              token={token}
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
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-white">app_id</label>
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
                onChange={setTextToString(setAppId)}
                value={appId}
              />
            </div>
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-white">key</label>
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
                onChange={setTextToString(setKey)}
                value={key}
              />
            </div>
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-white">secret</label>
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
                onChange={setTextToString(setSecret)}
                value={secret}
              />
            </div>
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-white">cluster</label>
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
                onChange={setTextToString(setCluster)}
                value={cluster}
              />
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
                        token
                      );
                      if (appId && key && secret && cluster) {
                        updatePusher(
                          { appId, key, secret, cluster, campId: camp._id },
                          token
                        );
                      }
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
                onClick={() => saveDeleteCamp(camp._id, token)}
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
                    onChange={setTextToString(choices.modQuestion(i), true)}
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
                    onChange={setTextToString(choices.modA(i), true)}
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
                    onChange={setTextToString(choices.modB(i), true)}
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
                    onChange={setTextToString(choices.modC(i), true)}
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
                    onChange={setTextToString(choices.modD(i), true)}
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
                    onChange={setTextToString(choices.modE(i), true)}
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
                    onChange={setTextToFloat(choices.modScoreA(i))}
                    value={choices.getScoreA(i)}
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
                    onChange={setTextToFloat(choices.modScoreB(i))}
                    value={choices.getScoreB(i)}
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
                    onChange={setTextToFloat(choices.modScoreC(i))}
                    value={choices.getScoreC(i)}
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
                    onChange={setTextToFloat(choices.modScoreD(i))}
                    value={choices.getScoreD(i)}
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
                    onChange={setTextToFloat(choices.modScoreE(i))}
                    value={choices.getScoreE(i)}
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
                      choices.modCorrect(i)("A");
                    }}
                    value={`A ${choices.getA(i)} คะแนน ${choices.getScoreA(i)}`}
                  >
                    A {choices.getA(i)} คะแนน {choices.getScoreA(i)}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      choices.modCorrect(i)("B");
                    }}
                    value={`B ${choices.getB(i)} คะแนน ${choices.getScoreB(i)}`}
                  >
                    B {choices.getB(i)} คะแนน {choices.getScoreB(i)}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      choices.modCorrect(i)("C");
                    }}
                    value={`C ${choices.getC(i)} คะแนน ${choices.getScoreC(i)}`}
                  >
                    C {choices.getC(i)} คะแนน {choices.getScoreC(i)}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      choices.modCorrect(i)("D");
                    }}
                    value={`D ${choices.getD(i)} คะแนน ${choices.getScoreD(i)}`}
                  >
                    D {choices.getD(i)} คะแนน {choices.getScoreD(i)}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      choices.modCorrect(i)("E");
                    }}
                    value={`E ${choices.getE(i)} คะแนน ${choices.getScoreE(i)}`}
                  >
                    E {choices.getE(i)} คะแนน {choices.getScoreE(i)}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      choices.modCorrect(i)("-");
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
                    onChange={setTextToInt(choices.modOrder(i))}
                    value={choices.getOrder(i)}
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
            onClick={() => choices.removeOne()}
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
                  onChange={setTextToString(texts.modQuestion(i), true)}
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
                  onChange={setTextToFloat(texts.modScore(i))}
                  value={texts.getScore(i)}
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
                  onChange={setTextToInt(texts.modOrder(i))}
                  value={texts.getOrder(i)}
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
            onClick={() => texts.removeOne()}
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
