"use client";
import { TextField, Select, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { setTextToString } from "./setup";
import Image from "next/image";

const providers = ["bypass", "google drive"] as const;
type Provider = (typeof providers)[number];
function change(provider: Provider, typing: string | null) {
  if (!typing) {
    return null;
  }
  switch (provider) {
    case "bypass": {
      return typing;
    }
    case "google drive": {
      return `https://drive.usercontent.google.com/download?id=${
        typing.split("/")[5]
      }&authuser=1`;
    }
  }
}
function showImage(
  imgSrc: string | null,
  onChange: (imgSrc: string | null) => void
) {
  if (!imgSrc) {
    return "null";
  }
  try {
    const url = new URL(imgSrc);
    const img = (
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src={url.href}
        alt="invalid"
        width={180}
        height={37}
        onError={() => {
          onChange(null);
        }}
      />
    );
    return img;
  } catch {
    return "invalid";
  }
}
export default function TypingImageSource({
  onChange,
  defaultSrc,
}: {
  onChange: (imgSrc: string | null) => void;
  defaultSrc: string | null;
}) {
  const [typing, setTyping] = React.useState(defaultSrc);
  const [imgSrc, setImgSrc] = React.useState(defaultSrc);
  const [provider, setProvider] = React.useState<Provider>("bypass");
  const router = useRouter();

  return (
    <>
      <TextField
        name="Name"
        id="Name"
        sx={{
          backgroundColor: "#f5f5f5",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderRadius: " 1rem",
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "#5479FF",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#5479FF",
            },
          },
        }}
        className="w-3/5 bg-white rounded-2xl shadow-inner"
        onChange={setTextToString((e) => {
          setTyping(e);
          const out = change(provider, e);
          setImgSrc(out);
          onChange(out);
          router.refresh();
        })}
        value={imgSrc}
      />
      <Select
        variant="standard"
        name="location"
        id="location"
        className="h-[2em] w-[200px] mb-5 text-white"
        value={provider}
      >
        {providers.map((v, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              const out = change(v, typing);
              setProvider(v);
              setImgSrc(out);
              onChange(out);
              router.refresh();
            }}
            value={v}
          >
            {v}
          </MenuItem>
        ))}
      </Select>
      {showImage(imgSrc, onChange)}
    </>
  );
}
