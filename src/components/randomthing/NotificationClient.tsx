"use client";
import React from "react";
import { GetNotification, TriggerNotification } from "../../../interface";
import {
  getBackendUrl,
  modifyElementInUseStateArray,
  notify,
  setMap,
  SocketReady,
} from "../utility/setup";
import { io } from "socket.io-client";
const socket = io(getBackendUrl());
export default function NotificationClient({
  datas,
}: {
  datas: GetNotification[];
}) {
  const [, setCountDowns] = React.useState(datas.map((data) => data.countDown));
  const [messages, setMessages] = React.useState(
    datas.map((data) => data.message)
  );
  React.useEffect(() => {
    const cleanup = SocketReady.listenMany<TriggerNotification>(
      (data, room) => {
        datas.forEach((d, i) => {
          if (d.id === room && data.types == d.types) {
            setMap(
              setCountDowns,
              modifyElementInUseStateArray(i)
            )(data.countDown);
            setMap(setMessages, modifyElementInUseStateArray(i))(data.message);
          }
        });
      },
      "updateNotification",
      socket
    );
    const interval = setInterval(() => {
      setCountDowns((prev) => {
        const newCountDowns = prev.map((countDown, i) => {
          if (countDown > 0) {
            return countDown - 1;
          } else {
            if (countDown == 0) {
              notify(messages[i]);
              return datas[i].notificationEveryMinute * 60;
            } else {
              return -1;
            }
          }
        });
        return newCountDowns;
      });
    }, 1000);
    return () => {
      cleanup();
      clearInterval(interval);
    };
  });

  return <></>;
}
