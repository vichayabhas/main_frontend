"use client";
import AllInOneLock, { checkValid } from "@/components/utility/AllInOneLock";
import FinishButton from "@/components/utility/FinishButton";
import {
  AddRemoveHigh,
  downloadText,
  getBackendUrl,
} from "@/components/utility/setup";
import registerJob from "@/libs/camp/registerJob";
import React from "react";
import { io } from "socket.io-client";
import {
  BasicBaan,
  BasicCamp,
  BasicUser,
  GetJob,
  Id,
  InterCampMemberCard,
  RoleCamp,
} from "../../../../../../interface";
import { Checkbox } from "@mui/material";
import UserNameTable from "@/components/utility/UserNameTable";
import { useDownloadExcel } from "react-export-table-to-excel";
const socket = io(getBackendUrl());
export default function BaanJob({
  user,
  baanJobs,
  token,
  camp,
  baan,
  campMemberCard,
  role,
}: {
  user: BasicUser;
  baanJobs: GetJob[];
  token: string;
  camp: BasicCamp;
  baan: BasicBaan;
  campMemberCard: InterCampMemberCard;
  role: RoleCamp;
}) {
  const baanRef = React.useRef(null);
  const baanDownload = useDownloadExcel({
    currentTableRef: baanRef.current,
    filename: `หน้าที่ของ${camp.groupName}${baan.name}`,
  });
  const [removeTimeRegisterIds, setRemoveTimeRegisterIds] = React.useState<
    Id[]
  >([]);
  const [addJobIds, setAddJobIds] = React.useState<Id[]>([]);

  const manageJobId = new AddRemoveHigh(
    addJobIds,
    setAddJobIds,
    removeTimeRegisterIds,
    setRemoveTimeRegisterIds
  );
  return (
    <AllInOneLock
      mode={user.mode}
      bypass={baan.canNongSeeJobData}
      role={role}
      token={token}
    >
      <div
        className="w-[100%] items-center p-10 rounded-3xl "
        style={{
          backgroundColor: "#961A1D",
          width: "70%",
          marginTop: "20px",
        }}
      >
        <table ref={baanRef}>
          <tr>
            <th>ชื่องาน</th>
            <th>จำนวนผู้ชาย</th>
            <th>จำนวนผู้หญิง</th>
            <th>จำนวนรวม</th>
            <th>รูปแบบการรับ</th>
            <th>select</th>
            <th>ผู้ชายที่ผ่าน</th>
            <th>ผู้หญิงที่ผ่าน</th>
            <th>ผู้ชายไม่ที่ผ่าน</th>
            <th>ผู้หญิงไม่ที่ผ่าน</th>
          </tr>
          {baanJobs.map((baanJob, i) => {
            return (
              <tr key={i}>
                <td>{baanJob.name}</td>
                <td>{baanJob.male}</td>
                <td>{baanJob.female}</td>
                <td>{baanJob.sum}</td>
                <td>{baanJob.reqType}</td>
                <td>
                  <Checkbox
                    onChange={manageJobId.set(
                      baanJob._id,
                      baanJob.timeRegisterId
                    )}
                    checked={manageJobId.get(
                      baanJob._id,
                      baanJob.timeRegisterId
                    )}
                    readOnly={!checkValid({ role })}
                  />
                </td>
                <td>
                  <UserNameTable inputs={baanJob.passMales} />
                </td>
                <td>
                  <UserNameTable inputs={baanJob.passFemales} />
                </td>
                <td>
                  <UserNameTable inputs={baanJob.failMales} />
                </td>
                <td>
                  <UserNameTable inputs={baanJob.failFemales} />
                </td>
              </tr>
            );
          })}
        </table>
        <FinishButton text={downloadText} onClick={baanDownload.onDownload} />
        <FinishButton
          text="register"
          onClick={() =>
            registerJob(
              {
                addJobIds,
                removeTimeRegisterIds,
                campMemberCardId: campMemberCard._id,
                types: "baan",
                fromId: baan._id,
              },
              token,
              socket
            )
          }
        />
      </div>
    </AllInOneLock>
  );
}
