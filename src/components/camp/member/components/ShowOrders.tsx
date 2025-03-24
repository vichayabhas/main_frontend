"use client";

import { downloadText, getBackendUrl } from "@/components/utility/setup";
import { io } from "socket.io-client";
import {
  Id,
  Mode,
  RoleCamp,
  ShowOrder,
  UpdateTimeOffsetRaw,
} from "../../../../../interface";
import React from "react";
import { RealTimeOrder } from "../../setup";
import FinishButton from "@/components/utility/FinishButton";
import Image from "next/image";
import GetTimeHtml from "@/components/utility/GetTimeHtml";
import { Checkbox } from "@mui/material";
import { useDownloadExcel } from "react-export-table-to-excel";

const socket = io(getBackendUrl());
export default function ShowOrders({
  orders: ordersIn,
  roomId,
  mode,
  role,
  displayOffset,
  filename,
  types,
}: {
  orders: ShowOrder[];
  roomId: Id;
  mode: Mode;
  role: RoleCamp;
  displayOffset: UpdateTimeOffsetRaw;
  filename: string;
  types: "camp" | "campMemberCard" | "baan" | "part";
}) {
  const [orders, setOrders] = React.useState(ordersIn);
  const ordersReady = orders.filter((order) => {
    const { item } = order;
    if (item.canNongOrder) {
      return true;
    }
    if (role == "nong") {
      return false;
    }
    return item.canNongSee || mode == "pee";
  });
  const realTimeOrder = new RealTimeOrder(roomId, socket, types);
  React.useEffect(() => {
    realTimeOrder.listen(setOrders);
    return () => {
      realTimeOrder.disconnect();
    };
  });
  const orderRef = React.useRef(null);
  const orderDownload = useDownloadExcel({
    currentTableRef: orderRef.current,
    filename,
  });
  if (ordersReady.length == 0) {
    return null;
  }
  return (
    <div>
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
        {ordersReady.map((order, i) => {
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
                <GetTimeHtml input={order.time} offset={displayOffset} />
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
            </tr>
          );
        })}
      </table>
      <FinishButton text={downloadText} onClick={orderDownload.onDownload} />
    </div>
  );
}
