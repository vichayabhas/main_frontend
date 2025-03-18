import { BoyZoneLadyZoneState, Mode } from "../../../../../interface";

export function getBoyZoneLadyZoneByMode(
  input: BoyZoneLadyZoneState,
  mode: Mode
): BoyZoneLadyZoneState {
  if (mode == "pee") {
    return input;
  }
  if (input == "ตรวจตรา") {
    return "เพศตรงข้ามออกจากโซน";
  }
  if (input == "ปิดแต่ยังเก็บของยังไม่หมด") {
    return "ปิดสมบูรณ์";
  }
  if (input == "พร้อมอาบน้ำ") {
    return "ปิดสมบูรณ์";
  }
  return input;
}
