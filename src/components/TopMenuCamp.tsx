"use client";
import styles from "./topmenu.module.css";
import TopMenuItem from "./TopMenuItem";
import { InterCampFront, InterUser, RoleCamp } from "../../interface";
import React from "react";
import AllInOneLock from "./AllInOneLock";
export default function TopMenuCamp({
  camp,
  role,
  user,
}: {
  camp: InterCampFront;
  role: RoleCamp;
  user: InterUser;
}) {
  switch (role) {
    case "nong":
      return (
        <div className={styles.menucontainerCamp}>
          <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
            <AllInOneLock
              lock={
                !(
                  camp.canNongSeeAllActionPlan &&
                  (user.role != "nong" || camp.canNongAccessDataWithRoleNong)
                )
              }
            >
              <TopMenuItem
                title="action plan"
                pageRef={`/camp/${camp._id}/actionPlan`}
              />
            </AllInOneLock>
            <AllInOneLock
              lock={
                !(
                  camp.canNongSeeAllTrackingSheet &&
                  (user.role != "nong" || camp.canNongAccessDataWithRoleNong)
                )
              }
            >
              <TopMenuItem
                title="tracking sheet"
                pageRef={`/camp/${camp._id}/trackingSheet`}
              />
            </AllInOneLock>
            <TopMenuItem
              title="คุยส่วนตัวกับพี่"
              pageRef={`/camp/${camp._id}/allNongChat`}
            />
            <TopMenuItem
              title="คุยกันในบ้าน"
              pageRef={`/camp/${camp._id}/baan/nongChat`}
            />
            <TopMenuItem
              title="ตอบคำถาม"
              pageRef={`/camp/${camp._id}/answerTheQuestion`}
            />
            <TopMenuItem
              title="อ่านแชตทั้งหมด"
              pageRef={`/camp/${camp._id}/allChat`}
            />
          </div>
        </div>
      );
    case "pee": {
      switch (user.mode) {
        case "nong":
          return (
            <div className={styles.menucontainerCamp}>
              <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
                <AllInOneLock
                  lock={
                    !camp.canNongSeeAllActionPlan ||
                    !camp.canNongAccessDataWithRoleNong
                  }
                >
                  <TopMenuItem
                    title="action plan"
                    pageRef={`/camp/${camp._id}/actionPlan`}
                  />
                </AllInOneLock>
                <AllInOneLock
                  lock={
                    !camp.canNongSeeAllTrackingSheet ||
                    !camp.canNongAccessDataWithRoleNong
                  }
                >
                  <TopMenuItem
                    title="tracking sheet"
                    pageRef={`/camp/${camp._id}/trackingSheet`}
                  />
                </AllInOneLock>
                <TopMenuItem
                  title="คุยส่วนตัวกับน้อง"
                  pageRef={`/camp/${camp._id}/allNongChat`}
                />
                <TopMenuItem
                  title="คุยกันในบ้าน"
                  pageRef={`/camp/${camp._id}/baan/nongChat`}
                />
                <TopMenuItem
                  title="พี่บ้านคุยกัน"
                  pageRef={`/camp/${camp._id}/peebaanChat`}
                />
                <TopMenuItem
                  title="ตอบคำถาม"
                  pageRef={`/camp/${camp._id}/answerTheQuestion`}
                />
                <TopMenuItem
                  title="อ่านแชตทั้งหมด"
                  pageRef={`/camp/${camp._id}/allChat`}
                />
              </div>
            </div>
          );
        case "pee": {
          return (
            <div className={styles.menucontainerCamp}>
              <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
                <TopMenuItem
                  title="action plan"
                  pageRef={`/camp/${camp._id}/actionPlan`}
                />
                <TopMenuItem
                  title="tracking sheet"
                  pageRef={`/camp/${camp._id}/trackingSheet`}
                />
                <TopMenuItem
                  title="คุยส่วนตัวกับน้อง"
                  pageRef={`/camp/${camp._id}/allNongChat`}
                />
                <TopMenuItem
                  title="คุยกันในบ้าน+น้อง"
                  pageRef={`/camp/${camp._id}/baan/nongChat`}
                />
                <TopMenuItem
                  title="คุยกันในบ้าน+พี่บ้าน"
                  pageRef={`/camp/${camp._id}/baan/nongChat`}
                />
                <TopMenuItem
                  title="พี่บ้านคุยกัน"
                  pageRef={`/camp/${camp._id}/peebaanChat`}
                />
                <TopMenuItem
                  title="คุยกันในฝ่าย"
                  pageRef={`/camp/${camp._id}/part`}
                />
                <TopMenuItem
                  title="รวมคำถามและคำตอบ"
                  pageRef={`/camp/${camp._id}/allAnswerAndQuestion`}
                />
                <TopMenuItem
                  title="ตอบคำถาม"
                  pageRef={`/camp/${camp._id}/answerTheQuestion`}
                />
                <TopMenuItem
                  title="อ่านแชตทั้งหมด"
                  pageRef={`/camp/${camp._id}/allChat`}
                />
              </div>
            </div>
          );
        }
      }
      break;
    }
    case "peto": {
      switch (user.mode) {
        case "nong":
          return (
            <div className={styles.menucontainerCamp}>
              <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
                <AllInOneLock
                  lock={
                    !camp.canNongSeeAllActionPlan ||
                    !camp.canNongAccessDataWithRoleNong
                  }
                >
                  <TopMenuItem
                    title="action plan"
                    pageRef={`/camp/${camp._id}/actionPlan`}
                  />
                </AllInOneLock>
                <AllInOneLock
                  lock={
                    !camp.canNongSeeAllTrackingSheet ||
                    !camp.canNongAccessDataWithRoleNong
                  }
                >
                  <TopMenuItem
                    title="tracking sheet"
                    pageRef={`/camp/${camp._id}/trackingSheet`}
                  />
                </AllInOneLock>
                <TopMenuItem
                  title="พี่บ้านคุยกัน"
                  pageRef={`/camp/${camp._id}/peebaanChat`}
                />
                <TopMenuItem
                  title="ตอบคำถาม"
                  pageRef={`/camp/${camp._id}/answerTheQuestion`}
                />
                <TopMenuItem
                  title="อ่านแชตทั้งหมด"
                  pageRef={`/camp/${camp._id}/allChat`}
                />
              </div>
            </div>
          );
        case "pee": {
          return (
            <div className={styles.menucontainerCamp}>
              <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
                <TopMenuItem
                  title="action plan"
                  pageRef={`/camp/${camp._id}/actionPlan`}
                />
                <TopMenuItem
                  title="tracking sheet"
                  pageRef={`/camp/${camp._id}/trackingSheet`}
                />
                <TopMenuItem
                  title="พี่บ้านคุยกัน"
                  pageRef={`/camp/${camp._id}/peebaanChat`}
                />
                <TopMenuItem
                  title="คุยกันในฝ่าย"
                  pageRef={`/camp/${camp._id}/part`}
                />
                <TopMenuItem
                  title="รวมคำถามและคำตอบ"
                  pageRef={`/camp/${camp._id}/allAnswerAndQuestion`}
                />
                <TopMenuItem
                  title="ตอบคำถาม"
                  pageRef={`/camp/${camp._id}/answerTheQuestion`}
                />
                <TopMenuItem
                  title="อ่านแชตทั้งหมด"
                  pageRef={`/camp/${camp._id}/allChat`}
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
/**camp.nongIds.includes(user._id) &&
    !(
      camp.canNongSeeAllActionPlan &&
      (user.role != "nong" || camp.canNongAccessDataWithRoleNong)
    ) */
