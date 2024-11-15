"use client";
import styles from "./topmenu.module.css";
import TopMenuItem from "./TopMenuItem";
import { Id, Mode, RoleCamp } from "../../interface";
import React from "react";
export default function TopMenuCamp({
  campId,
  role,
  mode,
}: {
  campId: Id;
  role: RoleCamp;
  mode: Mode;
}) {
  switch (role) {
    case "nong":
      return (
        <div className={styles.menucontainerCamp}>
          <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
            <TopMenuItem
              title="คุยส่วนตัวกับพี่"
              pageRef={`/camp/${campId}/allNongChat`}
            />
            <TopMenuItem
              title="คุยกันในบ้าน"
              pageRef={`/camp/${campId}/baan/nongChat`}
            />
            <TopMenuItem
              title="อ่านแชตทั้งหมด"
              pageRef={`/camp/${campId}/allChat`}
            />
          </div>
        </div>
      );
    case "pee": {
      switch (mode) {
        case "nong":
          return (
            <div className={styles.menucontainerCamp}>
              <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
                <TopMenuItem
                  title="คุยส่วนตัวกับน้อง"
                  pageRef={`/camp/${campId}/allNongChat`}
                />
                <TopMenuItem
                  title="คุยกันในบ้าน"
                  pageRef={`/camp/${campId}/baan/nongChat`}
                />
                <TopMenuItem
                  title="พี่บ้านคุยกัน"
                  pageRef={`/camp/${campId}/peebaanChat`}
                />
                <TopMenuItem
                  title="อ่านแชตทั้งหมด"
                  pageRef={`/camp/${campId}/allChat`}
                />
              </div>
            </div>
          );
        case "pee": {
          return (
            <div className={styles.menucontainerCamp}>
              <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
                <TopMenuItem
                  title="คุยส่วนตัวกับน้อง"
                  pageRef={`/camp/${campId}/allNongChat`}
                />
                <TopMenuItem
                  title="คุยกันในบ้าน+น้อง"
                  pageRef={`/camp/${campId}/baan/nongChat`}
                />
                <TopMenuItem
                  title="คุยกันในบ้าน+พี่บ้าน"
                  pageRef={`/camp/${campId}/baan/nongChat`}
                />
                <TopMenuItem
                  title="พี่บ้านคุยกัน"
                  pageRef={`/camp/${campId}/peebaanChat`}
                />
                <TopMenuItem
                  title="คุยกันในฝ่าย"
                  pageRef={`/camp/${campId}/part`}
                />
                <TopMenuItem
                  title="อ่านแชตทั้งหมด"
                  pageRef={`/camp/${campId}/allChat`}
                />
              </div>
            </div>
          );
        }
      }
      break
    }
    case "peto": {
      switch (mode) {
        case "nong":
          return (
            <div className={styles.menucontainerCamp}>
              <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
                <TopMenuItem
                  title="พี่บ้านคุยกัน"
                  pageRef={`/camp/${campId}/peebaanChat`}
                />
                <TopMenuItem
                  title="อ่านแชตทั้งหมด"
                  pageRef={`/camp/${campId}/allChat`}
                />
              </div>
            </div>
          );
        case "pee": {
          return (
            <div className={styles.menucontainerCamp}>
              <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
                <TopMenuItem
                  title="พี่บ้านคุยกัน"
                  pageRef={`/camp/${campId}/peebaanChat`}
                />
                <TopMenuItem
                  title="คุยกันในฝ่าย"
                  pageRef={`/camp/${campId}/part`}
                />
                <TopMenuItem
                  title="อ่านแชตทั้งหมด"
                  pageRef={`/camp/${campId}/allChat`}
                />
              </div>
            </div>
          );
        }
      }
    }
  }
} /*
{role === "admin" && user.mode === "pee" ? (
          <TopMenuItem title="Admin Action" pageRef="" />
        ) : null}
        <TopMenuItem title="Reservations" pageRef="/booking/" />
        {session ? (
          <TopMenuItem title="Sign Out" pageRef="/api/auth/signout" />
        ) : (
          
        )}*/
