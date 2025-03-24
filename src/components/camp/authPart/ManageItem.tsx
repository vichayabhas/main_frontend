"use client";

import { io } from "socket.io-client";
import { GetOrderForAdmin } from "../../../../interface";
import {
  downloadText,
  getBackendUrl,
  setBoolean,
  setTextToInt,
  setTextToString,
  SetUpDownPack,
} from "@/components/utility/setup";
import React from "react";
import { RealTimeCamp } from "./UpdateCampClient";
import { RealTimeItem, RealTimeOrder } from "../setup";
import { useDownloadExcel } from "react-export-table-to-excel";
import { Checkbox, TextField } from "@mui/material";
import TypingImageSource from "@/components/utility/TypingImageSource";
import FinishButton from "@/components/utility/FinishButton";
import updateItem from "@/libs/camp/updateItem";
import deleteItem from "@/libs/camp/deleteItem";
import Image from "next/image";
import createItem from "@/libs/camp/createItem";
import completeOrder from "@/libs/camp/completeOrder";
import deleteOrder from "@/libs/camp/deleteOrder";
import GetTimeHtml from "@/components/utility/GetTimeHtml";

const socket = io(getBackendUrl());
export default function ManageItem({
  data,
  token,
}: {
  data: GetOrderForAdmin;
  token: string;
}) {
  const [name, setName] = React.useState("");
  const [imageLink, setImageLink] = React.useState<string | null>(null);
  const [remain, setRemain] = React.useState(0);
  const {
    up: canNongSee,
    down: canNongOrder,
    setUp: setCanNongSee,
    setDown: setCanNongOrder,
  } = new SetUpDownPack(React.useState(SetUpDownPack.init(false, false)));
  const [index, setIndex] = React.useState<null | number>(null);
  const [items, setItems] = React.useState(data.items);
  const [orders, setOrders] = React.useState(data.orders);
  const [camp, setCamp] = React.useState(data.camp);
  const realTimeCamp = new RealTimeCamp(camp._id, socket);
  const realTimeItem = new RealTimeItem(camp._id, socket);
  const realTimeOrder = new RealTimeOrder(camp._id, socket,'camp');
  React.useEffect(() => {
    realTimeCamp.listen(setCamp);
    realTimeItem.listen(setItems);
    realTimeOrder.listen(setOrders);
    return () => {
      realTimeCamp.disconnect();
      realTimeItem.disconnect();
      realTimeOrder.disconnect();
    };
  });
  const itemRef = React.useRef(null);
  const orderRef = React.useRef(null);
  const itemDownload = useDownloadExcel({
    currentTableRef: itemRef.current,
    filename: `ของทั้งหมดในค่าย${camp.campName}`,
  });
  const orderDownload = useDownloadExcel({
    currentTableRef: orderRef.current,
    filename: `orderทั้งหมดในค่าย${camp.campName}`,
  });
  return (
    <div>
      ของทั้งหมดในค่าย{camp.campName}
      <table ref={itemRef}>
        <tr>
          <th>ของอะไร</th>
          <th>รูปภาพ</th>
          <th>{camp.nongCall}สามารถดูของได้หรือไม่</th>
          <th>{camp.nongCall}สามารถสั่งได้หรือไม่</th>
          <th>เหลือเท่าไหร่</th>
          <th>action</th>
        </tr>
        {items.map((item, i) => {
          if (index == i) {
            return (
              <tr key={i}>
                <td>
                  <TextField value={name} onChange={setTextToString(setName)} />
                </td>
                <td>
                  <TypingImageSource
                    onChange={setImageLink}
                    defaultSrc={imageLink}
                  />
                </td>
                <td>
                  <Checkbox
                    onChange={setBoolean(setCanNongSee)}
                    checked={canNongSee}
                  />
                </td>
                <td>
                  <Checkbox
                    onChange={setBoolean(setCanNongOrder)}
                    checked={canNongOrder}
                  />
                </td>
                <td>
                  <TextField
                    type="number"
                    onChange={setTextToInt(setRemain)}
                    value={remain.toString()}
                  />
                </td>
                <td>
                  <FinishButton
                    text="update"
                    onClick={() => {
                      updateItem(
                        {
                          name,
                          canNongOrder,
                          imageLink,
                          remain,
                          canNongSee,
                          _id: item._id,
                        },
                        token,
                        camp._id,
                        socket
                      );
                    }}
                  />
                  <FinishButton
                    text="delete"
                    onClick={() => {
                      deleteItem(item._id, token, camp._id, socket);
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
                <td>
                  <FinishButton
                    text="select"
                    onClick={() => {
                      setIndex(i);
                      setCanNongOrder(item.canNongOrder);
                      setCanNongSee(item.canNongSee);
                      setImageLink(item.imageLink);
                      setName(item.name);
                      setRemain(item.remain);
                    }}
                  />
                </td>
              </tr>
            );
          }
        })}
        {index == null ? (
          <tr>
            <td>
              <TextField value={name} onChange={setTextToString(setName)} />
            </td>
            <td>
              <TypingImageSource
                onChange={setImageLink}
                defaultSrc={imageLink}
              />
            </td>
            <td>
              <Checkbox
                onChange={setBoolean(setCanNongSee)}
                checked={canNongSee}
              />
            </td>
            <td>
              <Checkbox
                onChange={setBoolean(setCanNongOrder)}
                checked={canNongOrder}
              />
            </td>
            <td>
              <TextField
                type="number"
                onChange={setTextToInt(setRemain)}
                value={remain.toString()}
              />
            </td>
            <td>
              <FinishButton
                text="create"
                onClick={() => {
                  createItem(
                    {
                      name,
                      canNongOrder,
                      imageLink,
                      remain,
                      canNongSee,
                      campId: camp._id,
                    },
                    token,
                    camp._id,
                    socket
                  );
                }}
              />
            </td>
          </tr>
        ) : (
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <FinishButton
              text="new"
              onClick={() => {
                setIndex(null);
              }}
            />
          </tr>
        )}
      </table>
      <FinishButton text={downloadText} onClick={itemDownload.onDownload} />
      orderทั้งหมดในค่าย{camp.campName}
      <table ref={orderRef}>
        <tr>
          <th>ของอะไร</th>
          <th>รูปภาพ</th>
          <th>จำนวน</th>
          <th>เวลา</th>
          <th>ส่งที่ตึก</th>
          <th>ชั้น</th>
          <th>ห้อง</th>
          <th>จาก</th>
          <th>คนสั่งชื่อ</th>
          <th>สำเร็จหรือยัง</th>
          <th>action</th>
        </tr>
        {orders.map((order, i) => {
          return (
            <tr key={i}>
              <td>{order.item.name}</td>
              <td>
                {order.item.imageLink ? (
                  <Image
                    src={order.item.imageLink}
                    alt={""}
                    width={180}
                    height={37}
                  />
                ) : null}
              </td>
              <td>{order.count}</td>
              <td>
                <GetTimeHtml input={order.time} offset={data.displayOffset} />
              </td>
              <td>{order.place.buildingName}</td>
              <td>{order.place.floor}</td>
              <td>{order.place.room}</td>
              <td>{order.fromName}</td>
              <td>
                {order.fromUser.nickname} {order.fromUser.name}{" "}
                {order.fromUser.lastname}
              </td>
              <td>
                <Checkbox checked={order.isComplete} readOnly />
              </td>
              <td>
                <FinishButton
                  text="complete"
                  onClick={() => completeOrder(order._id, token, socket)}
                />
                <FinishButton
                  text="delete"
                  onClick={() => deleteOrder(order._id, token, socket)}
                />
              </td>
            </tr>
          );
        })}
      </table>
      <FinishButton text={downloadText} onClick={orderDownload.onDownload} />
    </div>
  );
}
/**
 * export interface ShowOrder {
   time: Date;
   count: number;
   types: "part" | "baan";
   campMemberCardId: Id;
   place: ShowPlace;
   _id: Id;
   fromName: string;
   fromUser: BasicUser;
   item: InterItem;
 }
 */
