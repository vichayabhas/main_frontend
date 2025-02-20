"use client";

import { Select, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import FinishButton from "../utility/FinishButton";

interface Choice {
  display: string;
  select: string;
}
export default function TMDClient({
  choices,
  path,
}: {
  choices: Choice[];
  path: string;
}) {
  const [choice, setChoice] = React.useState(choices[0]);
  const router = useRouter();
  return (
    <div>
      <div>
        <Select<Choice>
          renderValue={(v) => (
            <div dangerouslySetInnerHTML={{ __html: v.display }}></div>
          )}
          value={choice}
        >
          <MenuItem
            onClick={() => setChoice({ select: "", display: "ล่าสุด" })}
          >
            ล่าสุด
          </MenuItem>
          {choices.map((c, i) => (
            <MenuItem onClick={() => setChoice(c)} key={i}>
              <div dangerouslySetInnerHTML={{ __html: c.display }}></div>
            </MenuItem>
          ))}
        </Select>
        <FinishButton
          onClick={() => router.push(`/${path}/${choice.select}`)}
          text="ไป"
        />
      </div>
    </div>
  );
}
