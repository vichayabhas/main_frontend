import styles from "./topmenu.module.css";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/user/getUserProfile";
import DateConv from "./Dateconv";
import getTimeOffset from "@/libs/user/getTimeOffset";
import dayjs from "dayjs";
import getSystemInfo from "@/libs/randomthing/getSystemInfo";
import Logo from "./Logo";
import React from "react";
export default async function TopMenu() {
  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const session = await getServerSession(authOptions);
  const { systemMode, endEmail } = await getSystemInfo();
  if (session) {
    const user = await getUserProfile(session.user.token);
    const timeOffset = await getTimeOffset(user.displayOffsetId);
    const dateObj = dayjs(Date.now())
      .add(-timeOffset.day, "days")
      .add(-timeOffset.hour, "hours")
      .add(-timeOffset.minute, "minutes")
      .toDate();
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = monthArray[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    if (user.mode == "nong") {
      if (user.role == "nong") {
        return (
          //น้องจริง
          <div className={styles.menucontainer}>
            <Logo />
            <DateConv
              day={day}
              minutes={minutes}
              month={month}
              year={year}
              hours={hours}
            />
            <div>{systemMode}</div>
            <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
              <TopMenuItem title="Lost & Found" pageRef="lostAndFound" />
              {!endEmail.split(",").includes(user.email.split("@")[1]) ||
              user.fridayActEn ? null : (
                <TopMenuItem title="verify" pageRef="/verify" />
              )}
              <TopMenuItem title="ปัญหาสุขภาพ" pageRef="/healthIssue" />
              <TopMenuItem title="checkTel" pageRef="/tel" />
              <TopMenuItem title="Update Profile" pageRef="/updateProfile" />
              <TopMenuItem title="Sign Out" pageRef="/api/auth/signout" />
              <TopMenuItem title="Home" pageRef="/" />
            </div>
          </div>
        );
      } else {
        // พี่ และ admin mode น้อง
        return (
          <div className={styles.menucontainer}>
            <Logo />
            <DateConv
              day={day}
              minutes={minutes}
              month={month}
              year={year}
              hours={hours}
            />
            <div>{systemMode}</div>
            <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
              <TopMenuItem title="Lost & Found" pageRef="/lostAndFound" />
              <TopMenuItem title="ปัญหาสุขภาพ" pageRef="/healthIssue" />
              <TopMenuItem title="checkTel" pageRef="/tel" />
              <TopMenuItem title="โซนพี่" pageRef="/peeOnly" />
              <TopMenuItem title="Update Profile" pageRef="/updateProfile" />
              <TopMenuItem title="Sign Out" pageRef="/api/auth/signout" />
              <TopMenuItem title="Home" pageRef="/" />
            </div>
          </div>
        );
      }
    } else {
      if (user.role == "admin") {
        // admin mode พี่
        return (
          <div className={styles.menucontainer}>
            <Logo />
            <DateConv
              day={day}
              minutes={minutes}
              month={month}
              year={year}
              hours={hours}
            />
            <div>{systemMode}</div>
            <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
              <TopMenuItem title="Lost & Found" pageRef="/lostAndFound" />
              <TopMenuItem title="เมนูพี่" pageRef="/menuPee" />
              <TopMenuItem title="ปัญหาสุขภาพ" pageRef="/healthIssue" />
              <TopMenuItem title="checkTel" pageRef="/tel" />
              <TopMenuItem title="admin" pageRef="/admin" />
              <TopMenuItem title="Update Profile" pageRef="/updateProfile" />
              <TopMenuItem title="Sign Out" pageRef="/api/auth/signout" />
              <TopMenuItem title="Home" pageRef="/" />
            </div>
          </div>
        );
      } else {
        return (
          // พี่ mode พี่
          <div className={styles.menucontainer}>
            <Logo />
            <DateConv
              day={day}
              minutes={minutes}
              month={month}
              year={year}
              hours={hours}
            />
            <div>{systemMode}</div>
            <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
              <TopMenuItem title="Lost & Found" pageRef="/lostAndFound" />
              <TopMenuItem title="เมนูพี่" pageRef="/menuPee" />
              <TopMenuItem title="ปัญหาสุขภาพ" pageRef="/healthIssue" />
              <TopMenuItem title="checkTel" pageRef="/tel" />
              <TopMenuItem title="Update Profile" pageRef="/updateProfile" />
              <TopMenuItem title="Sign Out" pageRef="/api/auth/signout" />
              <TopMenuItem title="Home" pageRef="/" />
            </div>
          </div>
        );
      }
    }
  } else {
    const dateObj = new Date(Date.now());
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = monthArray[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    return (
      // not login
      <div className={styles.menucontainer}>
        <Logo />
        <DateConv
          day={day}
          minutes={minutes}
          month={month}
          year={year}
          hours={hours}
        />
        <div>{systemMode}</div>
        <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
          <TopMenuItem title="Sign In" pageRef="/api/auth/signin" />
          <TopMenuItem title="Register" pageRef="/signup" />
          <TopMenuItem title="Home" pageRef="/" />
        </div>
      </div>
    );
  }
  //return <TopMenuItem title="Sign Out" pageRef="/api/auth/signout" />
} /*
{role === "admin" && user.mode === "pee" ? (
          <TopMenuItem title="Admin Action" pageRef="" />
        ) : null}
        <TopMenuItem title="Reservations" pageRef="/booking/" />
        {session ? (
          <TopMenuItem title="Sign Out" pageRef="/api/auth/signout" />
        ) : (
          
        )}*/
