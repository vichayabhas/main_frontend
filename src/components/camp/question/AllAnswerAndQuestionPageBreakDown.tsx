"use client";

import {
  copy,
  waiting,
  setTextToFloat,
  setMap,
  modifyElementInUseStateArray2Dimension,
  downloadText,
  getBackendUrl,
  SocketReady,
} from "@/components/utility/setup";
import FinishButton from "@/components/utility/FinishButton";
import Waiting from "@/components/utility/Waiting";
import scoreTextQuestions from "@/libs/camp/scoreTextQuestions";
import { TextField } from "@mui/material";
import React from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import {
  GetAllAnswerAndQuestion,
  InterTextQuestion,
  Id,
  UserAndAllQuestionPack,
  ScoreEvent,
} from "../../../../interface";
import { io } from "socket.io-client";
const socket = io(getBackendUrl());

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
  types,
}: {
  dataReady: DataReady;
  setMode: (dataIn: GetAllAnswerAndQuestion) => UserAndAllQuestionPack[];
  types: string;
}) {
  const room = `${campId.toString()}${types}`;
  const socketReady = new SocketReady<ScoreEvent>(socket, "scoreTextAnswer");
  const [textScores, setTextScores] = React.useState(
    setDefaultScore(setMode(data))
  );
  const [isTimeout, setTimeOut] = React.useState(false);
  React.useEffect(() => {
    socketReady.listen(room, ({ i, j, score }: ScoreEvent) => {
      setMap(
        setTextScores,
        modifyElementInUseStateArray2Dimension(i, j)
      )(score);
      console.log({ i, score, j });
    });
  });
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
  const ref = React.useRef(null);
  const download = useDownloadExcel({
    currentTableRef: ref.current,
    filename: `คะแนน ${types}`,
  });
  return (
    <div>
      {isTimeout ? (
        <Waiting />
      ) : (
        <div>
          <table ref={ref}>
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
                          onChange={setTextToFloat(
                            // setMap(
                            //   setTextScores,
                            //   modifyElementInUseStateArray2Dimension(i, j)
                            // )
                            (score) => {
                              socketReady.trigger({ i, j, score }, room);
                            }
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
          <FinishButton text={downloadText} onClick={download.onDownload} />
          <FinishButton
            text="clear"
            onClick={() => setTextScores(setDefaultScore(setMode(data)))}
          />
          {data.canScoring ? (
            <FinishButton text="score" onClick={scoring} />
          ) : null}
        </div>
      )}
    </div>
  );
}
