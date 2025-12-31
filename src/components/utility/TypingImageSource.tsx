"use client";

import React from "react";
import dynamic from "next/dynamic";
import { TextField, Select, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";

/* -----------------------------
   Provider definitions
------------------------------ */

const providerMap = {
  bypass: (input: string) => input,

  "google drive": (input: string) => {
    try {
      const id = new URL(input).pathname.split("/")[5];
      return id
        ? `https://drive.usercontent.google.com/download?id=${id}&authuser=1`
        : null;
    } catch {
      return null;
    }
  },

  imgur: (input: string) => {
    try {
      const url = new URL(input);
      const id = url.pathname.split("/").pop()?.split(".")[0];
      return id ? `https://i.imgur.com/${id}.jpg` : null;
    } catch {
      return input ? `https://i.imgur.com/${input}.jpg` : null;
    }
  },

  dropbox: (input: string) => {
    try {
      const url = new URL(input);
      url.searchParams.set("raw", "1");
      return url.href;
    } catch {
      return null;
    }
  },

  discord: (input: string) => {
    try {
      const url = new URL(input);
      return url.hostname.includes("discord") ? url.href : null;
    } catch {
      return null;
    }
  },

  github: (input: string) => {
    try {
      const url = new URL(input);
      if (url.hostname === "github.com") {
        url.hostname = "raw.githubusercontent.com";
        url.pathname = url.pathname.replace("/blob", "");
        return url.href;
      }
      return null;
    } catch {
      return null;
    }
  },

  onedrive: (input: string) => {
    try {
      const url = new URL(input);
      if (url.hostname.includes("1drv.ms")) {
        return `https://api.onedrive.com/v1.0/shares/u!${btoa(url.href).replace(/=/g, "")}/root/content`;
      }
      return null;
    } catch {
      return null;
    }
  },
} as const;

const providers = Object.keys(providerMap) as Array<keyof typeof providerMap>;
type Provider = (typeof providers)[number];

/* -----------------------------
   Safety utilities
------------------------------ */

function toSafeImageUrl(value: string | null): string | null {
  if (!value) return null;

  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    return url.href;
  } catch {
    return null;
  }
}

/* -----------------------------
   Client‑only image preview
------------------------------ */

const ImagePreview = dynamic(() => import("./ImagePreview"), {
  ssr: false,
});

/* -----------------------------
   Component
------------------------------ */

export default function TypingImageSource({
  defaultSrc,
  onChange,
}: {
  defaultSrc: string | null;
  onChange: (src: string | null) => void;
}) {
  const [typing, setTyping] = React.useState(defaultSrc ?? "");
  const [imgSrc, setImgSrc] = React.useState<string | null>(
    toSafeImageUrl(defaultSrc)
  );
  const [provider, setProvider] = React.useState<Provider>("bypass");

  const applyValue = (value: string, p: Provider) => {
    const raw = providerMap[p](value);
    const safe = toSafeImageUrl(raw);
    setImgSrc(safe);
    onChange(safe);
  };

  const handleTypingChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setTyping(value);
    applyValue(value, provider);
  };

  const handleProviderChange = (e: SelectChangeEvent) => {
    const p = e.target.value as Provider;
    setProvider(p);
    applyValue(typing, p);
  };

  return (
    <>
      <TextField
        className="w-3/5 bg-white rounded-2xl"
        value={typing}
        onChange={handleTypingChange}
      />

      <Select
        variant="standard"
        value={provider}
        onChange={handleProviderChange}
      >
        {providers.map((p) => (
          <MenuItem key={p} value={p}>
            {p}
          </MenuItem>
        ))}
      </Select>

      <ImagePreview src={imgSrc} />
    </>
  );
}
