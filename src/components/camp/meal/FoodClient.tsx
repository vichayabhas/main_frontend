"use client";
import { FoodLimit, GetFoodForUpdate, InterFood } from "../../../../interface";
import { Checkbox, TextField } from "@mui/material";
import {
  downloadText,
  getBackendUrl,
  peeLookupNong,
  setBoolean,
  setSwop,
  setTextToString,
  SetUpDownPack,
  SocketReady,
} from "../../utility/setup";

import deleteFood from "@/libs/randomthing/deleteFood";
import { useDownloadExcel } from "react-export-table-to-excel";
import AllInOneLock from "@/components/utility/AllInOneLock";
import FinishButton from "@/components/utility/FinishButton";
import GetTimeHtml from "@/components/utility/GetTimeHtml";
import updateFood from "@/libs/randomthing/updateFood";
import React from "react";
import { io } from "socket.io-client";
import { RealTimeCamp } from "../authPart/UpdateCampClient";

const socket = io(getBackendUrl());
export default function FoodClient({
  food,
  token,
}: {
  food: GetFoodForUpdate;
  token: string;
}) {
  const updateFoodSocket = new SocketReady<InterFood>(socket, "updateFood");
  const room = food._id.toString();
  const [name, setName] = React.useState(food.name);
  const [isSpicy, setIsSpicy] = React.useState(food.isSpicy);
  const {
    up: isWhiteList,
    down: listPriority,
    setDown: setListPriority,
    setUp: setIsWhiteList,
  } = new SetUpDownPack(
    React.useState(SetUpDownPack.init(food.isWhiteList, food.listPriority))
  );

  const [มังสวิรัติ, setมังสวิรัติ] = React.useState(
    food.lists.includes("มังสวิรัติ")
  );
  const [เจ, setเจ] = React.useState(food.lists.includes("เจ"));
  const [อิสลาม, setอิสลาม] = React.useState(food.lists.includes("อิสลาม"));
  const [nongCampMemberCardIds, setNongCampMemberCardIds] = React.useState(
    food.nongCampMemberCardIds
  );
  const [peeCampMemberCardIds, setPeeCampMemberCardIds] = React.useState(
    food.peeCampMemberCardIds
  );
  const [petoCampMemberCardIds, setPetoCampMemberCardIds] = React.useState(
    food.petoCampMemberCardIds
  );
  const [camp, setCamp] = React.useState(food.camp);
  const realTimeCamp = new RealTimeCamp(camp._id, socket);
  React.useEffect(() => {
    updateFoodSocket.listen(room, (data) => {
      setListPriority(data.listPriority);
      setIsWhiteList(data.isWhiteList);
      setมังสวิรัติ(data.lists.includes("มังสวิรัติ"));
      setเจ(data.lists.includes("เจ"));
      setอิสลาม(data.lists.includes("อิสลาม"));
      setNongCampMemberCardIds(data.nongCampMemberCardIds);
      setPeeCampMemberCardIds(data.peeCampMemberCardIds);
      setPetoCampMemberCardIds(data.petoCampMemberCardIds);
    });
    realTimeCamp.listen(setCamp);
    return () => {
      updateFoodSocket.disconnect();
      realTimeCamp.disconnect();
    };
  });
  const ref = React.useRef(null);
  const download = useDownloadExcel({
    currentTableRef: ref.current,
    filename: `ข้อมูลแพ้อาหาร${camp.campName}`,
  });
  return (
    <div>
      <div>
        <div>วันเวลา</div>
        <div>
          <GetTimeHtml input={food.time} offset={food.displayOffset} />
        </div>
      </div>
      <div
        className="w-[70%] items-center p-10 rounded-3xl"
        style={{
          backgroundColor: "#961A1D",
        }}
      >
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">อาหารอะไร</label>
          <TextField
            name="Email"
            id="Email"
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
            onChange={setTextToString(setName)}
            value={name}
            required
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">เผ็ดหรือไม่</label>
          <Checkbox
            onChange={setBoolean(setIsSpicy)}
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            checked={isSpicy}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            อาหารนี้สำหรับคนที่แพ้อาหารหรือไม่
          </label>
          <Checkbox
            onChange={setBoolean(setIsWhiteList)}
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            checked={isWhiteList}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            อาหารนี้เฉพาะเจาะจงหรือไม่
          </label>
          <Checkbox
            onChange={setBoolean(setListPriority)}
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            checked={listPriority}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">อิสลาม</label>
          <Checkbox
            onChange={setBoolean(setอิสลาม)}
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            checked={อิสลาม}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">มังสวิรัติ</label>
          <Checkbox
            onChange={setBoolean(setมังสวิรัติ)}
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            checked={มังสวิรัติ}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">เจ</label>
          <Checkbox
            onChange={setBoolean(setเจ)}
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            checked={เจ}
          />
        </div>
      </div>
      <table ref={ref}>
        <tr>
          <th>ชื่อเล่น</th>
          <th>ชื่อจริง</th>
          <th>นามสกุล</th>
          <th>บทบาท</th>
          <th>แพ้อาหารอะไรบ้าง</th>
          <th>เน้นย้ำเรื่องอาหารอะไรบ้าง</th>
          <th>กินเผ็ดได้หรือไม่</th>
          <th>check</th>
        </tr>
        {peeLookupNong(
          peeLookupNong(
            camp.memberStructure == "nong->highSchool,pee->1year,peto->2upYear"
              ? food.petoHealths.map((peto, i) => (
                  <tr key={i}>
                    <td>{peto.user.nickname}</td>
                    <td>{peto.user.name}</td>
                    <td>{peto.user.lastname}</td>
                    <td>ปีโต</td>
                    <td>{peto.heathIssue.food}</td>
                    <td>{peto.heathIssue.foodConcern}</td>
                    <td>{peto.heathIssue.spicy ? "ไม่ได้" : "ได้"}</td>
                    <td>
                      <Checkbox
                        onChange={setSwop(
                          peto.campMemberCardId,
                          setPetoCampMemberCardIds
                        )}
                        checked={petoCampMemberCardIds.includes(
                          peto.campMemberCardId
                        )}
                      />
                    </td>
                  </tr>
                ))
              : [],
            food.peeHealths.map((pee, i) => (
              <tr key={i}>
                <td>{pee.user.nickname}</td>
                <td>{pee.user.name}</td>
                <td>{pee.user.lastname}</td>
                <td>พี่{camp.groupName}</td>
                <td>{pee.heathIssue.food}</td>
                <td>{pee.heathIssue.foodConcern}</td>
                <td>{pee.heathIssue.spicy ? "ไม่ได้" : "ได้"}</td>
                <td>
                  <Checkbox
                    onChange={setSwop(
                      pee.campMemberCardId,
                      setPeeCampMemberCardIds
                    )}
                    checked={peeCampMemberCardIds.includes(
                      pee.campMemberCardId
                    )}
                  />
                </td>
              </tr>
            ))
          ),
          food.nongHealths.map((nong, i) => (
            <tr key={i}>
              <td>{nong.user.nickname}</td>
              <td>{nong.user.name}</td>
              <td>{nong.user.lastname}</td>
              <td>{camp.nongCall}</td>
              <td>{nong.heathIssue.food}</td>
              <td>{nong.heathIssue.foodConcern}</td>
              <td>{nong.heathIssue.spicy ? "ไม่ได้" : "ได้"}</td>
              <td>
                <Checkbox
                  onChange={setSwop(
                    nong.campMemberCardId,
                    setNongCampMemberCardIds
                  )}
                  checked={nongCampMemberCardIds.includes(
                    nong.campMemberCardId
                  )}
                />
              </td>
            </tr>
          ))
        )}
      </table>
      <FinishButton text={downloadText} onClick={download.onDownload} />
      <FinishButton
        text="update"
        onClick={() => {
          const lists: FoodLimit[] = [];
          if (อิสลาม) {
            lists.push("อิสลาม");
          }
          if (มังสวิรัติ) {
            lists.push("มังสวิรัติ");
          }
          if (เจ) {
            lists.push("เจ");
          }
          updateFood(
            {
              listPriority,
              lists,
              name,
              nongCampMemberCardIds,
              peeCampMemberCardIds,
              petoCampMemberCardIds,
              isSpicy,
              isWhiteList,
              _id: food._id,
            },
            token,
            updateFoodSocket,
            room,
            socket
          );
        }}
      />
      <AllInOneLock token={token}>
        <FinishButton
          text="delete"
          onClick={() => deleteFood(food._id, token)}
        />
      </AllInOneLock>
    </div>
  );
}
