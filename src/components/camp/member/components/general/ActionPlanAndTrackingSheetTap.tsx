"use client";

import TopMenuItem from "@/components/randomthing/TopMenuItem";
import AllInOneLock from "@/components/utility/AllInOneLock";
import { BasicCamp, Mode, Role, RoleCamp } from "../../../../../../interface";
import React from "react";

export default function ActionPlanAndTrackingSheetTap({
  mode,
  campRole,
  userRole,
  camp,
}: {
  mode: Mode;
  campRole: RoleCamp;
  userRole: Role;
  camp: BasicCamp;
}) {
  return (
    <>
      <AllInOneLock
        role={campRole}
        mode={mode}
        bypass={camp.canNongAccessDataWithRoleNong}
        spacialBypass={{
          bypass: camp.canNongSeeAllActionPlan,
          role: userRole,
        }}
      >
        <TopMenuItem
          title="action plan"
          pageRef={`/camp/${camp._id}/actionPlan`}
        />
      </AllInOneLock>
      <AllInOneLock
        role={campRole}
        mode={mode}
        bypass={camp.canNongAccessDataWithRoleNong}
        spacialBypass={{
          bypass: camp.canNongSeeAllTrackingSheet,
          role: userRole,
        }}
      >
        <TopMenuItem
          title="tracking sheet"
          pageRef={`/camp/${camp._id}/trackingSheet`}
        />
      </AllInOneLock>
    </>
  );
}
