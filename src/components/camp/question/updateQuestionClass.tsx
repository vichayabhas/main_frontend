import {
  addItemInUseStateArray,
  modifyElementInUseStateArray,
  removeElementInUseStateArray,
  setMap,
} from "@/components/utility/setup";
import {
  Choice,
  EditChoiceQuestion,
  EditTextQuestion,
  Id,
} from "../../../../interface";
import React from "react";

export type UseStateReady<T> = [T, React.Dispatch<React.SetStateAction<T>>];
export class ChoiceQuestions {
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
  public deletes(ids: Id[]) {
    this.ids[0].forEach((id, i) => {
      if (!!id && ids.includes(id)) {
        this.questions[1]((p) => p.filter((v, i2) => i2 != i));
        this.ids[1]((p) => p.filter((v, i2) => i2 != i));
        this.as[1]((p) => p.filter((v, i2) => i2 != i));
        this.bs[1]((p) => p.filter((v, i2) => i2 != i));
        this.cs[1]((p) => p.filter((v, i2) => i2 != i));
        this.ds[1]((p) => p.filter((v, i2) => i2 != i));
        this.es[1]((p) => p.filter((v, i2) => i2 != i));
        this.scoreAs[1]((p) => p.filter((v, i2) => i2 != i));
        this.scoreBs[1]((p) => p.filter((v, i2) => i2 != i));
        this.scoreCs[1]((p) => p.filter((v, i2) => i2 != i));
        this.scoreDs[1]((p) => p.filter((v, i2) => i2 != i));
        this.scoreEs[1]((p) => p.filter((v, i2) => i2 != i));
        this.corrects[1]((p) => p.filter((v, i2) => i2 != i));
        this.orders[1]((p) => p.filter((v, i2) => i2 != i));
      }
    });
  }
}
export class TextQuestions {
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
  public deletes(ids: Id[]) {
    this.ids[0].forEach((id, i) => {
      if (!!id && ids.includes(id)) {
        this.questions[1]((p) => p.filter((v, i2) => i2 != i));
        this.ids[1]((p) => p.filter((v, i2) => i2 != i));
        this.scores[1]((p) => p.filter((v, i2) => i2 != i));
        this.orders[1]((p) => p.filter((v, i2) => i2 != i));
      }
    });
  }
}
