"use client";
import React, { useRef, useState } from "react";
import {
  FoodLimit,
  GetFoodForUpdate,
  UpdateTimeOffsetRaw,
} from "../../interface";
import { Checkbox, TextField } from "@mui/material";
import {
  downloadText,
  peeLookupNong,
  setBoolean,
  setSwop,
  setTextToString,
  SetUpDownPack,
} from "./setup";
import GetTimeHtml from "./GetTimeHtml";
import FinishButton from "./FinishButton";
import updateFood from "@/libs/randomthing/updateFood";
import AllInOneLock from "./AllInOneLock";
import deleteFood from "@/libs/randomthing/deleteFood";
import { useDownloadExcel } from "react-export-table-to-excel";
export default function FoodClient({
  timeOffset,
  food,
  token,
}: {
  timeOffset: UpdateTimeOffsetRaw;
  food: GetFoodForUpdate;
  token: string;
}) {
  const [name, setName] = useState(food.name);
  const [isSpicy, setIsSpicy] = useState(food.isSpicy);
  const {
    up: isWhiteList,
    down: listPriority,
    setDown: setListPriority,
    setUp: setIsWhiteList,
  } = new SetUpDownPack(
    useState(SetUpDownPack.init(food.isWhiteList, food.listPriority))
  );

  const [มังสวิรัติ, setมังสวิรัติ] = useState(
    food.lists.includes("มังสวิรัติ")
  );
  const [เจ, setเจ] = useState(food.lists.includes("เจ"));
  const [อิสลาม, setอิสลาม] = useState(food.lists.includes("อิสลาม"));
  const [nongCampMemberCardIds, setNongCampMemberCardIds] = useState(
    food.nongCampMemberCardIds
  );
  const [peeCampMemberCardIds, setPeeCampMemberCardIds] = useState(
    food.peeCampMemberCardIds
  );
  const [petoCampMemberCardIds, setPetoCampMemberCardIds] = useState(
    food.petoCampMemberCardIds
  );
  const ref = useRef(null);
  const download = useDownloadExcel({
    currentTableRef: ref.current,
    filename: `ข้อมูลแพ้อาหาร${food.camp.campName}`,
  });
  return (
    <div>
      <div>
        <div>วันเวลา</div>
        <div>
          <GetTimeHtml input={food.time} offset={timeOffset} />
        </div>
      </div>
      <form
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
            defaultValue={name}
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
            onChange={setIsWhiteList}
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
            onChange={setListPriority}
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
      </form>
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
            food.camp.memberStructure ==
              "nong->highSchool,pee->1year,peto->2upYear"
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
                <td>พี่{food.camp.groupName}</td>
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
              <td>น้องค่าย</td>
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
            token
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
