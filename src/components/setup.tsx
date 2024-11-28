import mongoose from "mongoose";
import {
  InterSize,
  InterActionPlan,
  MapObjectId,
  MyMap,
  HeathIssueBody,
  Id,
  UpdateTimeOffsetRaw,
} from "../../interface";
import dayjs from "dayjs";
import React from "react";
import getUserProfile from "@/libs/user/getUserProfile";
import getTimeOffset from "@/libs/user/getTimeOffset";
import { Session } from "next-auth";
export function startSize(): Map<
  "S" | "M" | "L" | "XL" | "XXL" | "3XL",
  number
> {
  const size: Map<"S" | "M" | "L" | "XL" | "XXL" | "3XL", number> = new Map();
  const s: ("S" | "M" | "L" | "XL" | "XXL" | "3XL")[] = [
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "3XL",
  ];
  s.forEach((e: "S" | "M" | "L" | "XL" | "XXL" | "3XL") => {
    size.set(e, 0);
  });
  return size;
}

export function calculate(
  input: unknown | number | undefined,
  plus: unknown | number | undefined,
  minus: unknown | number | undefined
) {
  return (input as number) + (plus as number) - (minus as number);
}
export const resOk = { success: true };
export const resError = { success: false };

export function sizeMapToJson(
  input: Map<"S" | "M" | "L" | "XL" | "XXL" | "3XL", number>
): InterSize {
  const out: InterSize = {
    _id: null,
    sizeS: input.get("S") as number,
    sizeM: input.get("M") as number,
    sizeL: input.get("L") as number,
    sizeXL: input.get("XL") as number,
    sizeXXL: input.get("XXL") as number,
    size3XL: input.get("3XL") as number,
  };
  return out;
}
export function sizeJsonMod(
  size: "S" | "M" | "L" | "XL" | "XXL" | "3XL",
  count: number,
  input: InterSize
): InterSize {
  switch (size) {
    case "S": {
      input.sizeS = input.sizeS + count;
      break;
    }
    case "M": {
      input.sizeM = input.sizeM + count;
      break;
    }
    case "L": {
      input.sizeL = input.sizeL + count;
      break;
    }
    case "XL": {
      input.sizeXL = input.sizeXL + count;
      break;
    }
    case "XXL": {
      input.sizeXXL = input.sizeXXL + count;
      break;
    }
    case "3XL": {
      input.size3XL = input.size3XL + count;
      break;
    }
  }
  return input;
}

export function mapBoolToArray(input: Map<Id, boolean>): Id[] {
  const out: Id[] = [];
  input.forEach((v: boolean, k: Id) => {
    if (v) {
      out.push(k);
    }
  });
  return out;
}
export function mapStringToMyMap(input: Map<Id, string>): MyMap[] {
  const out: MyMap[] = [];
  input.forEach((value: string, key: Id) => {
    out.push({ key, value });
  });
  return out;
}
export function mapObjectIdToMyMap(input: Map<Id, Id>): MapObjectId[] {
  const out: MapObjectId[] = [];
  input.forEach((value: Id, key: Id) => {
    out.push({ key, value });
  });
  return out;
}
/*export function myMapToMapString(input: MyMap[]): Map<string, string> {
    const map: Map<string, string> = new Map
    input.forEach((v) => {
        map.set(v.key, v.value)
    })
    return map

}*/

