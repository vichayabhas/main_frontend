//admin
"use client";

import { getBackendUrl, setTextToString } from "@/components/utility/setup";
import { useSession } from "next-auth/react";
import BackToHome from "@/components/utility/BackToHome";
import React from "react";
import FinishButton from "@/components/utility/FinishButton";
import { Select, MenuItem, TextField } from "@mui/material";
import { Group } from "../../../../interface";
export default function page() {
  const { data: session } = useSession();
  if (!session) {
    return <BackToHome />;
  }
  const [studentId, setStudentId] = React.useState<string | null>(null);
  const [group, setGroup] = React.useState<Group | null>(null);
  const allGroup: Group[] = [
    "A",
    "B",
    "C",
    "Dog",
    "E",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "M",
    "N",
    "P",
    "Q",
    "R",
    "S",
    "T",
  ];
  return (
    <div>
      <label>กรุ๊ปของนิสิต</label>
      <Select<Group | null> value={group}>
        {allGroup.map((g, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              setGroup(g);
            }}
            value={g}
          >
            {g}
          </MenuItem>
        ))}
      </Select>
      <label>รหัสประจำตัวนิสิต</label>
      <TextField onChange={setTextToString(setStudentId)} value={studentId} />
      <FinishButton
        text="bypass"
        onClick={async () => {
          await fetch(`${getBackendUrl()}/subfunction/adminBypass`, {
            method: "POST",
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${session.user.token}`,
            },
            body: JSON.stringify({
              studentId,
              group,
            }),
          });
        }}
      />
    </div>
  );
}
//adminBypass
