import PushToCamps from "@/components/utility/PushToCamps";
import LocationDateReserve from "./LocationDateReserve";
import NongRegisterPage from "./NongRegisterPage";
import { CampState, MyMap } from "../../../../interface";
import getParts from "@/libs/camp/getParts";
import React from "react";

export default async function RegisterCamp({
  campState,
  token,
}: {
  campState: CampState;
  token: string;
}) {
  async function getPartMaps(campState: CampState, token: string) {
    const partMap: MyMap[] = [];
    let i = 0;
    const parts = await getParts(campState.camp._id, token);
    while (i < parts.length) {
      const part = parts[i++];
      partMap.push({ key: part._id, value: part.partName });
    }
    return partMap;
  }
  switch (campState.camp.memberStructure) {
    case "nong->highSchool,pee->1year,peto->2upYear": {
      if (campState.camp.open && campState.user.role == "nong") {
        return <NongRegisterPage campState={campState} token={token} />;
      } else if (!campState.camp.peeLock && campState.user.role != "nong") {
        const partMap = await getPartMaps(campState, token);
        return (
          <LocationDateReserve
            partMap={partMap}
            token={token}
            user={campState.user}
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
        const partMap = await getPartMaps(campState, token);
        return (
          <LocationDateReserve
            partMap={partMap}
            token={token}
            user={campState.user}
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
        const partMap = await getPartMaps(campState, token);
        return (
          <LocationDateReserve
            partMap={partMap}
            token={token}
            user={campState.user}
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
        const partMap = await getPartMaps(campState, token);
        return (
          <LocationDateReserve
            partMap={partMap}
            token={token}
            user={campState.user}
          />
        );
      } else {
        alert("this camp is close");
        return <PushToCamps />;
      }
    }
  }
}
