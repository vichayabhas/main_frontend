import React from "react";
import Image from "next/image";
import logoImage from "../../LG_logo.png";

export default function Logo() {
  return (
    <div
      style={{
        width: "90px",
        height: "40px",
        margin: "10px",
        marginTop: "10px",
        backgroundColor: "white",
        paddingLeft: "4px",
        paddingTop: "4px",
        borderRadius: "20px",
        zIndex: "9999",
      }}
    >
      <Image
        src={logoImage}
        alt="Logo"
        style={{ width: "74px", objectFit: "contain" }}
      />
    </div>
  );
}
