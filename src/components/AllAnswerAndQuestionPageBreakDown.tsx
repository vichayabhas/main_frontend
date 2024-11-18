"use client";
import React, { useState } from "react";
import {
  GetAllAnswerAndQuestion,
  Id,
  InterTextQuestion,
  UserAndAllQuestionPack,
} from "../../interface";
import { TextField } from "@mui/material";
import {
  copy,
  modifyElementInUseStateArray2Dimension,
  setMap,
  setTextToFloat,
  waiting,
} from "./setup";
import FinishButton from "./FinishButton";
import scoreTextQuestions from "@/libs/camp/scoreTextQuestions";
import Waiting from "./Waiting";
interface DataReady {
  data: GetAllAnswerAndQuestion;
  textQuestions: InterTextQuestion[];
  token: string;
  campId: Id;
  update: () => Promise<GetAllAnswerAndQuestion>;
  readOnly: boolean | undefined;
}
function setDefaultScore(input: UserAndAllQuestionPack[]): number[][] {
  return input.map((v) =>
    v.questions.texts
      .map(copy)
      .sort((a, b) => a._id.toString().localeCompare(b._id.toString()))
      .sort((a, b) => a.order - b.order)
      .map((v2) => v2.answerScore)
  );
}
export default function AllAnswerAndQuestionPageBreakDown({
  dataReady: { data, campId, update, textQuestions, token, readOnly },
  setMode,
}: {
  dataReady: DataReady;
  setMode: (dataIn: GetAllAnswerAndQuestion) => UserAndAllQuestionPack[];
}) {
  const [textScores, setTextScores] = useState(setDefaultScore(setMode(data)));
  const [isTimeout, setTimeOut] = useState(false);
  function scoring() {
    waiting(async () => {
      await scoreTextQuestions(
        {
          scores: textScores.map((v, i) =>
            v.map((score, j) => ({
              score,
              id: setMode(data)[i].questions.texts[j].answerId,
            }))
          ),
          campId,
        },
        token
      );
      const buffer = await update();
      setTextScores(setDefaultScore(setMode(buffer)));
    }, setTimeOut);
  }
  return (
    <div>
      {isTimeout ? (
        <Waiting />
      ) : (
        <div>
          <table>
            <tr>
              <th>ชือเล่น</th>
              <th>ชื่อจริง</th>
              <th>นามสกุล</th>
              <th>เพศ</th>
              {textQuestions.map((v, i) => (
                <th key={i}>{v.question}</th>
              ))}
            </tr>
            {setMode(data).map((pack, i) => (
              <tr key={i}>
                <td>{pack.user.nickname}</td>
                <td>{pack.user.name}</td>
                <td>{pack.user.lastname}</td>
                <td>{pack.user.gender}</td>
                {pack.questions.texts
                  .map(copy)
                  .sort((a, b) =>
                    a._id.toString().localeCompare(b._id.toString())
                  )
                  .sort((a, b) => a.order - b.order)
                  .map((textQuestion, j) => (
                    <td key={j}>
                      <div>{textQuestion.answer}</div>
                      <div>
                        <TextField
                          defaultValue={textScores[i][j].toString()}
                          onChange={setTextToFloat(
                            setMap(
                              setTextScores,
                              modifyElementInUseStateArray2Dimension(i, j)
                            )
                          )}
                          type="number"
                          value={textScores[i][j].toString()}
                          inputProps={{ readOnly }}
                        />
                      </div>
                    </td>
                  ))}
              </tr>
            ))}
          </table>
          <FinishButton
            text="clear"
            onClick={() => setTextScores(setDefaultScore(setMode(data)))}
          />
          <FinishButton text="score" onClick={scoring} />
        </div>
      )}
    </div>
  );
}
