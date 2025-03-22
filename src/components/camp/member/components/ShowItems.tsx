"use client";

import { io } from "socket.io-client";
import {
  AllPlaceData,
  BasicCamp,
  Id,
  InterItem,
  InterPlace,
  Mode,
} from "../../../../../interface";
import {
  downloadText,
  getBackendUrl,
  setTextToInt,
} from "@/components/utility/setup";
import React from "react";
import { RealTimeItem } from "../../setup";
import { useDownloadExcel } from "react-export-table-to-excel";
import FinishButton from "@/components/utility/FinishButton";
import { Checkbox, MenuItem, Select, TextField } from "@mui/material";
import Image from "next/image";
import PlaceSelect from "@/components/randomthing/PlaceSelect";
import createOrder from "@/libs/camp/createOrder";

const socket = io(getBackendUrl());
export default function ShowItems({
  items: ItemsIn,
  camp,
  token,
  mode,
  allPlaceData,
  campMemberCardId,
  from,
}: {
  items: InterItem[];
  camp: BasicCamp;
  token: string;
  mode: Mode;
  allPlaceData: AllPlaceData;
  campMemberCardId: Id;
  from:
    | {
        partId: Id;
        baanId: Id;
      }
    | {
        baanId: Id;
        partId?: undefined;
      }
    | {
        partId: Id;
        baanId?: undefined;
      };
}) {
  const [items, setItems] = React.useState(ItemsIn);
  const [index, setIndex] = React.useState<number | null>(null);
  const [count, setCount] = React.useState(0);
  const [place, setPlace] = React.useState<InterPlace | null>(null);
  const [types, setTypes] = React.useState<"part" | "baan">(
    !from.baanId ? "part" : "baan"
  );
  const realTimeItem = new RealTimeItem(camp._id, socket);
  React.useEffect(() => {
    realTimeItem.listen(setItems);
    return () => {
      realTimeItem.disconect();
    };
  });
  const itemsReady = items.filter((item) => {
    if (item.canNongOrder) {
      return true;
    }
    if (!from.partId) {
      return false;
    }
    return item.canNongSee || mode == "pee";
  });
  const ref = React.useRef(null);
  const download = useDownloadExcel({
    currentTableRef: ref.current,
    filename: `ของทั้งหมดในค่าย${camp.campName}`,
  });
  if (itemsReady.length == 0) {
    return null;
  }
  if (mode == "nong" && !from.baanId) {
    return null;
  }
  return (
    <div>
      ของทั้งหมดในค่าย{camp.campName}
      <table ref={ref}>
        <tr>
          <th>ของอะไร</th>
          <th>รูปภาพ</th>
          <th>{camp.nongCall}สามารถดูของได้หรือไม่</th>
          <th>{camp.nongCall}สามารถสั่งได้หรือไม่</th>
          <th>เหลือเท่าไหร่</th>
          <th>จำนวน</th>
          <th>สถานที่</th>
          {mode == "pee" && from.partId && from.baanId ? <th>ในนาม</th> : null}
          <th>action</th>
        </tr>
        {items.map((item, i) => {
          if (index == i) {
            return (
              <tr key={i}>
                <td>{item.name}</td>
                <td>
                  {item.imageLink ? (
                    <Image
                      src={item.imageLink}
                      alt={""}
                      width={180}
                      height={37}
                    />
                  ) : null}
                </td>
                <td>
                  <Checkbox checked={item.canNongSee} readOnly />
                </td>
                <td>
                  <Checkbox checked={item.canNongOrder} readOnly />
                </td>
                <td>{item.remain}</td>
                <td>
                  <TextField
                    onChange={setTextToInt(setCount)}
                    value={count.toString()}
                    type='number'
                  />
                </td>
                <td>
                  <PlaceSelect
                    allPlaceData={allPlaceData}
                    place={place}
                    onClick={setPlace}
                    placeText="สถานที่ที่จะให้ส่ง"
                    buildingText="ตึกทีจะให้ส่ง"
                  />
                </td>
                {mode == "pee" && from.partId && from.baanId ? (
                  <td>
                    <Select
                      value={types}
                      renderValue={() => {
                        switch (types) {
                          case "part":
                            return "ฝ่าย";
                          case "baan":
                            return "บ้าน";
                        }
                      }}
                    >
                      <MenuItem onClick={() => setTypes("baan")}>บ้าน</MenuItem>
                      <MenuItem onClick={() => setTypes("part")}>ฝ่าย</MenuItem>
                    </Select>
                  </td>
                ) : null}
                <td>
                  <FinishButton
                    text="order"
                    onClick={() => {
                      if (place) {
                        createOrder(
                          {
                            time: new Date(Date.now()),
                            types,
                            campMemberCardId,
                            count,
                            itemId: item._id,
                            placeId: place._id,
                            fromId: !from.baanId
                              ? from.partId
                              : !from.partId
                              ? from.baanId
                              : types == "baan"
                              ? from.baanId
                              : from.partId,
                          },
                          token,
                          socket
                        );
                      }
                    }}
                  />
                </td>
              </tr>
            );
          } else {
            return (
              <tr key={i}>
                <td>{item.name}</td>
                <td>
                  {item.imageLink ? (
                    <Image
                      src={item.imageLink}
                      alt={""}
                      width={180}
                      height={37}
                    />
                  ) : null}
                </td>
                <td>
                  <Checkbox checked={item.canNongSee} readOnly />
                </td>
                <td>
                  <Checkbox checked={item.canNongOrder} readOnly />
                </td>
                <td>{item.remain}</td>
                <td></td>
                <td></td>
                {mode == "pee" && from.partId && from.baanId ? <td></td> : null}
                <td>
                  <FinishButton
                    text="select"
                    onClick={() => {
                      setIndex(i);
                    }}
                  />
                </td>
              </tr>
            );
          }
        })}
      </table>
      <FinishButton text={downloadText} onClick={download.onDownload} />
    </div>
  );
}
