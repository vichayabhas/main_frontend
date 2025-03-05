"use client";

import {
  stringToId,
  copy,
  setBoolean,
  setTextToString,
  downloadText,
} from "@/components/utility/setup";
import FinishButton from "@/components/utility/FinishButton";
import getAllAnswerAndQuestion from "@/libs/camp/getAllAnswerAndQuestion";
import { Checkbox, TextField } from "@mui/material";
import React from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import {
  Id,
  BasicUser,
  GetAllAnswerAndQuestion,
  InterTextQuestion,
  GetChoiceQuestion,
  GetTextQuestion,
  UserAndAllQuestionPack,
} from "../../../../interface";
import AllAnswerAndQuestionPageBreakDown from "./AllAnswerAndQuestionPageBreakDown";

interface AnswerReady {
  element: React.ReactNode;
  order: number;
  id: Id;
}
interface UserAndAllQuestionReady {
  user: BasicUser;
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
  if (!dataInput.canScoring) {
    readOnly = true;
  }

  const campId = stringToId(campIdInput);
  const [data, setData] = React.useState(dataInput);
  const [showAll, setShowAll] = React.useState(true);
  const [name, setName] = React.useState<string>("");
  const [nickname, setNickname] = React.useState<string>("");
  const [lastname, setLastname] = React.useState<string>("");
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
  const pendingRef = React.useRef(null);
  const interviewRef = React.useRef(null);
  const passRef = React.useRef(null);
  const paidRef = React.useRef(null);
  const sureRef = React.useRef(null);
  const nongRef = React.useRef(null);
  const peeRef = React.useRef(null);
  const choiceRef = React.useRef(null);
  const pendingDownload = useDownloadExcel({
    currentTableRef: pendingRef.current,
    filename: "น้องที่สมัครเข้ามา",
  });
  const interviewDownload = useDownloadExcel({
    currentTableRef: interviewRef.current,
    filename: "น้องที่ผ่านสัมภาษณ์",
  });
  const passDownload = useDownloadExcel({
    currentTableRef: passRef.current,
    filename: "น้องที่ผ่านเข้าค่าย",
  });
  const paidDownload = useDownloadExcel({
    currentTableRef: paidRef.current,
    filename: "น้องที่จ่ายตังแล้ว",
  });
  const sureDownload = useDownloadExcel({
    currentTableRef: sureRef.current,
    filename: "น้องที่ยืนยันแล้ว",
  });
  const nongDownload = useDownloadExcel({
    currentTableRef: nongRef.current,
    filename: "น้องค่าย",
  });
  const peeDownload = useDownloadExcel({
    currentTableRef: peeRef.current,
    filename: `พี่${data.groupName}`,
  });
  const choiceDownload = useDownloadExcel({
    currentTableRef: choiceRef.current,
    filename: "ตัวเลือก",
  });
  return (
    <div>
      <Checkbox onChange={setBoolean(setShowAll)} defaultChecked />
      filter
      <div className="flex flex-row items-center">
        <label className="w-2/5 text-2xl text-white">ชื่อจริง</label>
        <TextField
          name="Name"
          id="Name"
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
          <table ref={choiceRef}>
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
          <FinishButton
            text={downloadText}
            onClick={choiceDownload.onDownload}
          />
          น้องที่สมัครเข้ามา
          <AllAnswerAndQuestionPageBreakDown
            setMode={(dataInput2) => dataInput2.nongPendingAnswers}
            dataReady={getDataReady()}
            types="น้องที่สมัครเข้ามา"
          />
          น้องที่ผ่านสัมภาษณ์
          <AllAnswerAndQuestionPageBreakDown
            setMode={(dataInput2) => dataInput2.nongInterviewAnswers}
            dataReady={getDataReady()}
            types="น้องที่ผ่านสัมภาษณ์"
          />
          น้องที่ผ่านเข้าค่าย
          <AllAnswerAndQuestionPageBreakDown
            setMode={(dataInput2) => dataInput2.nongPassAnswers}
            dataReady={getDataReady()}
            types="น้องที่ผ่านเข้าค่าย"
          />
          น้องที่จ่ายตังแล้ว
          <AllAnswerAndQuestionPageBreakDown
            setMode={(dataInput2) => dataInput2.nongPaidAnswers}
            dataReady={getDataReady()}
            types="น้องที่จ่ายตังแล้ว"
          />
          น้องที่ยืนยันแล้ว
          <AllAnswerAndQuestionPageBreakDown
            setMode={(dataInput2) => dataInput2.nongSureAnswers}
            dataReady={getDataReady()}
            types="น้องที่ยืนยันแล้ว"
          />
          น้องค่าย
          <AllAnswerAndQuestionPageBreakDown
            setMode={(dataInput2) => dataInput2.nongsAnswers}
            dataReady={getDataReady()}
            types="น้องค่าย"
          />
          พี่พี่
          <AllAnswerAndQuestionPageBreakDown
            setMode={(dataInput2) => dataInput2.peeAnswers}
            dataReady={getDataReady()}
            types="พี่พี่"
          />
        </>
      ) : null}
      น้องที่สมัครเข้ามา
      <table ref={pendingRef}>
        {headTable}
        {getAllAnswerAndQuestionReady(data.nongPendingAnswers)}
      </table>
      <FinishButton text={downloadText} onClick={pendingDownload.onDownload} />
      น้องที่ผ่านสัมภาษณ์
      <table ref={interviewRef}>
        {headTable}
        {getAllAnswerAndQuestionReady(data.nongInterviewAnswers)}
      </table>
      <FinishButton
        text={downloadText}
        onClick={interviewDownload.onDownload}
      />
      น้องที่ผ่านเข้าค่าย
      <table ref={passRef}>
        {headTable}
        {getAllAnswerAndQuestionReady(data.nongPassAnswers)}
      </table>
      <FinishButton text={downloadText} onClick={passDownload.onDownload} />
      น้องที่จ่ายตังแล้ว
      <table ref={paidRef}>
        {headTable}
        {getAllAnswerAndQuestionReady(data.nongPaidAnswers)}
      </table>
      <FinishButton text={downloadText} onClick={paidDownload.onDownload} />
      น้องที่ยืนยันแล้ว
      <table ref={sureRef}>
        {headTable}
        {getAllAnswerAndQuestionReady(data.nongSureAnswers)}
      </table>
      <FinishButton text={downloadText} onClick={sureDownload.onDownload} />
      น้องค่าย
      <table ref={nongRef}>
        {headTable}
        {getAllAnswerAndQuestionReady(data.nongsAnswers)}
      </table>
      <FinishButton text={downloadText} onClick={nongDownload.onDownload} />
      พี่พี่
      <table ref={peeRef}>
        {headTable}
        {getAllAnswerAndQuestionReady(data.peeAnswers)}
      </table>
      <FinishButton text={downloadText} onClick={peeDownload.onDownload} />
    </div>
  );
}
