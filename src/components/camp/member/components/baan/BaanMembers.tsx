"use client";

import FinishButton from "@/components/utility/FinishButton";
import { downloadText } from "@/components/utility/setup";
import React from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { useRouter } from "next/navigation";
import {
  BasicCamp,
  BasicBaan,
  ShowMember,
  Mode,
  BasicUser,
  InterCampMemberCard,
  HealthIssueBody,
} from "../../../../../../interface";
import AllInOneLock, {
  getDefaultLockInit,
} from "@/components/utility/AllInOneLock";
import { Checkbox } from "@mui/material";
function getFinalExtra(
  healthIssue: HealthIssueBody | null,
  campMemberCard: InterCampMemberCard,
  user: BasicUser,
  campRole: Mode
) {
  if (campRole == "pee" && user.mode == "pee") {
    if (campMemberCard.peeReplaceExtra) {
      return campMemberCard.peeReplaceExtra;
    } else {
      if (healthIssue) {
        return healthIssue.extra;
      } else {
        return "-";
      }
    }
  } else {
    if (campMemberCard.nongReplaceExtra) {
      return campMemberCard.nongReplaceExtra;
    } else {
      if (healthIssue) {
        return healthIssue.extra;
      } else {
        return "-";
      }
    }
  }
}

export default function BaanMembers({
  baan,
  campRole,
  pees,
  nongs,
  camp,
  user,
  token,
  healthIssue,
}: {
  camp: BasicCamp;
  baan: BasicBaan;
  campRole: Mode;
  user: BasicUser;
  nongs: ShowMember[];
  pees: ShowMember[];
  token: string;
  healthIssue: HealthIssueBody;
}) {
  const router = useRouter();
  const nongRef = React.useRef(null);
  const peeRef = React.useRef(null);
  const nongLink = React.useState(
    getDefaultLockInit({
      role: campRole,
      bypass: baan.canNongSeeAdvanceNongData,
      spacialBypass: {
        bypass: baan.canPeeSeeAdvanceNongData,
        role: user.mode,
      },
      token,
    })
  );
  const peeLink = React.useState(
    getDefaultLockInit({
      role: campRole,
      bypass: baan.canNongSeeAdvancePeeData,
      spacialBypass: {
        bypass: baan.canPeeSeeAdvancePeeData,
        role: user.mode,
      },
      token,
    })
  );
  const nongWearingLink = React.useState(getDefaultLockInit({ token }));
  const peeWearingLink = React.useState(getDefaultLockInit({ token }));
  const nongDownload = useDownloadExcel({
    currentTableRef: nongRef.current,
    filename: `รายชื่อน้อง${camp.groupName} ${baan.name} จากค่าย ${camp.campName}`,
  });
  const peeDownload = useDownloadExcel({
    currentTableRef: peeRef.current,
    filename: `รายชื่อพี่${camp.groupName} ${baan.name} จากค่าย ${camp.campName}`,
  });
  return (
    <main
      className="text-center p-5 text-white rounded-3xl"
      style={{
        backgroundColor: "#961A1D",
        width: "100%",
        marginLeft: "10%",
        marginTop: "20px",
      }}
    >
      <div>
        <div
          className="text-4xl font-bold"
          style={{
            color: "white",
            marginTop: "30px",
            marginBottom: "10px",
          }}
        >
          รายชื่อน้อง{camp.groupName} {baan.fullName}
        </div>
        <table
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            width: "100%",
          }}
          ref={nongRef}
        >
          <tr style={{ border: "solid", borderColor: "white" }}>
            <th>ชือเล่น</th>
            <th>ชื่อจริง</th>
            <th>นามสกุล</th>
            <th>เพศ</th>
            <AllInOneLock
              role={campRole}
              bypass={baan.canNongSeeAdvanceNongData}
              spacialBypass={{
                bypass: baan.canPeeSeeAdvanceNongData,
                role: user.mode,
              }}
              token={token}
              link={nongLink}
            >
              <th>ค้างคืนหรือไม่</th>
              <th>id</th>
              <th>รหัสประจำตัวนิสิต</th>
              <th>เบอร์โทรศัพท์</th>
              <th>email</th>
              <th>มีกระติกน้ำหรือไม่</th>
              <th>ขนาดเสื้อ</th>
              <AllInOneLock lock={!user.group}>
                <th>กรุ๊ปของนิสิต</th>
              </AllInOneLock>
              <th>กินเผ็ดไม่ได้ใช่หรือไม่</th>
              <th>แพ้อาหารอะไรบ้าง</th>
              <th>แพ้ยาอะไรบ้าง</th>
              <th>มีโรคประจำตัวอะไรบ้าง</th>
              <th>เน้นย้ำเรื่องอาหารอะไรบ้าง</th>
              <AllInOneLock role={campRole} bypass={healthIssue.isWearing}>
                <th>
                  <AllInOneLock link={nongWearingLink} token={token}>
                    ใส่แพมเพิสหรือไม่
                  </AllInOneLock>
                </th>
              </AllInOneLock>
            </AllInOneLock>
            <AllInOneLock
              role={campRole}
              mode={user.mode}
              bypass={baan.canNongSeeNongExtra}
            >
              <th>เพิ่มเติม</th>
            </AllInOneLock>
          </tr>
          {nongs.map((member: ShowMember, i) => {
            return (
              <tr style={{ border: "solid", borderColor: "white" }} key={i}>
                <td>{member.nickname}</td>
                <td>{member.name}</td>
                <td>{member.lastname}</td>
                <td>{member.gender}</td>
                <AllInOneLock link={nongLink}>
                  <td>{member.sleep ? <>ค้างคืน</> : <>ไม่ค้างคืน</>} </td>
                  <td
                    onClick={() => {
                      router.push(`/memberProfile/${member._id}`);
                    }}
                  >
                    {member._id.toString()}
                  </td>
                  <td>{member.studentId}</td>
                  <td>{member.tel}</td>
                  <td>{member.email}</td>
                  <td>{member.haveBottle.toString()}</td>
                  <td>{member.shirtSize}</td>
                  <AllInOneLock lock={!user.group}>
                    <td>{member.group}</td>
                  </AllInOneLock>
                  <td>
                    <Checkbox checked={member.healthIssue.spicy} readOnly />
                  </td>
                  <td>{member.healthIssue.food}</td>
                  <td>{member.healthIssue.medicine}</td>
                  <td>{member.healthIssue.chronicDisease}</td>
                  <td>{member.healthIssue.foodConcern}</td>
                  <AllInOneLock role={campRole} bypass={healthIssue.isWearing}>
                    <td>
                      <AllInOneLock link={nongWearingLink}>
                        <Checkbox
                          checked={member.healthIssue.isWearing}
                          readOnly
                        />
                      </AllInOneLock>
                    </td>
                  </AllInOneLock>
                </AllInOneLock>
                <AllInOneLock
                  role={campRole}
                  mode={user.mode}
                  bypass={baan.canNongSeeNongExtra}
                >
                  <td>
                    {getFinalExtra(
                      member.healthIssue,
                      member.campMemberCard,
                      user,
                      campRole
                    )}
                  </td>
                </AllInOneLock>
              </tr>
            );
          })}
        </table>
      </div>
      <FinishButton text={downloadText} onClick={nongDownload.onDownload} />
      <div>
        <div
          className="text-4xl font-bold"
          style={{
            color: "white",
            marginTop: "40px",
            marginBottom: "10px",
          }}
        >
          รายชื่อพี่{camp.groupName} {baan.fullName}
        </div>
        <table
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            width: "100%",
          }}
          ref={peeRef}
        >
          <tr style={{ border: "solid", borderColor: "white" }}>
            <th>ชือเล่น</th>
            <th>ชื่อจริง</th>
            <th>นามสกุล</th>
            <th>เพศ</th>
            <AllInOneLock
              role={campRole}
              bypass={baan.canNongSeeAdvancePeeData}
              spacialBypass={{
                bypass: baan.canPeeSeeAdvancePeeData,
                role: user.mode,
              }}
              token={token}
              link={peeLink}
            >
              <th>ค้างคืนหรือไม่</th>
              <th>id</th>
              <th>รหัสประจำตัวนิสิต</th>
              <th>เบอร์โทรศัพท์</th>
              <th>email</th>
              <th>มีกระติกน้ำหรือไม่</th>
              <th>ขนาดเสื้อ</th>
              <AllInOneLock lock={!user.group}>
                <th>กรุ๊ปของนิสิต</th>
              </AllInOneLock>
              <th>กินเผ็ดไม่ได้ใช่หรือไม่</th>
              <th>แพ้อาหารอะไรบ้าง</th>
              <th>แพ้ยาอะไรบ้าง</th>
              <th>มีโรคประจำตัวอะไรบ้าง</th>
              <th>เน้นย้ำเรื่องอาหารอะไรบ้าง</th>
              <AllInOneLock role={campRole} bypass={healthIssue.isWearing}>
                <AllInOneLock link={peeWearingLink} token={token}>
                  <th>ใส่แพมเพิสหรือไม่</th>
                </AllInOneLock>
              </AllInOneLock>
            </AllInOneLock>
            <AllInOneLock
              role={campRole}
              mode={user.mode}
              bypass={baan.canNongSeePeeExtra}
            >
              <th>เพิ่มเติม</th>
            </AllInOneLock>
          </tr>
          {pees.map((member: ShowMember, i) => (
            <tr style={{ border: "solid", borderColor: "white" }} key={i}>
              <td>{member.nickname}</td>
              <td>{member.name}</td>
              <td>{member.lastname}</td>
              <td>{member.gender}</td>
              <AllInOneLock link={peeLink}>
                <td>{member.sleep ? <>ค้างคืน</> : <>ไม่ค้างคืน</>} </td>
                <td
                  onClick={() => {
                    router.push(`/memberProfile/${member._id}`);
                  }}
                >
                  {member._id.toString()}
                </td>
                <td>{member.studentId}</td>
                <td>{member.tel}</td>
                <td>{member.email}</td>
                <td>{member.haveBottle.toString()}</td>
                <td>{member.shirtSize}</td>
                <AllInOneLock lock={!user.group}>
                  <td>{member.group}</td>
                </AllInOneLock>
                <td>
                  <Checkbox checked={member.healthIssue.spicy} readOnly />
                </td>
                <td>{member.healthIssue.food}</td>
                <td>{member.healthIssue.medicine}</td>
                <td>{member.healthIssue.chronicDisease}</td>
                <td>{member.healthIssue.foodConcern}</td>
                <AllInOneLock role={campRole} bypass={healthIssue.isWearing}>
                  <td>
                    <AllInOneLock link={peeWearingLink}>
                      <Checkbox
                        checked={member.healthIssue.isWearing}
                        readOnly
                      />
                    </AllInOneLock>
                  </td>
                </AllInOneLock>
              </AllInOneLock>
              <AllInOneLock
                role={campRole}
                mode={user.mode}
                bypass={baan.canNongSeePeeExtra}
              >
                <td>
                  {getFinalExtra(
                    member.healthIssue,
                    member.campMemberCard,
                    user,
                    campRole
                  )}
                </td>
              </AllInOneLock>
            </tr>
          ))}
        </table>
      </div>
      <FinishButton text={downloadText} onClick={peeDownload.onDownload} />
    </main>
  );
}
