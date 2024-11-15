//nong visnu
"use client";

import { useState } from "react";
import { TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import BackToHome from "@/components/BackToHome";
import FinishButton from "@/components/FinishButton";
import { getBackendUrl } from "@/components/setup";
import React from "react";
export default function page() {
  const { data: session } = useSession();
  if (!session) {
    return <BackToHome />;
  }
  if(session.user.user.email.split('@')[1].localeCompare('student.chula.ac.th')){
    return <BackToHome />;
  }
  //alert(session.user.user.email);
  const [studentId, setStudentId] = useState<string | null>(null);
  return (
    <div>
      <label>รหัสประจำตัวนิสิต</label>
      <TextField
        onChange={(e) => {
          setStudentId(e.target.value);
        }}
      />
      <FinishButton
        text="bypass"
        onClick={async () => {
          await fetch(`${getBackendUrl()}/subfunction/nongBypass`, {
            method: "POST",
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${session.user.token}`,
            },
            body: JSON.stringify({
              studentId,
            }),
          });
        }}
      />
    </div>
  );
}
