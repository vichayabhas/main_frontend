import styles from "./topMenu.module.css";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/user/getUserProfile";
import getTimeOffset from "@/libs/user/getTimeOffset";
import getSystemInfo from "@/libs/randomthing/getSystemInfo";
import Logo from "../utility/Logo";
import React from "react";
import NotificationClient from "./NotificationClient";
import getNotification from "@/libs/randomthing/getNotification";
import GetTimeHtml from "../utility/GetTimeHtml";
import { zeroTimeOffset } from "../utility/setup";
export default async function TopMenu() {
  const session = await getServerSession(authOptions);
  const { systemMode, endEmail } = await getSystemInfo();
  if (session) {
    const user = await getUserProfile(session.user.token);
    const timeOffset = await getTimeOffset(user.displayOffsetId);
    const notificationData = await getNotification(session.user.token);
    if (user.mode == "nong") {
      if (user.role == "nong") {
        return (
          //น้องจริง
          <div className={styles.menuContainer}>
            <Logo />
            <GetTimeHtml input={Date.now()} offset={timeOffset} />
            <NotificationClient datas={notificationData} />
            <div>{systemMode}</div>
            <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
              <TopMenuItem title="weather" pageRef="/weather" />
              <TopMenuItem title="gewertz square" pageRef="/gewertzSquare" />
              <TopMenuItem title="ปรับตั้งเวลา" pageRef="/testTime" />
              <TopMenuItem title="เพลง" pageRef="/song" />
              <TopMenuItem title="Lost & Found" pageRef="/lostAndFound" />
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
          <div className={styles.menuContainer}>
            <Logo />
            <GetTimeHtml offset={timeOffset} input={Date.now()} />
            <NotificationClient datas={notificationData} />
            <div>{systemMode}</div>
            <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
              <TopMenuItem title="weather" pageRef="/weather" />
              <TopMenuItem title="gewertz square" pageRef="/gewertzSquare" />
              <TopMenuItem title="ปรับตั้งเวลา" pageRef="/testTime" />
              <TopMenuItem title="เพลง" pageRef="/song" />
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
          <div className={styles.menuContainer}>
            <Logo />
            <GetTimeHtml offset={timeOffset} input={Date.now()} />
            <NotificationClient datas={notificationData} />
            <div>{systemMode}</div>
            <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
              <TopMenuItem title="weather" pageRef="/weather" />
              <TopMenuItem title="gewertz square" pageRef="/gewertzSquare" />
              <TopMenuItem title="ปรับตั้งเวลา" pageRef="/testTime" />
              <TopMenuItem title="เพลง" pageRef="/song" />
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
          <div className={styles.menuContainer}>
            <Logo />
            <GetTimeHtml offset={timeOffset} input={Date.now()} />
            <NotificationClient datas={notificationData} />
            <div>{systemMode}</div>
            <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
              <TopMenuItem title="weather" pageRef="/weather" />
              <TopMenuItem title="gewertz square" pageRef="/gewertzSquare" />
              <TopMenuItem title="ปรับตั้งเวลา" pageRef="/testTime" />
              <TopMenuItem title="เพลง" pageRef="/song" />
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
    const notificationData = await getNotification();
    return (
      // not login
      <div className={styles.menuContainer}>
        <Logo />
        <GetTimeHtml offset={zeroTimeOffset} input={Date.now()} />
        <NotificationClient datas={notificationData} />
        <div>{systemMode}</div>
        <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
          <TopMenuItem title="weather" pageRef="/weather" />
          <TopMenuItem title="gewertz square" pageRef="/gewertzSquare" />
          <TopMenuItem title="เพลง" pageRef="/song" />
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