export function isInTime(start: Date, end: Date): boolean {
  const now = new Date(Date.now());
  return now > start && now < end;
}
export function plusActionPlan(
  input: InterActionPlan,
  minute: number
): InterActionPlan {
  const {
    start,
    end,
    partId,
    placeIds,

    action,
    headId,
    body,
    _id,
    partName,
  } = input;
  return {
    start: dayjs(start).add(minute, "minutes").toDate(),
    end: dayjs(end).add(minute, "minutes").toDate(),
    partId,
    placeIds,
    action,
    headId,
    body,
    _id,
    partName,
  };
}
export function getBackendUrl() {
  return process.env.NEXT_PUBLIC_BACKEND_URL;
}
export const userPath = "api/v1/auth";
export function hasKey(input: MyMap[] | MapObjectId[], id: Id): boolean {
  let i = 0;
  while (i < input.length) {
    if (input[i++].key === id) {
      return true;
    }
  }
  return false;
}
export function getValue(input: MyMap[], id: Id): string {
  let i = 0;
  while (i < input.length) {
    if (!input[i++].key.toString().localeCompare(id.toString())) {
      return input[i - 1].value;
    }
  }
  return "";
}
export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  if (value === null || value === undefined) return false;
  return true;
}
export const sendNotification = () => {
  if (!("Notification" in window)) {
    throw new Error("Your browser does not support push notification");
  }
  Notification.requestPermission().then(() => {
    const notificationOptions = {
      body: "Welcome to Javascript Push Notification",
      //icon:"./image.png"
    };
    new Notification("Push Notification", notificationOptions);
  });
};
export function addTime(
  input: dayjs.ConfigType,
  add: UpdateTimeOffsetRaw
): Date {
  return dayjs(input)
    .add(-add.day, "days")
    .add(-add.hour, "hours")
    .add(-add.minute, "minutes")
    .toDate();
}
export function peeLookupNong<P, N>(pees: P[], nongs: N[]): (P | N)[] {
  if (pees.length == 0) {
    return nongs;
  }
  if (pees.length == 1) {
    const outs: (P | N)[] = pees;
    nongs.forEach((nong) => outs.push(nong));
    return outs;
  }
  const mp = pees.length;
  const mn = nongs.length;
  let n = 0;
  let p = 0;
  const outs: (P | N)[] = [];
  let i = 0;
  if (mp > mn) {
    let count = mp / (mn + 1);
    const exc = mp % (mn + 1);
    if (exc) {
      outs.push(pees[p++]);
      count--;
    }
    let j = 0;
    while (j < count) {
      outs.push(pees[p++]);
      j++;
    }
    while (i < mn) {
      outs.push(nongs[n++]);
      if (exc > ++i) {
        outs.push(pees[p++]);
      }
      let j = 0;
      while (j < count) {
        outs.push(pees[p++]);
        j++;
      }
    }
  } else {
    let count = mn / (mp - 1);
    const exc = mn % (mp - 1);
    outs.push(pees[p++]);
    if (exc) {
      outs.push(nongs[n++]);
      count--;
    }
    let j = 0;
    while (j < count) {
      outs.push(nongs[n++]);
      j++;
    }
    while (i < mp - 2) {
      outs.push(pees[p++]);
      if (exc > ++i) {
        outs.push(nongs[n++]);
      }
      let j = 0;
      while (j < count) {
        outs.push(nongs[n++]);
        j++;
      }
    }
    outs.push(pees[p++]);
  }
  return outs;
}
export const departures = [
  "วิศวกรรมเคมี (Chemical Engineering)",
  "วิศวกรรมเคมีและกระบวนการ (นานาชาติ) (Chemical and Process Engineering)",
  "วิศวกรรมเครื่องกล (Mechanical Engineering)",
  "วิศวกรรมเรือ (Naval Architecture and Marine Engineering)",
  "วิศวกรรมยานยนต์ (Automotive Engineering)",
  "วิศวกรรมไฟฟ้า (Electrical Engineering)",
  "วิศวกรรมโยธา (Civil Engineering)",
  "วิศวกรรมโลหการและวัสดุ (Metallurgical and Materials Engineering)",
  "วิศวกรรมสิ่งแวดล้อม (Environmental Engineering)",
  "วิศวกรรมสำรวจ (Survey Engineering)",
  "วิศวกรรมทรัพยากรธรณี (Georesources Engineering)",
  "วิศวกรรมปิโตรเลียม (Petroleum Engineering)",
  "วิศวกรรมอุตสาหการ (Industrial Engineering)",
  "วิศวกรรมคอมพิวเตอร์ (Computer Engineering)",
  "วิศวกรรมคอมพิวเตอร์และเทคโนโลยีดิจิทัล (หลักสูตร Sandbox) (Computer Engineering and Digital Technology)",
  "วิศวกรรมนิวเคลียร์และรังสี (Nuclear and Radiological Engineering)",
  "วิศวกรรมนาโน (นานาชาติ)** (Nano-Engineering)",
  "วิศวกรรมการออกแบบและการผลิตยานยนต์ (นานาชาติ)** (Automotive Design and Manufacturing Engineering)",
  "วิศวกรรมอากาศยาน (นานาชาติ)** (Aerospace Engineering)",
  "วิศวกรรมสารสนเทศและการสื่อสาร (นานาชาติ)** (Information and Communication Engineering)",
  "วิศวกรรมหุ่นยนต์และปัญญาประดิษฐ์ (นานาชาติ)** (Robotics and Artificial Intelligence Engineering)",
] as const;
export const zeroTimeOffset: UpdateTimeOffsetRaw = {
  minute: 0,
  hour: 0,
  day: 0,
};
export function getId(input: { _id: Id } | null) {
  if (input) {
    return input._id;
  }
  return null;
}
export const emptyHealthIssue: HeathIssueBody = {
  food: "",
  chronicDisease: "",
  medicine: "",
  extra: "",
  isWearing: false,
  spicy: false,
  foodConcern: "",
  foodLimit: "ไม่มีข้อจำกัดด้านความเชื่อ",
};
export function getDifferentMinute(start: Date, end: Date) {
  return dayjs(end).diff(start, "minute");
}
export function stringToId(input: string) {
  return new mongoose.Types.ObjectId(input);
}
export function removeElementInUseStateArray(
  e: unknown,
  i: number,
  a: unknown[]
) {
  return i < a.length - 1;
}
export function modifyElementInUseStateArray<T>(
  i: number
): (v: T, array: T[]) => T[] {
  return (v: T, array: T[]) => {
    return array.map((v2: T, i2: number) => {
      if (i == i2) {
        return v;
      } else {
        return v2;
      }
    });
  };
}
export function copyArray<T>(input: T[]): T[] {
  return input.map((e) => e);
}
export async function waiting(
  update: () => Promise<void>,
  setTimeOut: (isTimeout: boolean) => void
) {
  setTimeOut(true);
  await update();
  setTimeOut(false);
}
export function copy<T>(input: T): T {
  return input;
}
export function modifyElementInUseStateArray2Dimension<T>(
  i1: number,
  i2: number
): (v: T, array: T[][]) => T[][] {
  return (value: T, arrays: T[][]) =>
    modifyElementInUseStateArray<T[]>(i1)(
      modifyElementInUseStateArray<T>(i2)(value, arrays[i1]),
      arrays
    );
}
export function setTextToInt(
  set: (input: number) => void
): React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> {
  return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const out = parseInt(event.target.value);
    if (isNaN(out)) {
      set(0);
    } else {
      set(out);
    }
  };
}
export function setTextToFloat(
  set: (input: number) => void
): React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> {
  return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const out = parseFloat(event.target.value);
    if (isNaN(out)) {
      set(0);
    } else {
      set(out);
    }
  };
}
export function setMap<T, T2>(
  set: (setter: (input: T2) => T2) => void,
  mapIn: (v: T, array: T2) => T2
): (get: T) => void {
  return (get: T) => {
    set((array) => mapIn(get, array));
  };
}
export function setTextToString(
  set: (input: string) => void,
  keepOriginal?: boolean
): React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> {
  return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (keepOriginal) {
      set(event.target.value);
    } else {
      set(event.target.value.replace(/\s/g, ""));
    }
  };
}
export function setSwop(
  input: Id | null,
  set: (setter: (input: Id[]) => Id[]) => void
): (event: React.ChangeEvent<HTMLInputElement>) => void {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!input) {
      return;
    }
    if (event.target.checked) {
      set((previous) => [...previous, input]);
    } else {
      set((previous: Id[]) =>
        previous.filter((e) => e.toString() != input.toString())
      );
    }
  };
}
export function setBoolean(
  set: (input: boolean) => void
): (event: React.ChangeEvent<HTMLInputElement>) => void {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    set(event.target.checked);
  };
}
export async function getTimeOffsetByToken(token: string) {
  const user = await getUserProfile(token);
  return await getTimeOffset(user.displayOffsetId);
}
export async function getTimeOffsetBySession(session: Session | null) {
  if (!session) {
    return zeroTimeOffset;
  }
  const user = await getUserProfile(session.user.token);
  return await getTimeOffset(user.displayOffsetId);
}
export function selectTimeToSystem(
  input: dayjs.ConfigType,
  add: UpdateTimeOffsetRaw
): Date {
  return dayjs(input)
    .add(add.day, "days")
    .add(add.hour, "hours")
    .add(add.minute, "minutes")
    .toDate();
}
export function cleanString(input: string) {
  return input.replace(/\s/g, "");
}
export const downloadText = "download";
