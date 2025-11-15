"use client";
import { TextField, Select, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { setTextToString } from "./setup";
import Image from "next/image";
// Supported image providers and transformation logic
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
      return `https://i.imgur.com/${input}.jpg`;
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
      if (
        url.hostname.includes("discordapp") ||
        url.hostname.includes("discordcdn")
      ) {
        return url.href;
      }
      return null;
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
        return `https://api.onedrive.com/v1.0/shares/u!${btoa(url.href).replace(
          /=/g,
          ""
        )}/root/content`;
      }
      return null;
    } catch {
      return null;
    }
  },
} as const;

const providers = Object.keys(providerMap) as Array<keyof typeof providerMap>;
type Provider = (typeof providers)[number];


// Explanation text shown under input
function getProviderHint(provider: Provider): string {
  switch (provider) {
    case "bypass":
      return "Paste a direct image URL (e.g., https://example.com/image.png)";
    case "google drive":
      return "Paste a Google Drive share link (e.g., https://drive.google.com/file/d/FILE_ID/view)";
    case "imgur":
      return "Paste an Imgur link or ID (e.g., https://imgur.com/abc123)";
    case "dropbox":
      return "Paste a Dropbox link (e.g., https://www.dropbox.com/s/abc123/image.png)";
    case "discord":
      return "Paste a Discord CDN URL (e.g., https://cdn.discordapp.com/attachments/...)";
    case "github":
      return "Paste a GitHub blob link (e.g., https://github.com/user/repo/blob/main/image.png)";
    case "onedrive":
      return "Paste a OneDrive share link (e.g., https://1drv.ms/u/s!...)";
    default:
      return "";
  }
}

// Try showing the image or a fallback
function showImage(
  imgSrc: string | null,
  onChange: (imgSrc: string | null) => void
) {
  if (!imgSrc) return <p className="text-gray-500">No image</p>;

  try {
    const url = new URL(imgSrc);
    return (
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src={url.href}
        alt="Image preview"
        width={180}
        height={37}
        onError={() => onChange(null)}
      />
    );
  } catch {
    return <p className="text-red-500">Invalid URL</p>;
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

  const handleTypingChange = setTextToString((value) => {
    setTyping(value);
    const out = providerMap[provider](value);
    setImgSrc(out);
    onChange(out);
    router.refresh();
  });

  const handleProviderChange = (e: SelectChangeEvent<Provider>) => {
    const newProvider = e.target.value as Provider;
    setProvider(newProvider);
    const out = providerMap[newProvider](typing ?? "");
    setImgSrc(out);
    onChange(out);
    router.refresh();
  };

  return (
    <>
      <TextField
        name="Name"
        id="Name"
        className="w-3/5 bg-white rounded-2xl shadow-inner"
        value={imgSrc ?? ""}
        onChange={handleTypingChange}
        sx={{
          backgroundColor: "#f5f5f5",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderRadius: "1rem",
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
      />

      <p className="text-sm text-gray-500 italic mt-1 mb-2">
        {getProviderHint(provider)}
      </p>

      <Select
        variant="standard"
        name="location"
        id="location"
        className="h-[2em] w-[200px] mb-5 text-white"
        value={provider}
        onChange={handleProviderChange}
      >
        {providers.map((v, i) => (
          <MenuItem key={i} value={v}>
            {v}
          </MenuItem>
        ))}
      </Select>

      {showImage(imgSrc, onChange)}
    </>
  );
}
