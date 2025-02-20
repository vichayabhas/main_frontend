"use client";

import { useSession } from "next-auth/react";
import styles from "./banner.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LarnImage from "../../larn.jpg";
import GearImage from "../../Gears.png";
import React from "react";
//import
export default function Banner() {
  const router = useRouter();
  const [index, setIndex] = React.useState(0);

  const { data: session } = useSession();

  return (
    /*
     */
    <div
      className={styles.banner}
      onClick={() => {
        setIndex(index + 0);
      }}
    >
      {/*<Image src={cover[index%4]} alt='cover' fill={true}
            priority 
            style={{objectFit:'cover'}}
            />*/}

      <div className={styles.bannerText}></div>

      {session ? (
        <div
          className=" font-semibold"
          style={{
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
          }}
        >
          <h1
            style={{
              fontSize: "90px",
              fontWeight: "bolder",
              color: "#961A1D",
              textAlign: "center",
              marginTop: "80px",
              marginBottom: "35px",
            }}
          >
            Welcome to LarnGear
          </h1>
          <Image
            src={LarnImage}
            alt="gear"
            style={{
              position: "absolute",
              width: " 80%",
              height: "800px",
              left: "50%",
              marginLeft: "-40%",
              objectFit: "cover",
              borderRadius: "20px",
            }}
          />
          {session.user?.name}
        </div>
      ) : null}
      <button
        onClick={(e) => {
          e.stopPropagation();
          router.push("/camp");
        }}
        className="
      font-semibold py-2 px-2 rounded-2xl z-30 bg-white
     "
        style={{
          color: "#961A1D",
          borderColor: "#961A1D",
          border: "solid",
          borderWidth: "3px",
          position: "fixed",
          bottom: "60px",
          left: "50%",
          width: "200px",
          marginLeft: "-100px",
          boxShadow: "0px 0px 30px white",
          overflow: "hidden",
        }}
      >
        &nbsp;&nbsp;&nbsp;Select Camp
        <Image
          src={GearImage}
          alt="icon"
          style={{
            width: "60px",
            position: "absolute",
            top: "6px",
            left: "-15px",
            opacity: "0.6",
          }}
        />
      </button>
      <div style={{ height: "130%" }}></div>
    </div>
  );
}

/*

onClick={
        }


*/
