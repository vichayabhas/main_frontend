import PushToCamps from "@/components/utility/PushToCamps";
import NongRegisterPage from "./NongRegisterPage";
import { CampState } from "../../../../interface";
import getParts from "@/libs/camp/getParts";
import React from "react";
import CreateStaffRegisterPage from "../admission/CreateStaffRegisterPage";

export default async function RegisterCamp({
  campState,
  token,
}: {
  campState: CampState;
  token: string;
}) {
  switch (campState.camp.memberStructure) {
    case "nong->highSchool,pee->1year,peto->2upYear": {
      if (campState.camp.open && campState.user.role == "nong") {
        return <NongRegisterPage campState={campState} token={token} />;
      } else if (!campState.camp.peeLock && campState.user.role != "nong") {
        const parts = await getParts(campState.camp._id, token);
        return (
          <CreateStaffRegisterPage
            parts={parts}
            camp={campState.camp}
            token={token}
          />
        );
      } else {
        alert("this camp is close");
        return <PushToCamps />;
      }
    }
    case "nong->1year,pee->2upYear": {
      if (
        campState.camp.open &&
        campState.user.fridayActEn &&
        !(campState.user.role == "peto" || campState.user.role == "admin")
      ) {
        return <NongRegisterPage campState={campState} token={token} />;
      } else if (
        !campState.camp.peeLock &&
        (campState.user.role == "peto" || campState.user.role == "admin")
      ) {
        const parts = await getParts(campState.camp._id, token);
        return (
          <CreateStaffRegisterPage
            parts={parts}
            camp={campState.camp}
            token={token}
          />
        );
      } else {
        alert("this camp is close");
        return <PushToCamps />;
      }
    }
    case "nong->highSchool,pee->2upYear": {
      if (campState.camp.open && campState.user.role == "nong") {
        return <NongRegisterPage campState={campState} token={token} />;
      } else if (
        !campState.camp.peeLock &&
        (campState.user.role == "peto" || campState.user.role == "admin")
      ) {
        const parts = await getParts(campState.camp._id, token);
        return (
          <CreateStaffRegisterPage
            parts={parts}
            camp={campState.camp}
            token={token}
          />
        );
      } else {
        alert("this camp is close");
        return <PushToCamps />;
      }
    }
    case "nong->highSchool,pee->allYear": {
      if (campState.camp.open && campState.user.role == "nong") {
        return <NongRegisterPage campState={campState} token={token} />;
      } else if (!campState.camp.peeLock && campState.user.role != "nong") {
        const parts = await getParts(campState.camp._id, token);
        return (
          <CreateStaffRegisterPage
            parts={parts}
            camp={campState.camp}
            token={token}
          />
        );
      } else {
        alert("this camp is close");
        return <PushToCamps />;
      }
    }
  }
}
