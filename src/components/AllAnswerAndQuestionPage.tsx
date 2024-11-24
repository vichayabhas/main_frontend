"use client";

import getAllAnswerAndQuestion from "@/libs/camp/getAllAnswerAndQuestion";
import {
  GetAllAnswerAndQuestion,
  GetChoiceQuestion,
  GetTextQuestion,
  Id,
  InterTextQuestion,
  InterUser,
  UserAndAllQuestionPack,
} from "../../interface";
import AllAnswerAndQuestionPageBreakDown from "./AllAnswerAndQuestionPageBreakDown";
import { copy, setBoolean, setTextToString, stringToId } from "./setup";
import React, { useState } from "react";
import { Checkbox, TextField } from "@mui/material";
interface AnswerReady {
  element: React.ReactNode;
  order: number;
  id: Id;
}
interface UserAndAllQuestionReady {
  user: InterUser;
  answer: AnswerReady[];
}
interface DataReady {
  data: GetAllAnswerAndQuestion;
  textQuestions: InterTextQuestion[];
  token: string;
  campId: Id;
  update: () => Promise<GetAllAnswerAndQuestion>;
  readOnly: boolean | undefined;
}
function getChooseChoice(input: GetChoiceQuestion): React.ReactNode {
  let chooseChoice: React.ReactNode;
  switch (input.answer) {
    case "A": {
      chooseChoice = (
        <>
          <div>A</div>
          <div>{input.a}</div>
          <div>คะแนน {input.scoreA}</div>
        </>
      );
      break;
    }
    case "B": {
      chooseChoice = (
        <>
          <div>B</div>
          <div>{input.b}</div>
          <div>คะแนน {input.scoreB}</div>
        </>
      );
      break;
    }
    case "C": {
      chooseChoice = (
        <>
          <div>C</div>
          <div>{input.c}</div>
          <div>คะแนน {input.scoreC}</div>
        </>
      );
      break;
    }
    case "D": {
      chooseChoice = (
        <>
          <div>D</div>
          <div>{input.d}</div>
          <div>คะแนน {input.scoreD}</div>
        </>
      );
      break;
    }
    case "E": {
      chooseChoice = (
        <>
          <div>E</div>
          <div>{input.e}</div>
          <div>คะแนน {input.scoreE}</div>
        </>
      );
      break;
    }
    case "-": {
      chooseChoice = "-";
      break;
    }
  }
  return chooseChoice;
}
function getTextElement(input: GetTextQuestion): React.ReactNode {
  return (
    <>
      <div>{input.answer}</div>
      <div>คะแนนที่ได้ {input.answerScore}</div>
      <div>คะแนนเต็ม {input.score}</div>
    </>
  );
}
export default function AllAnswerAndQuestionPage({
  dataInput,
  token,
  campIdInput,
  readOnly,
}: {
  dataInput: GetAllAnswerAndQuestion;
  token: string;
  campIdInput: string;
  readOnly?: boolean;
}) {
  const campId = stringToId(campIdInput);
  const [data, setData] = useState(dataInput);
  const [showAll, setShowAll] = useState(true);
  const [name, setName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  async function update() {
    const buffer = await getAllAnswerAndQuestion(campId, token);
    setData(buffer);
    return buffer;
  }
  const choiceQuestions = data.mainChoices
    .map(copy)
    .sort((a, b) => a._id.toString().localeCompare(b._id.toString()))
    .sort((a, b) => a.order - b.order);
  const textQuestions = data.mainTexts
    .map(copy)
    .sort((a, b) => a._id.toString().localeCompare(b._id.toString()))
    .sort((a, b) => a.order - b.order);
  //const userAndAllQuestionReady:UserAndAllQuestionReady[]=
  const headTableRaw: AnswerReady[] = choiceQuestions
    .map((v) => ({
      id: v._id,
      order: v.order,
      element: <th>{v.question}</th>,
    }))
    .concat(
      textQuestions.map((v) => ({
        id: v._id,
        order: v.order,
        element: <th>{v.question}</th>,
      }))
    )
    .sort((a, b) => a.id.toString().localeCompare(b.id.toString()))
    .sort((a, b) => a.order - b.order);
  const headTable: React.ReactNode = (
    <tr>
      <th>ชือเล่น</th>
      <th>ชื่อจริง</th>
      <th>นามสกุล</th>
      <th>เพศ</th>
      {headTableRaw.map((v) => v.element)}
    </tr>
  );
  function getDataReady(): DataReady {
    return {
      data,
      token,
      campId,
      update,
      readOnly,
      textQuestions,
    };
  }
  function getAllAnswerAndQuestionReadyRaw(
    input: UserAndAllQuestionPack[]
  ): UserAndAllQuestionReady[] {
    return input.map(({ user, questions }) => ({
      user,
      answer: questions.choices
        .map((v) => ({
          id: v._id,
          order: v.order,
          element: getChooseChoice(v),
        }))
        .concat(
          questions.texts.map((v) => ({
            id: v._id,
            order: v.order,
            element: getTextElement(v),
          }))
        )
        .sort((a, b) => a.id.toString().localeCompare(b.id.toString()))
        .sort((a, b) => a.order - b.order),
    }));
  }
  function filterUser(input: UserAndAllQuestionReady): boolean {
    return (
      input.user.name.search(name) == 0 &&
      input.user.nickname.search(nickname) == 0 &&
      input.user.lastname.search(lastname) == 0
    );
  }
  function getAllAnswerAndQuestionReady(
    input: UserAndAllQuestionPack[]
  ): React.ReactNode {
    const buffer = getAllAnswerAndQuestionReadyRaw(input);
    return buffer.filter(filterUser).map((v, i) => (
      <tr key={i}>
        <td>{v.user.nickname}</td>
        <td>{v.user.name}</td>
        <td>{v.user.lastname}</td>
        <td>{v.user.gender}</td>
        {v.answer.map((v, i) => (
          <td key={i}>{v.element}</td>
        ))}
      </tr>
    ));
  }
  return (
    <div>
      <Checkbox onChange={setBoolean(setShowAll)} defaultChecked />
      filter
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
          onChange={setTextToString(setName, true)}
          value={name}
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
          onChange={setTextToString(setLastname, true)}
          value={lastname}
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
          onChange={setTextToString(setNickname)}
          value={nickname}
        />
      </div>
      {showAll ? (
        <>
          <table>
            <tr>
              <th>คำถาม/ตัวเลือก</th>
              <th>A</th>
              <th>B</th>
              <th>C</th>
              <th>D</th>
              <th>E</th>
            </tr>
            {choiceQuestions.map((choiceQuestion, i) => (
              <tr key={i}>
                <td>{choiceQuestion.question}</td>
                <td>
                  <div>{choiceQuestion.a}</div>
                  <div>จำนวนน้องที่ตอบ {choiceQuestion.nongAnswerA}</div>
                  <div>จำนวนพี่ที่ตอบ {choiceQuestion.peeAnswerA}</div>
                  <div>คะแนน {choiceQuestion.scoreA}</div>
                </td>
                <td>
                  <div>{choiceQuestion.b}</div>
                  <div>จำนวนน้องที่ตอบ {choiceQuestion.nongAnswerB}</div>
                  <div>จำนวนพี่ที่ตอบ {choiceQuestion.peeAnswerB}</div>
                  <div>คะแนน {choiceQuestion.scoreB}</div>
                </td>
                <td>
                  <div>{choiceQuestion.c}</div>
                  <div>จำนวนน้องที่ตอบ {choiceQuestion.nongAnswerC}</div>
                  <div>จำนวนพี่ที่ตอบ {choiceQuestion.peeAnswerC}</div>
                  <div>คะแนน {choiceQuestion.scoreC}</div>
                </td>
                <td>
                  <div>{choiceQuestion.d}</div>
                  <div>จำนวนน้องที่ตอบ {choiceQuestion.nongAnswerD}</div>
                  <div>จำนวนพี่ที่ตอบ {choiceQuestion.peeAnswerD}</div>
                  <div>คะแนน {choiceQuestion.scoreD}</div>
                </td>
                <td>
                  <div>{choiceQuestion.e}</div>
                  <div>จำนวนน้องที่ตอบ {choiceQuestion.nongAnswerE}</div>
                  <div>จำนวนพี่ที่ตอบ {choiceQuestion.peeAnswerE}</div>
                  <div>คะแนน {choiceQuestion.scoreE}</div>
                </td>
              </tr>
            ))}
          </table>
          น้องที่สมัครเข้ามา
          <AllAnswerAndQuestionPageBreakDown
            setMode={(dataInput2) => dataInput2.nongPendingAnswers}
            dataReady={getDataReady()}
          />
          น้องที่ผ่านสัมภาษณ์
          <AllAnswerAndQuestionPageBreakDown
            setMode={(dataInput2) => dataInput2.nongInterviewAnswers}
            dataReady={getDataReady()}
          />
          น้องที่ผ่านเข้าค่าย
          <AllAnswerAndQuestionPageBreakDown
            setMode={(dataInput2) => dataInput2.nongPassAnswers}
            dataReady={getDataReady()}
          />
          น้องที่จ่ายตังแล้ว
          <AllAnswerAndQuestionPageBreakDown
            setMode={(dataInput2) => dataInput2.nongPaidAnswers}
            dataReady={getDataReady()}
          />
          น้องที่ยืนยันแล้ว
          <AllAnswerAndQuestionPageBreakDown
            setMode={(dataInput2) => dataInput2.nongSureAnswers}
            dataReady={getDataReady()}
          />
          น้องค่าย
          <AllAnswerAndQuestionPageBreakDown
            setMode={(dataInput2) => dataInput2.nongsAnswers}
            dataReady={getDataReady()}
          />
          พี่พี่
          <AllAnswerAndQuestionPageBreakDown
            setMode={(dataInput2) => dataInput2.peeAnswers}
            dataReady={getDataReady()}
          />
        </>
      ) : null}
      น้องที่สมัครเข้ามา
      <table>
        {headTable}
        {getAllAnswerAndQuestionReady(data.nongPendingAnswers)}
      </table>
      น้องที่ผ่านสัมภาษณ์
      <table>
        {headTable}
        {getAllAnswerAndQuestionReady(data.nongInterviewAnswers)}
      </table>
      น้องที่ผ่านเข้าค่าย
      <table>
        {headTable}
        {getAllAnswerAndQuestionReady(data.nongPassAnswers)}
      </table>
      น้องที่จ่ายตังแล้ว
      <table>
        {headTable}
        {getAllAnswerAndQuestionReady(data.nongPaidAnswers)}
      </table>
      น้องที่ยืนยันแล้ว
      <table>
        {headTable}
        {getAllAnswerAndQuestionReady(data.nongSureAnswers)}
      </table>
      น้องค่าย
      <table>
        {headTable}
        {getAllAnswerAndQuestionReady(data.nongsAnswers)}
      </table>
      พี่พี่
      <table>
        {headTable}
        {getAllAnswerAndQuestionReady(data.peeAnswers)}
      </table>
    </div>
  );
}
