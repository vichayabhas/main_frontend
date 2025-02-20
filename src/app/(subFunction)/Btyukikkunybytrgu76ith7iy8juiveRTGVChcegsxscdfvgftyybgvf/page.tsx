//peto
"use client";


import BackToHome from "@/components/utility/BackToHome";
import FinishButton from "@/components/utility/FinishButton";
import { getBackendUrl, setTextToString } from "@/components/utility/setup";
import { Select, MenuItem, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";
import { Group } from "../../../../interface";
export default function page() {
  const { data: session } = useSession();
  if (!session) {
    return <BackToHome />;
  }
  if(session.user.user.email.split('@')[1].localeCompare('student.chula.ac.th')){
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
      <label>กรุปของนิสิต</label>
      <Select value={group}>
        {allGroup.map((g,i) => (
          <MenuItem  key={i}
            onClick={() => {
              setGroup(g);
            }}
          >
            {g}
          </MenuItem>
        ))}
      </Select>
      <label>รหัสประจำตัวนิสิต</label>
      <TextField
        onChange={setTextToString(setStudentId)}
        value={studentId}
      />
      <FinishButton
        text="bypass"
        onClick={async () => {
          await fetch(`${getBackendUrl()}/subfunction/petoBypass`, {
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
